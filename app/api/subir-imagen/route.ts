import { NextResponse, NextRequest } from 'next/server'
import { put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(request: NextRequest) {
  const auth = request.headers.get('Authorization')
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: string }
    if (payload.role !== 'admin') return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file || !file.name) {
      console.error('❌ No se ha proporcionado un archivo válido')
      return NextResponse.json({ error: 'Falta la imagen' }, { status: 400 })
    }

    console.log('📸 Subiendo imagen:', file.name, 'Tamaño:', file.size, 'bytes')

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'La imagen supera los 5MB' }, { status: 413 })
    }

    const nombreSeguro = `${randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    // ✅ Leer el contenido del archivo como ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // ✅ Subir con `put`
    const blob = await put(`productos/${nombreSeguro}`, buffer, {
      access: 'public',
      contentType: file.type || 'application/octet-stream',
    })

    console.log('✅ Imagen subida correctamente:', blob.url)

    return NextResponse.json({ url: blob.url })
  } catch (error: any) {
    console.error('❌ Error interno al subir imagen:', error)
    return NextResponse.json(
      { error: 'Error interno al subir imagen' },
      { status: 500 }
    )
  }
}
