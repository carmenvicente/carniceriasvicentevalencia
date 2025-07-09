// app/api/stripe-webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';
import { enviarCorreoConfirmacionPedido } from '@/lib/email'; // Asumiendo que esta es la ruta correcta

const sql = neon(process.env.DATABASE_URL as string);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
});

// Este es el endpoint que Stripe llamará directamente.
export async function POST(req: Request) {
  const buf = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature!, // El '!' asegura que no es nulo, pero deberías verificarlo
      process.env.STRIPE_WEBHOOK_SECRET! // ¡IMPORTANTE! Esta variable debe estar configurada en Vercel
    );
  } catch (err: any) {
    console.error(`❌ Error al verificar la firma del webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Manejar el evento `checkout.session.completed`
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;
    const customerEmail = session.customer_details?.email || 'N/A';
    const totalAmount = session.amount_total ? session.amount_total / 100 : 0; // Convertir centavos a euros

    console.log(`✅ Webhook: checkout.session.completed para sesión: ${sessionId}`);

    try {
      // Actualiza el estado del pedido a 'pagado' en tu base de datos
      await sql`
        UPDATE pedidos
        SET estado = 'pagado', total = ${totalAmount} -- Asegúrate de que total se actualiza si cambias algo
        WHERE stripe_session_id = ${sessionId} AND email = ${customerEmail}
      `;
      console.log(`🎉 Pedido ${sessionId} actualizado a 'pagado' en DB y email ${customerEmail}.`);

      // Enviar correo de confirmación DESDE AQUÍ (es más fiable)
      // Como no tienes nombre/apellidos en la DB, y el webhook no siempre tiene todos los detalles del cliente
      // Usaremos lo que tenemos de la sesión de Stripe
      await enviarCorreoConfirmacionPedido({
        email: customerEmail,
        // nombre y apellidos no están directamente en la sesión para el webhook,
        // si los necesitas, Stripe los tiene en `customer.name` si creaste un objeto Customer.
        // Por ahora, los pasamos como undefined si no los tenemos aquí.
        nombre: undefined, // O puedes recuperarlos del `metadata` si los enviaste al crear la sesión
        apellidos: undefined,
        tratamiento: undefined,
        total: totalAmount,
      });
      console.log(`✉️ Correo de confirmación enviado para ${customerEmail}.`);

    } catch (dbError: any) {
      console.error(`❌ Error al actualizar DB o enviar correo para sesión ${sessionId}:`, dbError);
      return NextResponse.json({ error: 'Database update or email send failed' }, { status: 500 });
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  // Siempre responde 200 OK a Stripe para confirmar que recibiste el evento.
  return NextResponse.json({ received: true }, { status: 200 });
}