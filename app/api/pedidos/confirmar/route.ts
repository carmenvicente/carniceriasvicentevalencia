import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { neon } from '@neondatabase/serverless'
import { enviarCorreoConfirmacionPedido } from '@/lib/email'

const sql = neon(process.env.DATABASE_URL as string)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Falta sessionId' }, { status: 400 })
    }

    // Obtener la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session || !session.customer_details?.email) {
      return NextResponse.json({ error: 'Sesión inválida o incompleta' }, { status: 400 })
    }

    const email = session.customer_details.email
    const total = session.amount_total ? session.amount_total / 100 : 0

    // Recuperar datos del cliente desde la base de datos
    const resultado = await sql`
  SELECT nombre, apellidos, tratamiento
  FROM pedidos
  WHERE stripe_session_id = ${sessionId}
`

const pedido = resultado[0] as {
  nombre?: string
  apellidos?: string
  tratamiento?: string
} || {}


    // Actualizar estado del pedido a "confirmado"
    await sql`
      UPDATE pedidos
      SET estado = 'confirmado'
      WHERE stripe_session_id = ${sessionId}
    `

    // Enviar correo personalizado
    await enviarCorreoConfirmacionPedido({
      email,
      nombre: pedido.nombre ?? undefined,
      apellidos: pedido.apellidos ?? undefined,
      tratamiento: pedido.tratamiento ?? undefined,
      total,
    })

    return NextResponse.json({ email, total })
  } catch (error) {
    console.error('Error al confirmar el pedido:', error)
    return NextResponse.json({ error: 'Error al confirmar el pedido' }, { status: 500 })
  }
}
