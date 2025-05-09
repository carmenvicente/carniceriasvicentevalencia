// app/api/productos/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL as string)

// Le decimos a TS que los params vienen envueltos en una promesa
type Props = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, props: Props) {
  // Esperamos a que nos entreguen los params
  const { id } = await props.params

  if (!id) {
    return NextResponse.json(
      { message: 'Falta el ID del producto' },
      { status: 400 }
    )
  }

  try {
    const resultado = await sql`
      SELECT *
      FROM productos
      WHERE id = ${id}
    `
    if (resultado.length === 0) {
      return NextResponse.json(
        { message: 'Producto no encontrado' },
        { status: 404 }
      )
    }
    return NextResponse.json(resultado[0])
  } catch (error) {
    console.error('Error en BD:', error)
    return NextResponse.json(
      { message: 'Error en la base de datos' },
      { status: 500 }
    )
  }
}
