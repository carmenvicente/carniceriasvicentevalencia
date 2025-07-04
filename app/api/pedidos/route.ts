import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { neon } from '@neondatabase/serverless'

// Conexión con Neon
const sql = neon(process.env.DATABASE_URL as string)

// Configuración de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(req: Request) {
  try {
    const { productos, email, metodoPago } = await req.json()

    // Preparar productos para Stripe
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
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_URL}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/realizar-pedido`,
      metadata: {
        email,
        metodoPago,
      },
    })

    // Guardar el pedido en la base de datos (estado: pendiente)
    const total = productos.reduce((sum: number, item: any) => sum + item.precio * item.cantidad, 0)

    await sql`
      INSERT INTO pedidos (
        email, metodo_pago, total, estado, stripe_session_id, creado_en
      ) VALUES (
        ${email}, ${metodoPago}, ${total}, 'pendiente', ${session.id}, NOW()
      )
    `

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creando sesión de Stripe o guardando pedido:', error)
    return NextResponse.json({ error: 'Error creando sesión de pago' }, { status: 500 })
  }
}
