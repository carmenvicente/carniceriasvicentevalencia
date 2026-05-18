export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { enviarCorreoBienvenida } from '@/lib/email';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const getSQL = () => neon(`${process.env.DATABASE_URL}?options=--client_encoding=UTF8`);
const JWT_SECRET = process.env.JWT_SECRET;

interface Body {
  email: string;
  password: string;
  nombre: string;
  apellidos?: string;
  tratamiento?: string;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSec } = checkRateLimit(`register:${ip}`, 5, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { message: `Demasiados intentos. Inténtalo de nuevo en ${Math.ceil(retryAfterSec / 60)} minutos.` },
      { status: 429 }
    );
  }

  const sql = getSQL();
  try {
    const rawBody: Body = await request.json();

    const email = rawBody.email?.toString() || '';
    const password = rawBody.password?.toString() || '';
    const nombre = rawBody.nombre?.toString() || '';
    const apellidos = rawBody.apellidos?.toString() || null;
    const tratamiento = rawBody.tratamiento?.toString() || null;

    if (!email || !password || !nombre) {
      return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    const existing = await sql`SELECT id FROM usuarios WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Este correo ya está registrado' }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const inserted = await sql`
      INSERT INTO usuarios (email, password_hash, nombre, apellidos, tratamiento, role)
      VALUES (${email}, ${password_hash}, ${nombre}, ${apellidos}, ${tratamiento}, 'cliente')
      RETURNING id, email, nombre, apellidos, tratamiento, role, created_at
    `;

    const nuevoUsuario = inserted[0];

    await enviarCorreoBienvenida(nuevoUsuario.nombre, nuevoUsuario.email, nuevoUsuario.apellidos, nuevoUsuario.tratamiento);

    const token = jwt.sign(
      {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
        nombre: nuevoUsuario.nombre,
        apellidos: nuevoUsuario.apellidos,
        tratamiento: nuevoUsuario.tratamiento,
        role: nuevoUsuario.role,
      },
      JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ user: nuevoUsuario, token }, { status: 201 });
  } catch (err) {
    console.error('Error en /api/auth/register:', err);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
