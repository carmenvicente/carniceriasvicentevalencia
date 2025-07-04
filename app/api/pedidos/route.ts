import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(req: Request) {
  try {
    const { productos, email, metodoPago } = await req.json()

    const line_items = productos.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.nombre,
        },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // También puedes incluir apple_pay y google_pay desde Stripe directamente
      mode: 'payment',
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_URL}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/realizar-pedido`,
      metadata: {
        email,
        metodoPago,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creando sesión de Stripe:', error)
    return NextResponse.json({ error: 'Error creando sesión de pago' }, { status: 500 })
  }
}
