// app/api/auth/pedidos/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';

// Inicializa la conexión a la base de datos Neon
const sql = neon(process.env.DATABASE_URL as string);

// Inicializa Stripe con tu clave secreta y versión de API
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil', // Asegúrate de que esta sea la versión de API que estás utilizando
});

export async function POST(req: Request) {
  try {
    // Extrae los datos del cuerpo de la solicitud (productos, email, metodoPago)
    const { productos, email, metodoPago } = await req.json();

    // --- Validación IMPORTANTE para 'productos' ---
    // Verifica que 'productos' es un array y que no está vacío.
    // Si no es válido, devuelve un error 400.
    if (!Array.isArray(productos) || productos.length === 0) {
      return NextResponse.json({ error: 'Productos inválidos o vacíos en la solicitud' }, { status: 400 });
    }

    // Mapea los productos recibidos al formato 'line_items' que Stripe espera.
    // 'unit_amount' se calcula multiplicando por 100 para convertir a céntimos.
    const line_items = productos.map((item: any) => ({
      price_data: {
        currency: 'eur', // Moneda del pedido
        product_data: {
          name: item.nombre, // Nombre del producto
          // Puedes añadir 'description', 'images', etc. aquí si los tienes
        },
        unit_amount: Math.round(item.precio * 100), // Precio del producto en céntimos
      },
      quantity: item.cantidad, // Cantidad del producto
    }));

    // Calcula el total del pedido sumando el precio * cantidad de todos los productos
    const total = productos.reduce((sum: number, item: any) => sum + item.precio * item.cantidad, 0);

    // Crea una nueva sesión de Checkout en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Métodos de pago permitidos
      mode: 'payment', // Modo de la sesión (pago único)
      line_items, // Los productos a comprar
      // URLs a las que se redirige al usuario después de un pago exitoso o cancelado
      success_url: `${process.env.NEXT_PUBLIC_URL}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/realizar-pedido`,
      metadata: {
        // Datos adicionales que quieres asociar a la sesión de Stripe
        email,
        metodoPago,
      },
    });

    // --- ¡¡¡INSERCIÓN EN LA BASE DE DATOS CON LA COLUMNA 'productos'!!! ---
    // Inserta los detalles del pedido en tu tabla 'pedidos'.
    // Aquí, `JSON.stringify(productos)` convierte el array de objetos 'productos'
    // en una cadena JSON para almacenarla en la columna 'productos' de tipo TEXT.
    await sql`
      INSERT INTO pedidos (email, metodo_pago, total, estado, stripe_session_id, creado_en, productos)
      VALUES (
        ${email},             // Correo electrónico del cliente
        ${metodoPago},         // Método de pago (ej: 'tarjeta', 'recoger')
        ${total},             // Total del pedido
        'pendiente',          // Estado inicial del pedido
        ${session.id},        // ID de la sesión de Stripe
        NOW(),                // Fecha y hora actual
        ${JSON.stringify(productos)} // Los productos del pedido como una cadena JSON
      )
    `;

    // Devuelve la URL de la sesión de Stripe para que el frontend pueda redirigir al usuario
    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante el proceso
    console.error('Error creando sesión de Stripe o guardando pedido:', error);
    // Devuelve una respuesta de error con un estado 500 al cliente
    return NextResponse.json({ error: 'Error al iniciar el proceso de pago. Por favor, inténtelo de nuevo.' }, { status: 500 });
  }
}