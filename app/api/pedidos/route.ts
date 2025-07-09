// app/api/pedidos/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken'; // Asegúrate de tener 'jsonwebtoken' instalado: npm install jsonwebtoken

// Inicializa la conexión a la base de datos Neon
const sql = neon(process.env.DATABASE_URL as string);

// Inicializa Stripe con tu clave secreta y versión de API
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
});

// ******* VALIDACIÓN CRÍTICA DE JWT_SECRET *******
// Aseguramos que JWT_SECRET siempre venga del entorno.
// Si process.env.JWT_SECRET no está definido, lanzamos un error explícito.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  // Este error se lanzará al iniciar el servidor si la variable no está configurada.
  // Es mejor que un error de "invalid signature" en tiempo de ejecución.
  throw new Error('JWT_SECRET no está definido en las variables de entorno. Por favor, configúralo.');
}
// *************************************************

// Define una interfaz para el payload de tu JWT
interface JwtPayload {
  id: number;
  email: string;
  role: string; // Añadido role para mayor claridad
  nombre?: string; // Añadido nombre, apellidos, tratamiento
  apellidos?: string;
  tratamiento?: string;
}

// ******************************************************
// FUNCIÓN POST: Para crear nuevos pedidos (Stripe Checkout o pago en tienda)
// ******************************************************
export async function POST(req: Request) {
  try {
    console.log('API Route: POST request received for /api/pedidos (Creación de pedido)');

    const { productos, email, metodoPago } = await req.json();

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

    const total = productos.reduce((sum: number, item: any) => sum + item.precio * item.cantidad, 0);

    // Si metodoPago es 'tienda', guarda el pedido directamente en la BD sin Stripe
    if (metodoPago === 'tienda') {
      await sql`
        INSERT INTO pedidos (email, metodo_pago, total, estado, creado_en, productos)
        VALUES (
          ${email},
          ${metodoPago},
          ${total},
          'pagado_en_tienda', // Estado para pagos en tienda
          NOW(),
          ${JSON.stringify(productos)}
        )
      `;
      console.log('Pedido manual (tienda) guardado exitosamente.');
      return NextResponse.json({ message: 'Pedido procesado para pago en tienda' });
    }

    // Para Stripe
    const line_items = productos.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.nombre,
          // images: [item.imagen],
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
        ${JSON.stringify(productos)}
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
      // Usa la constante JWT_SECRET que ya validamos al inicio del archivo
      // Añadimos '!' para asegurar a TypeScript que no es undefined
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
