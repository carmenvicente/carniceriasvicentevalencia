import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

const RUTAS_PROTEGIDAS = ['/micuenta']
const RUTAS_SOLO_INVITADOS = ['/registrologin/login', '/registrologin/register']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')?.value

  const esRutaProtegida = RUTAS_PROTEGIDAS.some(r => pathname.startsWith(r))
  const esRutaInvitado = RUTAS_SOLO_INVITADOS.some(r => pathname.startsWith(r))

  let usuarioValido = false

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET)
      usuarioValido = true
    } catch {
      usuarioValido = false
    }
  }

  // Usuario sin sesión intentando acceder a ruta protegida → al login
  if (esRutaProtegida && !usuarioValido) {
    const url = req.nextUrl.clone()
    url.pathname = '/registrologin/login'
    return NextResponse.redirect(url)
  }

  // Usuario con sesión activa intentando entrar al login/registro → a su cuenta
  if (esRutaInvitado && usuarioValido) {
    const url = req.nextUrl.clone()
    url.pathname = '/micuenta'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/micuenta/:path*', '/registrologin/:path*'],
}
