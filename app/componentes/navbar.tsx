'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import '../styles/navbar.css'
import Image from 'next/image'

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
    imagen: any; id: number; nombre: string
  }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Detectar scroll
  useEffect(() => {
    const onScroll = () => setScrolling(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú Frescos
  const handleFrescosEnter = () => {
    if (frescosTimer.current) clearTimeout(frescosTimer.current)
    setMenuFrescosOpen(true)
  }
  const handleFrescosLeave = () => {
    frescosTimer.current = window.setTimeout(() => setMenuFrescosOpen(false), 500)
  }

  // Menú Elaborados
  const handleElaboradosEnter = () => {
    if (elaboradosTimer.current) clearTimeout(elaboradosTimer.current)
    setMenuElaboradosOpen(true)
  }
  const handleElaboradosLeave = () => {
    elaboradosTimer.current = window.setTimeout(() => setMenuElaboradosOpen(false), 500)
  }

  // Abrir/Cerrar buscador
  const toggleSearch = () => setSearchOpen(o => !o)

  // Al abrir, enfocamos el input
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

  return (
    <>
      {/* Overlay de búsqueda */}
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
          className="text-2xl font-bold leading-none mr-4"
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
          >
            <img
              src="/imagenes/iconos/busqueda.png"
              alt="Buscar"
              className="h-4 w-4"
            />
          </Link>
        </div>


      </div>


      {/* Dropdown de resultados */}
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
                        src={`/imagenes/productos/${p.imagen}`}
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


      {/* Backdrop semitransparente */}
      {searchOpen && (
        <div
          onClick={toggleSearch}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Navbar */}
      <nav
        className={`
          fixed top-0 left-0 w-full py-0.5 transition-all duration-300 text-white
          ${scrolling ? 'bg-[rgba(0,0,0,0.9)]' : 'bg-transparent'}
        `}
        style={{ zIndex: 30 }}
      >
        <div className="flex items-center justify-between w-full px-4 text-xs font-semibold">
          {/* Logo */}
          <Link href="/" className="navbar-link">
            <img
              src="/imagenes/logos/logoblancocolor.png"
              alt="Logo"
              className="h-20"
            />
          </Link>

          {/* Menú central */}
          <ul className="flex-grow flex justify-center items-center space-x-6">
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
            <li><Link href="/comida-semanal" className="navbar-link">COMIDA SEMANAL</Link></li>
            <li><Link href="/contacto" className="navbar-link">CONTACTO</Link></li>
          </ul>

          {/* Iconos derecha */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSearch}
              className="navbar-link p-1"
              aria-label="Abrir búsqueda"
            >
              <img
                src="/imagenes/iconos/busqueda.png"
                alt="Buscar"
                className="navbar-icon h-6 w-6"
              />
            </button>
            <Link href="/registrologin" className="navbar-link">
              <img
                src="/imagenes/iconos/usuario.png"
                alt="Perfil"
                className="navbar-icon h-6 w-6"
              />
            </Link>
            <Link href="/cart" className="navbar-link">
              <img
                src="/imagenes/iconos/carrito-de-compras.png"
                alt="Cesta"
                className="navbar-icon h-6 w-6"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
