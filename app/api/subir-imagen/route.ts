import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { randomUUID } from 'crypto'

export async function POST(request: Request) {
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
      { error: 'Error interno al subir imagen', detalle: error.message },
      { status: 500 }
    )
  }
}
