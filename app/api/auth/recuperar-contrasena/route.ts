import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const sql = neon(process.env.DATABASE_URL as string)
const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: 'El correo es obligatorio' }, { status: 400 })
    }

    const rows = await sql`SELECT id FROM usuarios WHERE email = ${email}`

    if (rows.length > 0) {
      const token = jwt.sign(
        { email, type: 'password-reset' },
        JWT_SECRET,
        { expiresIn: '1h' }
      )

      const resetUrl = `${process.env.NEXT_PUBLIC_URL}/registrologin/nueva-contrasena?token=${token}`

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ''),
        },
      })

      await transporter.sendMail({
        from: `"Carnicería Vicente Valencia" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Recuperación de contraseña — Carnicería Vicente Valencia',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #990000;">Recuperación de contraseña</h2>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
            <p>Haz clic en el siguiente botón para crear una nueva contraseña. El enlace es válido durante <strong>1 hora</strong>.</p>
            <a href="${resetUrl}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#990000;color:#fff;text-decoration:none;border-radius:4px;font-weight:bold;">
              Restablecer contraseña
            </a>
            <p style="color:#666;font-size:13px;">Si no has solicitado este cambio, puedes ignorar este correo. Tu contraseña no se modificará.</p>
          </div>
        `,
      })
    }

    // Siempre devolvemos el mismo mensaje para no revelar si el email existe
    return NextResponse.json({
      message: 'Si el correo está registrado, recibirás un enlace de recuperación en breve.',
    })
  } catch (err) {
    console.error('Error en /api/auth/recuperar-contrasena:', err)
    return NextResponse.json({ message: 'Error interno' }, { status: 500 })
  }
}
