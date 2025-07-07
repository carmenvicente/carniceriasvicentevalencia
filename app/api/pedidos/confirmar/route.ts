import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { neon } from '@neondatabase/serverless'
import nodemailer from 'nodemailer'

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

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session || !session.customer_details?.email) {
      return NextResponse.json({ error: 'Sesión inválida o incompleta' }, { status: 400 })
    }

    const email = session.customer_details.email
    const total = session.amount_total ? session.amount_total / 100 : null

    // Actualizar el pedido en la base de datos
    await sql`
      UPDATE pedidos
      SET estado = 'confirmado'
      WHERE stripe_session_id = ${sessionId}
    `

    // Enviar correo de confirmación
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Carnicería Vicente Valencia" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Confirmación de pedido - Carnicería Vicente Valencia',
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <h2>¡Gracias por tu compra!</h2>
          <p>Hemos recibido tu pedido correctamente y está en preparación.</p>
          <p><strong>Importe total:</strong> ${(total ?? 0).toFixed(2)} €</p>
          <p>Recuerda que podrás recogerlo en nuestra tienda física en horario comercial.</p>
          <p style="margin-top: 20px;">Dirección: <strong>Av. de Castilla-la Mancha, N° 27, Bajo, 16003 Cuenca</strong></p>
          <br/>
          <p>Un saludo,</p>
          <p><strong>Carnicería Vicente Valencia</strong></p>
        </div>
      `,
    })

    return NextResponse.json({ email, total })
  } catch (error) {
    console.error('Error al confirmar el pedido:', error)
    return NextResponse.json({ error: 'Error al confirmar el pedido' }, { status: 500 })
  }
}
