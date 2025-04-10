import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// Conexión a Neon (PostgreSQL en Vercel)
const sql = neon(process.env.DATABASE_URL as string);

// Obtener un producto por su ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Obtén el ID del producto desde los parámetros de la URL

    if (!id) {
      return NextResponse.json({ message: "Falta el ID del producto" }, { status: 400 });
    }

    // Consulta para obtener el producto por su ID
    const producto = await sql`SELECT * FROM productos WHERE id = ${id}`;
    
    if (producto.length === 0) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(producto[0]); // Retorna el primer producto encontrado
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    return NextResponse.json({ message: "Error en la base de datos", error }, { status: 500 });
  }
}
