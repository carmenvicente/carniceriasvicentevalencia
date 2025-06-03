// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const sql = neon(process.env.DATABASE_URL as string)
const JWT_SECRET = process.env.JWT_SECRET || 'CAMBIA_ESTA_CLAVE_POR_ALGO_MUY_SEGURO'

interface Body {
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const { email, password }: Body = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: 'Faltan email o contraseña' }, { status: 400 })
    }

    // 1) Obtener el usuario por email
    const rows = await sql`
      SELECT id, email, password_hash, role, nombre, apellidos, tratamiento
      FROM usuarios
      WHERE email = ${email}
    `
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 })
    }

    const user = rows[0]

    // 2) Comparar hashes
    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 })
    }

    // 3) Generar un JWT (o lo que uses para sesiones)
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // 4) Devolver datos y token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        nombre: user.nombre,
        apellidos: user.apellidos,
        tratamiento: user.tratamiento,
      },
      token,
    })
  } catch (err) {
    console.error('Error en /api/auth/login:', err)
    return NextResponse.json({ message: 'Error interno' }, { status: 500 })
  }
}
