import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer'; // Elimina esta importación si ya tienes lib/email.ts
import { enviarCorreoConfirmacionPedido } from '@/lib/email' // Importa la nueva función de envío de correo

// Inicializa la conexión a la base de datos Neon
const sql = neon(process.env.DATABASE_URL as string);

// Inicializa Stripe con tu clave secreta y versión de API
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
});

// ******* VALIDACIÓN CRÍTICA DE JWT_SECRET *******
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno. Por favor, configúralo.');
}
// *************************************************

// ******* Configuración de Nodemailer - Ya no es necesaria aquí si usas lib/email.ts *******
// const EMAIL_USER = process.env.EMAIL_USER;
// const EMAIL_PASS = process.env.EMAIL_PASS;
// const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
// const EMAIL_PORT = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587;

// if (!EMAIL_USER || !EMAIL_PASS) {
//     console.warn('⚠️ EMAIL_USER o EMAIL_PASS no están definidos. Los correos no se enviarán.');
// }

// const transporter = nodemailer.createTransport({
//     host: EMAIL_HOST,
//     port: EMAIL_PORT,
//     secure: EMAIL_PORT === 465,
//     auth: {
//         user: EMAIL_USER,
//         pass: EMAIL_PASS,
//     },
// });

// Función para enviar correo de confirmación - Reemplazada por enviarCorreoConfirmacionPedido de lib/email.ts
// async function sendConfirmationEmail(toEmail: string, orderDetails: any) {
// ... (código anterior de sendConfirmationEmail)
// }
// *************************************************

interface JwtPayload {
  id: number;
  email: string;
  role: string;
  nombre?: string;
  apellidos?: string;
  tratamiento?: string;
}

export async function POST(req: Request) {
  try {
    console.log('API Route: POST request received for /api/pedidos (Creación de pedido)');

    const { productos, email, metodoPago, nombre, apellidos, tratamiento } = await req.json(); // Añade nombre, apellidos, tratamiento

    if (!Array.isArray(productos) || productos.length === 0) {
      console.error('Validation Error: Productos inválidos o vacíos en la solicitud POST.');
      return NextResponse.json({ error: 'Productos inválidos o vacíos en la solicitud' }, { status: 400 });
    }
    if (!email) {
      console.error('Validation Error: Email no proporcionado en solicitud POST.');
      return NextResponse.json({ error: 'Email no proporcionado' }, { status: 400 });
    }
    if (!metodoPago) {
      console.error('Validation Error: Método de pago no proporcionado en solicitud POST.');
      return NextResponse.json({ error: 'Método de pago no proporcionado' }, { status: 400 });
    }

    function limpiarTexto(texto = '') {
      return texto.replace(/'/g, "''").replace(/\n/g, ' ').trim();
    }

    const productosLimpios = productos.map((p: any) => ({
      ...p,
      nombre: limpiarTexto(p.nombre),
      descripcion: limpiarTexto(p.descripcion || ''),
    }));

    const total = productosLimpios.reduce((sum: number, item: any) => sum + item.precio * item.cantidad, 0);

    // Si metodoPago es 'tienda', guarda el pedido directamente en la BD y envía correo
    if (metodoPago === 'tienda') {
      await sql`
        INSERT INTO pedidos (email, metodo_pago, total, estado, creado_en, productos)
        VALUES (
          ${email},
          ${metodoPago},
          ${total},
          'pagado_en_tienda',
          NOW(),
          ${JSON.stringify(productosLimpios)}
        )
      `;
      console.log('Pedido manual (tienda) guardado exitosamente.');

      // Enviar correo de confirmación para pedidos en tienda usando la función de lib/email.ts
      await enviarCorreoConfirmacionPedido({
          email: email,
          nombre: nombre, // Pasa el nombre del usuario
          apellidos: apellidos, // Pasa los apellidos del usuario
          tratamiento: tratamiento, // Pasa el tratamiento del usuario
          total: total,
          productos: productosLimpios,
      });

      return NextResponse.json({ message: 'Pedido procesado para pago en tienda', redirect: '/pedido-confirmado-tienda' }); // Puedes redirigir a una página de confirmación específica
    }

    // Para Stripe
    const line_items = productosLimpios.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.nombre,
          // images: [item.imagen], // Asegúrate de que item.imagen sea una URL válida si la descomentas
        },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_URL}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/realizar-pedido`,
      metadata: {
        email,
        metodoPago,
      },
    });

    await sql`
      INSERT INTO pedidos (email, metodo_pago, total, estado, stripe_session_id, creado_en, productos)
      VALUES (
        ${email},
        ${metodoPago},
        ${total},
        'pendiente',
        ${session.id},
        NOW(),
        ${JSON.stringify(productosLimpios)}
      )
    `;

    console.log('Stripe session created and order saved to DB. Session URL:', session.url);
    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('❌ Error en API Route /api/pedidos (POST):', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al procesar el pedido.';
    return NextResponse.json({ error: `Error al procesar el pedido: ${errorMessage}` }, { status: 500 });
  }
}

// ******************************************************
// FUNCIÓN GET: Para obtener los pedidos de un usuario autenticado
// ******************************************************
export async function GET(req: Request) {
  try {
    console.log('API Route: GET request received for /api/pedidos (Obtención de pedidos de usuario)');

    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Error de autenticación: Token no proporcionado o formato incorrecto.');
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decodedToken: JwtPayload;

    try {
      decodedToken = jwt.verify(token, JWT_SECRET!) as JwtPayload;
      console.log('Token verificado exitosamente para email:', decodedToken.email);
    } catch (jwtError: any) {
      console.error('Error de autenticación: Token inválido o expirado.', jwtError);
      return NextResponse.json({ error: `Token inválido o expirado: ${jwtError.message}` }, { status: 401 });
    }

    const userEmail = decodedToken.email;
    console.log(`API Pedidos Usuario: Buscando pedidos para el email: ${userEmail}`);

    const pedidosDB = await sql`
      SELECT id, email, total, productos, metodo_pago, estado, creado_en
      FROM pedidos
      WHERE email = ${userEmail}
      ORDER BY creado_en DESC;
    `;

    const pedidosProcesados = pedidosDB.map((pedido: any) => {
      let productosParsed: any[] = [];
      try {
        if (pedido.productos) {
          productosParsed = JSON.parse(pedido.productos);
        }
      } catch (e) {
        console.error(`Error al parsear productos para el pedido ${pedido.id}:`, e);
      }

      return {
        id: pedido.id,
        fecha: pedido.creado_en,
        total: parseFloat(pedido.total),
        estado: pedido.estado,
        productos: productosParsed,
      };
    });

    console.log(`API Pedidos Usuario: Encontrados ${pedidosProcesados.length} pedidos para ${userEmail}.`);
    return NextResponse.json(pedidosProcesados);

  } catch (error: any) {
    console.error('❌ Error en API Route /api/pedidos (GET):', error);
    return NextResponse.json({ error: `Error al cargar pedidos del usuario: ${error.message || 'Error desconocido'}` }, { status: 500 });
  }
}