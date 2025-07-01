// app/api/productos/route.ts

import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { writeFile } from 'fs/promises';
import path from 'path';

const sql = neon(process.env.DATABASE_URL as string);

interface PostRequestBody {
  subcategoria_id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: boolean;
  imagen?: string;
}

interface PutRequestBody {
  id: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: boolean;
  imagen?: string;
  subcategoria_id?: number;
}

// Obtener productos o realizar búsqueda
export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search')?.trim();

  if (!search) {
    const productos = await sql`SELECT * FROM productos`;
    return NextResponse.json(productos);
  }

  const exact = search;
  const prefix = `${search}%`;
  const fuzzy = `%${search}%`;

  try {
    const resultados = await sql`
      SELECT id, nombre, precio, imagen, stock, descripcion
      FROM productos
      WHERE nombre ILIKE ${fuzzy}
      ORDER BY
        (LOWER(nombre) = LOWER(${exact})) DESC,
        (LOWER(nombre) LIKE LOWER(${prefix})) DESC,
        (LOWER(nombre) LIKE LOWER(${fuzzy})) DESC,
        nombre
      LIMIT 10
    `;
    return NextResponse.json(resultados);
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return NextResponse.json(
      { message: 'Error en la base de datos' },
      { status: 500 }
    );
  }
}

// Crear producto o filtrar por subcategoría
export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';

  // 🔹 Si es JSON (filtro o creación sin imagen)
  if (contentType.includes('application/json')) {
    const body: PostRequestBody = await request.json();

    if (body.subcategoria_id && !body.nombre) {
      const productos = await sql`
        SELECT * FROM productos
        WHERE subcategoria_id = ${body.subcategoria_id}
      `;
      return NextResponse.json(productos);
    }

    const { nombre, descripcion, precio, stock, imagen, subcategoria_id } = body;

    if (!nombre || !descripcion || !precio || stock === undefined || !imagen || !subcategoria_id) {
      return NextResponse.json(
        { message: 'Faltan datos obligatorios para crear el producto' },
        { status: 400 }
      );
    }

    try {
      const result = await sql`
        INSERT INTO productos (nombre, descripcion, precio, stock, imagen, subcategoria_id)
        VALUES (${nombre}, ${descripcion}, ${precio}, ${stock}, ${imagen}, ${subcategoria_id})
        RETURNING id
      `;
      return NextResponse.json({ message: 'Producto creado correctamente', id: result[0].id });
    } catch (error) {
      console.error('Error al crear producto:', error);
      return NextResponse.json({ message: 'Error al crear el producto' }, { status: 500 });
    }
  }

  // 🔹 Si es FormData (creación con imagen subida)
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();

    const nombre = formData.get('nombre')?.toString();
    const descripcion = formData.get('descripcion')?.toString();
    const precio = Number(formData.get('precio'));
    const stock = formData.get('stock') === 'true';
    const imagen = formData.get('imagen') as File;
    const subcategoria_id = Number(formData.get('subcategoria'));

    if (!nombre || !descripcion || isNaN(precio) || !imagen || isNaN(subcategoria_id)) {
      return NextResponse.json(
        { message: 'Faltan datos obligatorios para crear el producto' },
        { status: 400 }
      );
    }

    try {
      const buffer = Buffer.from(await imagen.arrayBuffer())
if (buffer.length > 4 * 1024 * 1024) {
  return NextResponse.json({ message: 'La imagen supera los 4 MB' }, { status: 400 })
}

      const filePath = path.join(process.cwd(), 'public', 'imagenes', 'productos', imagen.name);
      await writeFile(filePath, buffer);

      const result = await sql`
        INSERT INTO productos (nombre, descripcion, precio, stock, imagen, subcategoria_id)
        VALUES (${nombre}, ${descripcion}, ${precio}, ${stock}, ${imagen.name}, ${subcategoria_id})
        RETURNING id
      `;
      return NextResponse.json({ message: 'Producto creado correctamente', id: result[0].id });
    } catch (error) {
      console.error('Error al crear producto con imagen:', error);
      return NextResponse.json({ message: 'Error al crear el producto' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Tipo de contenido no soportado' }, { status: 415 });
}

// Actualizar producto existente
export async function PUT(request: Request) {
  const body: PutRequestBody = await request.json();
  const { id, nombre, descripcion, precio, stock, imagen, subcategoria_id } = body;

  if (!id) {
    return NextResponse.json({ message: 'Falta el ID del producto' }, { status: 400 });
  }

  try {
    await sql`
      UPDATE productos
      SET
        nombre = COALESCE(${nombre}, nombre),
        descripcion = COALESCE(${descripcion}, descripcion),
        precio = COALESCE(${precio}, precio),
        stock = COALESCE(${stock}, stock),
        imagen = COALESCE(${imagen}, imagen),
        subcategoria_id = COALESCE(${subcategoria_id}, subcategoria_id)
      WHERE id = ${id}
    `;
    return NextResponse.json({ message: 'Producto actualizado correctamente' });
  } catch (error: any) {
  console.error('Error al crear producto:', error);
  return NextResponse.json({ message: 'Error al crear el producto', error: error.message }, { status: 500 });
}

}
