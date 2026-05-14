import { NextRequest, NextResponse } from 'next/server'
import { decodeJwt } from 'jose'

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
      const payload = decodeJwt(token)
      const ahora = Math.floor(Date.now() / 1000)
      usuarioValido = !payload.exp || payload.exp > ahora
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
