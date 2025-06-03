// app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL as string)

interface Body {
  email: string
  password: string
  nombre: string
  apellidos?: string
  tratamiento?: string
}

export async function POST(request: Request) {
  try {
    const { email, password, nombre, apellidos, tratamiento }: Body = await request.json()

    // 1) Validaciones básicas
    if (!email || !password || !nombre) {
      return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 })
    }

    // 2) Comprobar que no exista ya un usuario con ese email
    const existing = await sql`SELECT id FROM usuarios WHERE email = ${email}`
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Este correo ya está registrado' }, { status: 409 })
    }

    // 3) Hashear la contraseña
    const password_hash = await bcrypt.hash(password, 10)

    // 4) Insertar en la tabla “usuarios”
    const inserted = await sql`
      INSERT INTO usuarios (email, password_hash, nombre, apellidos, tratamiento, role)
      VALUES (${email}, ${password_hash}, ${nombre}, ${apellidos || null}, ${tratamiento || null}, 'cliente')
      RETURNING id, email, nombre, apellidos, tratamiento, role, created_at
    `

    // 5) Devolver datos básicos (sin el password_hash)
    const nuevoUsuario = inserted[0]
    return NextResponse.json({ user: nuevoUsuario }, { status: 201 })
  } catch (err) {
    console.error('Error en /api/auth/register:', err)
    return NextResponse.json({ message: 'Error interno' }, { status: 500 })
  }
}
