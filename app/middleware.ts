// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'CAMBIA_ESTA_CLAVE_POR_ALGO_MUY_SEGURO'

// Si quieres proteger todo `/admin` o `/perfil`, etc:
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Por ejemplo: si la ruta empieza por /perfil o /admin, exigimos token
  if (pathname.startsWith('/perfil') || pathname.startsWith('/admin')) {
    const token = req.cookies.get('token')?.value
    if (!token) {
      // Si no hay token, redirige a login
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    try {
      jwt.verify(token, JWT_SECRET)
      // Si el token es válido, dejamos pasar
      return NextResponse.next()
    } catch (err) {
      // Token inválido o expirado → redirigimos
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Configuración: en qué rutas se aplica
export const config = {
  matcher: ['/perfil/:path*', '/admin/:path*'],
}
