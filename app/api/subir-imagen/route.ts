import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { randomUUID } from 'crypto'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Falta la imagen' }, { status: 400 })
    }

    const blob = await put(`productos/${randomUUID()}-${file.name}`, file, {
      access: 'public',
    })

    return NextResponse.json({ url: blob.url })
  } catch (error: any) {
    console.error('❌ Error al subir imagen a Vercel Blob:', error)
    return NextResponse.json({ error: 'Error interno al subir imagen' }, { status: 500 })
  }
}
