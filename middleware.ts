import { NextRequest, NextResponse } from 'next/server'
import { decodeJwt } from 'jose'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  let usuarioValido = false

  if (token) {
    try {
      const payload = decodeJwt(token)
      const ahora = Math.floor(Date.now() / 1000)
      usuarioValido = !payload.exp || payload.exp > ahora
    } catch {
      usuarioValido = false
    }
  }

  if (!usuarioValido) {
    const url = req.nextUrl.clone()
    url.pathname = '/registrologin/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/micuenta/:path*'],
}
