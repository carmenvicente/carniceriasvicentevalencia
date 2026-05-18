export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

const getSQL = () => neon(process.env.DATABASE_URL as string);
const JWT_SECRET = process.env.JWT_SECRET as string;

function getUsuario(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(authHeader.split(' ')[1], JWT_SECRET) as { id: number; email: string };
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const sql = getSQL();
  const usuario = getUsuario(req);
  if (!usuario) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const rows = await sql`
    SELECT f.producto_id, p.nombre, p.precio, p.imagen
    FROM favoritos f
    JOIN productos p ON f.producto_id = p.id
    WHERE f.usuario_id = ${usuario.id}
    ORDER BY f.creado_en DESC
  `;

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const sql = getSQL();
  const usuario = getUsuario(req);
  if (!usuario) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { productoId } = await req.json();

  await sql`
    INSERT INTO favoritos (usuario_id, producto_id)
    VALUES (${usuario.id}, ${productoId})
    ON CONFLICT (usuario_id, producto_id) DO NOTHING
  `;

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const sql = getSQL();
  const usuario = getUsuario(req);
  if (!usuario) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { productoId } = await req.json();

  await sql`
    DELETE FROM favoritos
    WHERE usuario_id = ${usuario.id} AND producto_id = ${productoId}
  `;

  return NextResponse.json({ ok: true });
}
