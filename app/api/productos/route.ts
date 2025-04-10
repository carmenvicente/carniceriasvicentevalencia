// app/api/productos/route.ts
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// Conexión a Neon (PostgreSQL en Vercel)
const sql = neon(process.env.DATABASE_URL as string);

// Tipo para el cuerpo de la solicitud POST
interface PostRequestBody {
  subcategoria_id: number;
}

// Obtener todos los productos
export async function GET(request: Request) {
  try {
    const productos = await sql`SELECT * FROM productos`;
    return NextResponse.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json({ message: "Error en la base de datos", error }, { status: 500 });
  }
}

// Obtener productos por subcategoría
export async function POST(request: Request) {
  try {
    const body: PostRequestBody = await request.json(); // Añadimos el tipo de cuerpo de la solicitud
    const { subcategoria_id } = body;

    if (!subcategoria_id) {
      return NextResponse.json({ message: "Falta el ID de subcategoría" }, { status: 400 });
    }

    const productos = await sql`SELECT * FROM productos WHERE subcategoria_id = ${subcategoria_id}`;
    return NextResponse.json(productos);
  } catch (error) {
    console.error("Error al obtener productos por subcategoría:", error);
    return NextResponse.json({ message: "Error en la base de datos", error }, { status: 500 });
  }
}



