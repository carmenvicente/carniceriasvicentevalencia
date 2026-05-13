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

  // Estado para detectar si se ha hecho scroll > 50px (para cambiar el fondo navbar)
  const [scrolling, setScrolling] = useState(false)

  // Estados para controlar si los menús desplegables de escritorio están abiertos
  const [menuFrescosOpen, setMenuFrescosOpen] = useState(false)
  const [menuElaboradosOpen, setMenuElaboradosOpen] = useState(false)

  // Referencias para temporizadores que controlan la apertura/cierre retardado de los menús
  const frescosTimer = useRef<number | null>(null)
  const elaboradosTimer = useRef<number | null>(null)

  // Estados y funciones para el buscador
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ imagen: string; id: number; nombre: string }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const doSearch = () => {
    toggleSearch()
    router.push(`/busqueda?search=${encodeURIComponent(searchQuery)}`)
  }

  // Estados para controlar menú móvil (visible/invisible)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Detectar scroll para cambiar fondo navbar
  useEffect(() => {
    const onScroll = () => setScrolling(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Funciones para abrir/cerrar menú "Productos Frescos" con retardo para evitar cierres bruscos
  const handleFrescosEnter = () => {
    if (frescosTimer.current) clearTimeout(frescosTimer.current)
    setMenuFrescosOpen(true)
  }
  const handleFrescosLeave = () => {
    frescosTimer.current = window.setTimeout(() => setMenuFrescosOpen(false), 500)
  }

  // Funciones para abrir/cerrar menú "Productos Elaborados" con retardo para evitar cierres bruscos
  const handleElaboradosEnter = () => {
    if (elaboradosTimer.current) clearTimeout(elaboradosTimer.current)
    setMenuElaboradosOpen(true)
  }
  const handleElaboradosLeave = () => {
    elaboradosTimer.current = window.setTimeout(() => setMenuElaboradosOpen(false), 500)
  }

  // Función para abrir/cerrar buscador
  const toggleSearch = () => setSearchOpen(o => !o)

  // Cuando se abre el buscador, enfocar input
  useEffect(() => {
    if (searchOpen) requestAnimationFrame(() => inputRef.current?.focus())
  }, [searchOpen])

  // Live search: obtiene resultados desde API al escribir en el input
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
      .catch(() => { /* Cancelado o error ignorado */ })

    return () => ctl.abort()
  }, [searchQuery])

  // Estado para controlar visibilidad popup carrito al pasar ratón
  const [hoverVisible, setHoverVisible] = useState(false)
  const { carrito } = useCarrito()

  return (
    <>
      {/* Overlay buscador: aparece fijo arriba con animación de entrada/salida */}
      <div
        className={`
          fixed top-0 left-0 w-full h-24 bg-white z-50 flex overflow-visible items-center justify-center px-4
          transform transition-transform duration-300 ease-out
          ${searchOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Botón para cerrar el overlay */}
        <button
          onClick={toggleSearch}
          className="text-2xl font-bold leading-none mr-4 text-black"
          aria-label="Cerrar búsqueda"
        >
          ×
        </button>

        {/* Contenedor input y botones dentro del overlay */}
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

          {/* Botón para borrar texto */}
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
            onClick={toggleSearch} // Cierra el overlay al hacer clic en buscar
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

      {/* Dropdown con resultados de búsqueda */}
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

      {/* Backdrop semitransparente para overlay buscador */}
      {searchOpen && (
        <div
          onClick={() => toggleSearch()} // Cierra el buscador al hacer clic en el backdrop
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
        <div className="flex items-center justify-between w-full px-4 text-xs font-semibold h-16 md:h-20">
          {/* Icono menú hamburguesa para móvil */}
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

          {/* Logo con enlace al inicio */}
          <Link href="/" className="navbar-link flex items-center shrink-0">
            <Image
              src="/imagenes/logos/logoblancocolor.png"
              alt="Logo"
              width={190}
              height={200}
              className="h-10 w-auto object-contain md:h-14 lg:h-20"
              style={{ width: 'auto' }}
              priority
            />
          </Link>

          {/* Menú principal escritorio */}
          <ul className="hidden md:flex flex-grow md:justify-evenly lg:justify-center lg:gap-x-4 xl:gap-x-6 items-center text-center">
            {/* Inicio */}
            <li>
              <Link href="/" className="navbar-link">INICIO</Link>
            </li>

            {/* Menú Productos Frescos con hover */}
            <li
              className="relative"
              onMouseEnter={handleFrescosEnter}
              onMouseLeave={handleFrescosLeave}
            >
              <span className="navbar-link cursor-pointer">
                PRODUCTOS<br className="lg:hidden" /> FRESCOS ▼
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

            {/* Menú Productos Elaborados con hover */}
            <li
              className="relative"
              onMouseEnter={handleElaboradosEnter}
              onMouseLeave={handleElaboradosLeave}
            >
              <span className="navbar-link cursor-pointer">
                PRODUCTOS<br className="lg:hidden" /> ELABORADOS ▼
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

            {/* Enlaces directos Charcutería y Contacto */}
            <li><Link href="/charcuteria" className="navbar-link">CHARCUTERÍA</Link></li>
            <li><Link href="/contacto" className="navbar-link">CONTACTO</Link></li>
          </ul>

          {/* Iconos a la derecha: búsqueda, perfil y carrito */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Botón abrir buscador */}
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

            {/* Menú perfil usuario */}
            <PerfilMenu />

            {/* Icono carrito con popup */}
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

        {/* Backdrop menú móvil */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Menú móvil (overlay lateral) */}
        <div
          className={`
            fixed top-0 left-0 w-72 sm:w-80 h-full bg-black text-white z-50 transform transition-transform duration-300 ease-in-out py-8
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            md:hidden
          `}
        >
          {/* Botón cerrar menú móvil */}
          <div className="flex justify-end pr-4 mb-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold leading-none text-white"
              aria-label="Cerrar menú"
            >
              ×
            </button>
          </div>

          {/* Lista menú móvil */}
          <ul className="flex flex-col space-y-4 px-4">
            <li>
              <Link href="/" className="block text-lg hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>INICIO</Link>
            </li>

            {/* Submenú Productos Frescos móvil */}
            <li>
              <span className="block text-lg font-semibold mb-2">PRODUCTOS FRESCOS</span>
              <ul className="pl-4 space-y-2">
                <li><Link href="/productos-frescos/ternera" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>TERNERA</Link></li>
                <li><Link href="/productos-frescos/cerdo" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>CERDO</Link></li>
                <li><Link href="/productos-frescos/cordero" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>CORDERO</Link></li>
                <li><Link href="/productos-frescos/avesyconejos" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>AVES Y CONEJOS</Link></li>
              </ul>
            </li>

            {/* Submenú Productos Elaborados móvil */}
            <li>
              <span className="block text-lg font-semibold mt-4 mb-2">PRODUCTOS ELABORADOS</span>
              <ul className="pl-4 space-y-2">
                <li><Link href="/productos-elaborados/embutidoscaseros" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>EMBUTIDOS CASEROS</Link></li>
                <li><Link href="/productos-elaborados/elaborados" className="block text-base hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>ELABORADOS</Link></li>
              </ul>
            </li>

            {/* Enlaces Charcutería y Contacto móvil */}
            <li><Link href="/charcuteria" className="block text-lg hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>CHARCUTERÍA</Link></li>
            <li><Link href="/contacto" className="block text-lg hover:text-[#990000]" onClick={() => setMobileMenuOpen(false)}>CONTACTO</Link></li>
          </ul>
        </div>
      </nav>
    </>
  )
}
