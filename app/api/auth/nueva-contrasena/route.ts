import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const sql = neon(process.env.DATABASE_URL as string)
const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ message: 'Token y contraseña son obligatorios' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 })
    }

    let payload: { email: string; type: string }
    try {
      payload = jwt.verify(token, JWT_SECRET) as { email: string; type: string }
    } catch {
      return NextResponse.json({ message: 'El enlace ha expirado o no es válido' }, { status: 400 })
    }

    if (payload.type !== 'password-reset') {
      return NextResponse.json({ message: 'Token inválido' }, { status: 400 })
    }

    const hash = await bcrypt.hash(password, 10)
    await sql`UPDATE usuarios SET password_hash = ${hash} WHERE email = ${payload.email}`

    return NextResponse.json({ message: 'Contraseña actualizada correctamente' })
  } catch (err) {
    console.error('Error en /api/auth/nueva-contrasena:', err)
    return NextResponse.json({ message: 'Error interno' }, { status: 500 })
  }
}
