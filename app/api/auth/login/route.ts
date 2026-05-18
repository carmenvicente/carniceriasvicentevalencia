// app/api/auth/login/route.ts

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const getSQL = () => neon(process.env.DATABASE_URL as string);

const JWT_SECRET = process.env.JWT_SECRET as string;

interface Body {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSec } = checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { message: `Demasiados intentos. Inténtalo de nuevo en ${Math.ceil(retryAfterSec / 60)} minutos.` },
      { status: 429 }
    );
  }

  const sql = getSQL();

  try {
    const { email, password }: Body = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Faltan email o contraseña' }, { status: 400 });
    }

    const rows = await sql`
      SELECT id, email, password_hash, role, nombre, apellidos, tratamiento
      FROM usuarios
      WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    const user = rows[0];

    function limpiarTexto(texto: any) {
      return texto ? texto.toString() : '';
    }

    const nombre = limpiarTexto(user.nombre);
    const apellidos = limpiarTexto(user.apellidos);
    const tratamiento = limpiarTexto(user.tratamiento);

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, nombre, apellidos, tratamiento, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      user: { id: user.id, email: user.email, role: user.role, nombre, apellidos, tratamiento },
      token,
    });

  } catch (err) {
    console.error('Error en /api/auth/login:', err);
    return NextResponse.json({ message: 'Error interno' }, { status: 500 });
  }
}
