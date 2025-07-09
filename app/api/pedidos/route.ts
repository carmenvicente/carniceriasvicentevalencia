import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';

// Inicializa la conexión a la base de datos Neon
const sql = neon(process.env.DATABASE_URL as string);

// Inicializa Stripe con tu clave secreta y versión de API
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
});

// *********** PUNTO CRÍTICO: Asegúrate de que esta exportación es EXACTA ***********
export async function POST(req: Request) {
  try {
    // --- Añade este console.log para depuración ---
    console.log('API Route: POST request received for /api/auth/pedidos');

    const { productos, email, metodoPago } = await req.json();

    if (!Array.isArray(productos) || productos.length === 0) {
      console.error('Validation Error: Productos invalidos o vacios.');
      return NextResponse.json({ error: 'Productos inválidos o vacíos en la solicitud' }, { status: 400 });
    }

    const line_items = productos.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.nombre,
        },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad,
    }));

    const total = productos.reduce((sum: number, item: any) => sum + item.precio * item.cantidad, 0);

    // Si metodoPago es 'tienda', no necesitamos una sesión de Stripe
    if (metodoPago === 'tienda') {
      await sql`
        INSERT INTO pedidos (email, metodo_pago, total, estado, creado_en, productos)
        VALUES (
          ${email},
          ${metodoPago},
          ${total},
          'pendiente', -- Para pagos en tienda, inicialmente pendiente
          NOW(),
          ${JSON.stringify(productos)}
        )
      `;
      console.log('Pedido manual (tienda) guardado exitosamente.');
      return NextResponse.json({ message: 'Pedido procesado para pago en tienda' });
    }

    // Para Stripe
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

    // --- Inserción en la base de datos para pedidos con Stripe ---
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

  } catch (error) {
    console.error('Error in API Route /api/auth/pedidos:', error);
    // Verificar si el error es una instancia de Error para obtener el mensaje
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al procesar el pedido.';
    return NextResponse.json({ error: `Error al procesar el pedido: ${errorMessage}` }, { status: 500 });
  }
}

// Opcional: Si sospechas que un GET está llegando, puedes añadir esto temporalmente
// export async function GET(req: Request) {
//   console.log('GET request received for /api/auth/pedidos. This route only supports POST.');
//   return NextResponse.json({ message: 'GET not allowed. This endpoint only supports POST requests.' }, { status: 405 });
// }