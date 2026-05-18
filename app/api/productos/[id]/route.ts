export const dynamic = 'force-dynamic';

import { NextResponse, NextRequest } from 'next/server'
import { neon } from '@neondatabase/serverless'
import postgres from 'postgres'
import path from 'path'
import { writeFile } from 'fs/promises'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

function checkAdminAuth(request: NextRequest): NextResponse | null {
  const auth = request.headers.get('Authorization')
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: string }
    if (payload.role !== 'admin') return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    return null
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }
}

const getSQL = () => neon(process.env.DATABASE_URL as string)
const getPSQL = () => postgres(process.env.DATABASE_URL as string)

// Obtener producto por ID
export async function GET(request: NextRequest) {
  const sql = getSQL()
  const psql = getPSQL()
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ message: 'Falta el ID del producto' }, { status: 400 })
  }

  try {
    const resultado = await sql`
      SELECT 
        productos.*, 
        subcategorias.nombre AS subcategoria_nombre
      FROM productos
      JOIN subcategorias ON productos.subcategoria_id = subcategorias.id
      WHERE productos.id = ${id}
    `

    if (resultado.length === 0) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 })
    }

    const producto = resultado[0]

    return NextResponse.json({
      ...producto,
      subcategoria: {
        id: producto.subcategoria_id,
        nombre: producto.subcategoria_nombre
      }
    })
  } catch (error) {
    console.error('Error en BD:', error)
    return NextResponse.json({ message: 'Error en la base de datos' }, { status: 500 })
  }
}

// Actualizar producto por ID
export async function PUT(request: NextRequest) {
  const authError = checkAdminAuth(request)
  if (authError) return authError

  const sql = getSQL()
  const psql = getPSQL()
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ message: 'Falta el ID del producto' }, { status: 400 })
  }

  try {
    const formData = await request.formData()
    const actualizaciones: Record<string, any> = {}

    const nombre = formData.get('nombre')
    if (nombre !== null) actualizaciones.nombre = nombre.toString()

    const descripcion = formData.get('descripcion')
    if (descripcion !== null) actualizaciones.descripcion = descripcion.toString()

    const precio = formData.get('precio')
    if (precio !== null && !isNaN(Number(precio))) actualizaciones.precio = Number(precio)

    const stock = formData.get('stock')
    if (stock !== null) actualizaciones.stock = stock === 'true'

    const subcategoria = formData.get('subcategoria')
    if (subcategoria !== null && !isNaN(Number(subcategoria))) {
      actualizaciones.subcategoria_id = Number(subcategoria)
    }

    const imagen = formData.get('imagen') as File
    if (imagen && imagen.name) {
      const buffer = Buffer.from(await imagen.arrayBuffer())
      const filePath = path.join(process.cwd(), 'public', 'imagenes', 'productos', imagen.name)
      await writeFile(filePath, buffer)
      actualizaciones.imagen = imagen.name
    }

    if (Object.keys(actualizaciones).length === 0) {
      return NextResponse.json({ message: 'No se han recibido cambios para actualizar' }, { status: 400 })
    }

    const keys = Object.keys(actualizaciones)
    const values = Object.values(actualizaciones)
    const setQuery = keys.map((key, i) => `${key} = $${i + 2}`).join(', ')
    const query = `UPDATE productos SET ${setQuery} WHERE id = $1`

    await psql.unsafe(query, [id, ...values])

    return NextResponse.json({ message: 'Producto actualizado correctamente' })
  } catch (error: any) {
    console.error('❌ Error al actualizar producto:', error)
    return NextResponse.json({ message: 'Error al actualizar producto' }, { status: 500 })
  }
}

// Eliminar producto por ID
export async function DELETE(request: NextRequest) {
  const authError = checkAdminAuth(request)
  if (authError) return authError

  const sql = getSQL()
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ message: 'Falta el ID del producto' }, { status: 400 })
  }

  try {
    await sql`DELETE FROM productos WHERE id = ${id}`
    return NextResponse.json({ message: 'Producto eliminado correctamente' })
  } catch (error: any) {
    console.error('❌ Error al eliminar producto:', error)
    return NextResponse.json(
      { message: 'Error al eliminar producto' },
      { status: 500 }
    )
  }
}
