import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const sql = neon(`${process.env.DATABASE_URL}?options=--client_encoding=UTF8`);
const JWT_SECRET = process.env.JWT_SECRET || 'CAMBIA_ESTA_CLAVE_POR_ALGO_MUY_SEGURO';

interface Body {
  email: string;
  password: string;
  nombre: string;
  apellidos?: string;
  tratamiento?: string;
}

export async function POST(request: Request) {
  try {
    // ✅ 1) Asegurarse de que los campos vienen como texto plano
    const rawBody: Body = await request.json();

    const email = rawBody.email?.toString() || '';
    const password = rawBody.password?.toString() || '';
    const nombre = rawBody.nombre?.toString() || '';
    const apellidos = rawBody.apellidos?.toString() || null;
    const tratamiento = rawBody.tratamiento?.toString() || null;

    // ✅ 2) Validación básica
    if (!email || !password || !nombre) {
      return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
    }

    // ✅ 3) Comprobar que no exista ya el correo
    const existing = await sql`SELECT id FROM usuarios WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Este correo ya está registrado' }, { status: 409 });
    }

    // ✅ 4) Hashear la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // ✅ 5) Insertar en base de datos
    const inserted = await sql`
      INSERT INTO usuarios (email, password_hash, nombre, apellidos, tratamiento, role)
      VALUES (${email}, ${password_hash}, ${nombre}, ${apellidos}, ${tratamiento}, 'cliente')
      RETURNING id, email, nombre, apellidos, tratamiento, role, created_at
    `;

    const nuevoUsuario = inserted[0];

    // ✅ 6) Generar token con datos seguros
    const token = jwt.sign(
      {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
        nombre: nuevoUsuario.nombre,
        apellidos: nuevoUsuario.apellidos,
        tratamiento: nuevoUsuario.tratamiento,
        role: nuevoUsuario.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ 7) Devolver al frontend el usuario + token
    return NextResponse.json(
      {
        user: nuevoUsuario,
        token,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error en /api/auth/register:', err);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
