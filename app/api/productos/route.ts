// app/api/productos/route.ts

import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL as string)

interface PostRequestBody {
  subcategoria_id: number
}

export async function GET(request: Request) {
  const url    = new URL(request.url)
  const search = url.searchParams.get('search')?.trim()

  // Si no hay query, devolvemos todos los productos
  if (!search) {
    const productos = await sql`SELECT * FROM productos`
    return NextResponse.json(productos)
  }

  // Patrón exacto, prefijo y fuzzy
  const exact  = search
  const prefix = `${search}%`
  const fuzzy  = `%${search}%`

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
    `
    return NextResponse.json(resultados)
  } catch (error) {
    console.error('Error en búsqueda:', error)
    return NextResponse.json(
      { message: 'Error en la base de datos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const body: PostRequestBody = await request.json()
  if (!body.subcategoria_id) {
    return NextResponse.json(
      { message: 'Falta el ID de subcategoría' },
      { status: 400 }
    )
  }
  const productos = await sql`
    SELECT * FROM productos
    WHERE subcategoria_id = ${body.subcategoria_id}
  `
  return NextResponse.json(productos)
}
