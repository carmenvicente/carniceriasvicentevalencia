import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL as string);

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ message: 'Falta el ID del producto' }, { status: 400 });
  }

  try {
    const resultado = await sql`SELECT * FROM productos WHERE id = ${id}`;
    if (resultado.length === 0) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }
    return NextResponse.json(resultado[0]);
  } catch (error) {
    console.error('Error en BD:', error);
    return NextResponse.json({ message: 'Error en la base de datos' }, { status: 500 });
  }
}
