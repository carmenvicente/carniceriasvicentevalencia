'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import '../styles/navbar.css'
import Image from 'next/image'
import { PerfilMenu } from '@/app/componentes/PerfilMenu';
import PopupCarrito from '@/app/componentes/PopupCarrito'
import { useCarrito } from '@/app/contextos/CarritoContexto'


export default function Navbar() {
  const router = useRouter()
  const [scrolling, setScrolling] = useState(false)
  const [menuFrescosOpen, setMenuFrescosOpen] = useState(false)
  const [menuElaboradosOpen, setMenuElaboradosOpen] = useState(false)
  const frescosTimer = useRef<number | null>(null)
  const elaboradosTimer = useRef<number | null>(null)

  // Estados para el buscador
  const doSearch = () => {
    toggleSearch()
    router.push(`/busqueda?search=${encodeURIComponent(searchQuery)}`)
  }
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{
    imagen: string; id: number; nombre: string
  }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Estados para el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Las siguientes dos ya no controlan el despliegue en móvil, pero las mantenemos si se usan en otra lógica.
  const [mobileFrescosOpen, setMobileFrescosOpen] = useState(false)
  const [mobileElaboradosOpen, setMobileElaboradosOpen] = useState(false)


  // Detectar scroll
  useEffect(() => {
    const onScroll = () => setScrolling(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú Frescos (Escritorio - Hover)
  const handleFrescosEnter = () => {
    if (frescosTimer.current) clearTimeout(frescosTimer.current)
    setMenuFrescosOpen(true)
  }
  const handleFrescosLeave = () => {
    frescosTimer.current = window.setTimeout(() => setMenuFrescosOpen(false), 500)
  }

  // Menú Elaborados (Escritorio - Hover)
  const handleElaboradosEnter = () => {
    if (elaboradosTimer.current) clearTimeout(elaboradosTimer.current)
    setMenuElaboradosOpen(true)
  }
  const handleElaboradosLeave = () => {
    elaboradosTimer.current = window.setTimeout(() => setMenuElaboradosOpen(false), 500)
  }

  // Abrir/Cerrar buscador
  const toggleSearch = () => setSearchOpen(o => !o)

  // Al abrir el buscador, enfocar el input
  useEffect(() => {
    if (searchOpen) requestAnimationFrame(() => inputRef.current?.focus())
  }, [searchOpen])

  // Live-search
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([])
      return
    }
    const ctl = new AbortController()
    fetch(`/api/productos?search=${encodeURIComponent(searchQuery)}`, {
      signal: ctl.signal
    })
      .then(res => res.json())
      .then((data: { id: number; nombre: string; imagen: string }[]) => {
        setSearchResults(data)
      })
      .catch(() => { /* cancelado */ })

    return () => ctl.abort()
  }, [searchQuery])

  const [hoverVisible, setHoverVisible] = useState(false)
  const { carrito } = useCarrito()


  return (
    <>
      {/* Overlay de búsqueda (Mantiene su backdrop si searchOpen es true) */}
      <div
        className={`
          fixed top-0 left-0 w-full h-24 bg-white z-50 flex overflow-visible items-center justify-center px-4
          transform transition-transform duration-300 ease-out
          ${searchOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Botón cerrar overlay */}
        <button
          onClick={toggleSearch}
          className="text-2xl font-bold leading-none mr-4 text-black"
          aria-label="Cerrar búsqueda"
        >
          ×
        </button>

        {/* Contenedor input + botones */}
        <div className="relative w-2/3 mx-auto">
          <input
            ref={inputRef}
            type="text"
            className="w-full h-10 pl-4 pr-14 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 text-black"
            placeholder="¿Qué estás buscando?"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') doSearch()
            }}
          />

          {/* Botón de borrar texto */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}

          {/* Botón rojo de búsqueda */}
          <Link
            href={`/busqueda?search=${encodeURIComponent(searchQuery)}`}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#990000] hover:bg-red-700 text-white p-2 rounded-full"
            aria-label="Buscar"
            onClick={toggleSearch} // Cerrar el overlay de búsqueda al hacer clic
          >
            <Image
              src="/imagenes/iconos/busqueda.png"
              alt="Buscar"
              width={16}
              height={16}
              className="h-4 w-4"
            />
          </Link>
        </div>
      </div>

      {/* Dropdown de resultados de búsqueda */}
      {searchOpen && searchResults.length > 0 && (
        <div className="fixed top-24 left-0 w-full bg-white z-50">
          <div className="w-full max-h-80 overflow-auto">
            <ul className="mx-auto w-full sm:w-4/5 lg:w-3/4 xl:w-2/3 max-w-screen-xl text-black">
              {searchResults.map(p => (
                <li key={p.id}>
                  <Link
                    href={`/detalle-productos/${p.id}`}
                    onClick={toggleSearch}
                    className="block"
                  >
                    <div className="flex items-center px-4 py-2 bg-white transition-colors hover:bg-gray-100">
                      <Image
                        src={p.imagen.startsWith('http') ? p.imagen : `/imagenes/productos/${p.imagen}`}
                        alt={p.nombre}
                        width={100}
                        height={32}
                        className="rounded mr-3 flex-shrink-0"
                      />
                      <span className="text-sm">{p.nombre}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Backdrop semitransparente (MODIFICADO) */}
      {searchOpen && ( // Solo muestra el backdrop si el buscador está abierto
        <div
          onClick={() => toggleSearch()} // Solo cierra el buscador al hacer clic
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Navbar principal */}
      <nav
        className={`
          fixed top-0 left-0 w-full py-0.5 transition-all duration-300 text-white
          ${scrolling ? 'bg-[rgba(0,0,0,0.9)]' : 'bg-transparent'}
        `}
        style={{ zIndex: 30 }}
      >
        <div className="flex items-center justify-between w-full px-4 text-xs font-semibold h-20">
          {/* Icono de menú de hamburguesa (Móvil) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Abrir menú"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Logo (Visible en todos los tamaños, pero más pequeño en móvil) */}
          <Link href="/" className="navbar-link flex items-center">
            <Image
              src="/imagenes/logos/logoblancocolor.png"
              alt="Logo"
              width={190}
              height={200}
              className="h-10 w-auto object-contain md:h-20"
              priority
            />
          </Link>

          {/* Menú central (Escritorio) */}
          <ul className="hidden md:flex flex-grow justify-center items-center space-x-6">
            <li>
              <Link href="/" className="navbar-link">INICIO</Link>
            </li>
            <li
              className="relative"
              onMouseEnter={handleFrescosEnter}
              onMouseLeave={handleFrescosLeave}
            >
              <span className="navbar-link cursor-pointer">
                PRODUCTOS FRESCOS ▼
              </span>
              {menuFrescosOpen && (
                <ul className="absolute left-0 mt-1 bg-white text-black rounded-lg shadow-lg min-w-[200px]">
                  {[
                    ['TERNERA', '/productos-frescos/ternera'],
                    ['CERDO', '/productos-frescos/cerdo'],
                    ['CORDERO', '/productos-frescos/cordero'],
                    ['AVES Y CONEJOS', '/productos-frescos/avesyconejos'],
                  ].map(([label, href], i, arr) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`
                          block w-full text-base pl-4 py-2 transition hover:text-[#990000]
                          ${i === 0 ? 'rounded-tl-lg rounded-tr-lg' : ''}
                          ${i === arr.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}
                        `}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={handleElaboradosEnter}
              onMouseLeave={handleElaboradosLeave}
            >
              <span className="navbar-link cursor-pointer">
                PRODUCTOS ELABORADOS ▼
              </span>
              {menuElaboradosOpen && (
                <ul className="absolute left-0 mt-1 bg-white text-black rounded-lg shadow-lg min-w-[230px]">
                  {[
                    ['EMBUTIDOS CASEROS', '/productos-elaborados/embutidoscaseros'],
                    ['ELABORADOS', '/productos-elaborados/elaborados'],
                  ].map(([label, href], i, arr) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`
                          block w-full text-base pl-4 py-2 transition hover:text-[#990000]
                          ${i === 0 ? 'rounded-tl-lg rounded-tr-lg' : ''}
                          ${i === arr.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}
                        `}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li><Link href="/charcuteria" className="navbar-link">CHARCUTERÍA</Link></li>
            <li><Link href="/contacto" className="navbar-link">CONTACTO</Link></li>
          </ul>

          {/* Iconos a la derecha (Visible en todos los tamaños de pantalla) */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSearch}
              className="navbar-link p-1"
              aria-label="Abrir búsqueda"
            >
              <Image
                src="/imagenes/iconos/busqueda.png"
                alt="Buscar"
                width={16}
                height={16}
                className="navbar-icon h-6 w-6"
              />
            </button>
            <PerfilMenu />

            <div
              id="contenedor-carrito"
              className="relative"
              onMouseEnter={() => setHoverVisible(true)}
              onMouseLeave={() => setHoverVisible(false)}
            >
              <Link href="/carrito" className="navbar-link">
                <Image
                  src="/imagenes/iconos/carrito-de-compras.png"
                  alt="Cesta"
                  width={16}
                  height={16}
                  className="navbar-icon h-6 w-6"
                />
              </Link>

              <PopupCarrito visible={hoverVisible} />
            </div>
          </div>
        </div>

        {/* Menú Móvil (Overlay/Deslizamiento) */}
        <div
          className={`
            fixed top-0 left-0 w-64 h-full bg-black text-white z-50 transform transition-transform duration-300 ease-in-out py-8
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            md:hidden
          `}
        >
          <div className="flex justify-end pr-4 mb-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold leading-none text-white"
              aria-label="Cerrar menú"
            >
              ×
            </button>
          </div>
          <ul className="flex flex-col space-y-4 px-4">
            <li>
              <Link href="/" className="block text-lg hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>INICIO</Link>
            </li>
            <li>
              <span className="block text-lg font-semibold mb-2">PRODUCTOS FRESCOS</span>
              <ul className="pl-4 space-y-2">
                <li><Link href="/productos-frescos/ternera" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>TERNERA</Link></li>
                <li><Link href="/productos-frescos/cerdo" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>CERDO</Link></li>
                <li><Link href="/productos-frescos/cordero" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>CORDERO</Link></li>
                <li><Link href="/productos-frescos/avesyconejos" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>AVES Y CONEJOS</Link></li>
              </ul>
            </li>
            <li>
              <span className="block text-lg font-semibold mt-4 mb-2">PRODUCTOS ELABORADOS</span>
              <ul className="pl-4 space-y-2">
                <li><Link href="/productos-elaborados/embutidoscaseros" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>EMBUTIDOS CASEROS</Link></li>
                <li><Link href="/productos-elaborados/elaborados" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>ELABORADOS</Link></li>
              </ul>
            </li>
            <li>
              <Link href="/charcuteria" className="block text-lg hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>CHARCUTERÍA</Link>
            </li>
            <li>
              <Link href="/contacto" className="block text-lg hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>CONTACTO</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}