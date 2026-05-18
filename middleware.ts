import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch {
      // Token inválido o expirado — redirigir a login
    }
  }

  const url = req.nextUrl.clone()
  url.pathname = '/registrologin/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/micuenta/:path*'],
}
