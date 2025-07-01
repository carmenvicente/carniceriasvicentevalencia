import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { randomUUID } from 'crypto'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'Falta la imagen' }, { status: 400 })
  }

  const blob = await put(`productos/${randomUUID()}-${file.name}`, file, {
    access: 'public', // Puedes usar 'private' si necesitas control de acceso
  })

  return NextResponse.json({ url: blob.url })
}
