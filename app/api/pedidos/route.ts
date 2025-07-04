import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Pool } from 'pg'

// Conexión a la base de datos Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Stripe config
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(req: Request) {
  try {
    const { productos, email, metodoPago } = await req.json()

    // Crear sesión de pago con Stripe
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

    // Guardar el pedido en la base de datos (estado inicial: pendiente)
    const total = productos.reduce((sum: number, item: any) => sum + item.precio * item.cantidad, 0)

    await pool.query(
      'INSERT INTO pedidos (email, metodo_pago, total, estado, stripe_session_id, creado_en) VALUES ($1, $2, $3, $4, $5, NOW())',
      [email, metodoPago, total, 'pendiente', session.id]
    )

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creando sesión de Stripe o guardando pedido:', error)
    return NextResponse.json({ error: 'Error creando sesión de pago' }, { status: 500 })
  }
}
