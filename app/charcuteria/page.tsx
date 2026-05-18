'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import Navbar from '@/app/componentes/navbar'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/app/componentes/footer'
import styles from '@/app/styles/productos.module.css'
import { useCarrito } from '@/app/contextos/CarritoContexto'
import PopupCarrito from '@/app/componentes/PopupCarrito'
import BotonFavorito from '@/app/componentes/BotonFavorito'
import { createPortal } from 'react-dom'

// Definición de la interfaz Producto
interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  stock: boolean
}

export default function Charcuteria() {
  // Estado para productos
  const pathname = usePathname()
  const [productos, setProductos] = useState<Producto[]>([])

  // Estado para modo de vista: rejilla ('grid') o lista ('list')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Estado para ordenación: relevancia, precio ascendente o descendente
  const [sortOrder, setSortOrder] = useState<'Relevancia' | 'Precio ↑' | 'Precio ↓'>('Relevancia')

  // Estado para controlar visibilidad popup carrito
  const [popupVisible, setPopupVisible] = useState(false)

  // Estado para el producto que aparece en popup (no usado directamente en render)

  // Función para añadir producto al carrito
  const { añadirAlCarrito } = useCarrito()

  // Estado para detectar si es dispositivo móvil (ancho < 768px)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileColumns, setMobileColumns] = useState<1 | 2>(2)

  useEffect(() => {
    // Función para obtener productos desde API
    async function fetchProductos() {
      try {
        const res = await fetch('/api/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Categoría 3, subcategoría 7: Charcutería
          body: JSON.stringify({ categoria_id: 3, subcategoria_id: 7 }),
        })
        if (!res.ok) throw new Error('Error al obtener productos')
        const data: Producto[] = await res.json()
        // Convertir precio a número
        const productosConvertidos = data.map(p => ({
          ...p,
          precio: Number(p.precio),
        }))
        setProductos(productosConvertidos)
      } catch (err) {
        console.error(err)
      }
    }
    fetchProductos()

    // Detectar ancho de ventana para responsive
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)

    // Limpiar listener al desmontar componente
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Memorizar productos ordenados según sortOrder
  const sortedProductos = useMemo(() => {
    if (sortOrder === 'Precio ↑') return [...productos].sort((a, b) => a.precio - b.precio)
    if (sortOrder === 'Precio ↓') return [...productos].sort((a, b) => b.precio - a.precio)
    return productos
  }, [productos, sortOrder])

  // Función para añadir producto al carrito y mostrar popup
  const handleAñadir = (producto: Producto) => {
    añadirAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    })
    setPopupVisible(true)
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Cabecera con título y breadcrumb */}
      <div className="w-full py-3 bg-[rgb(22,22,22)]">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-30">
          <h1 className="text-xl md:text-2xl font-bold text-white">Charcutería</h1>
          <div className="mt-1 text-white text-sm ">
            <Link href="/" className="hover:text-gray-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Home
            </Link>
            <span className="mx-1">/</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Charcutería
            </span>
          </div>
        </div>
      </div>

      {/* Contenedor principal: sidebar + productos */}
      <div className={styles.pageContainer}>
        {/* Sidebar categorías */}
        <aside className={`${styles.sidebar} hidden md:flex flex-col gap-5 pt-2`}>
          {/* Productos Frescos */}
          <div>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase px-2 mb-2">Productos Frescos</p>
            <div className="space-y-1">
              {[
                { label: 'Ternera', href: '/productos-frescos/ternera' },
                { label: 'Cerdo', href: '/productos-frescos/cerdo' },
                { label: 'Cordero', href: '/productos-frescos/cordero' },
                { label: 'Aves y Conejos', href: '/productos-frescos/avesyconejos' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    pathname === href
                      ? 'bg-[#990000] text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Productos Elaborados */}
          <div>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase px-2 mb-2">Productos Elaborados</p>
            <div className="space-y-1">
              {[
                { label: 'Embutidos Caseros', href: '/productos-elaborados/embutidoscaseros' },
                { label: 'Elaborados', href: '/productos-elaborados/elaborados' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    pathname === href
                      ? 'bg-[#990000] text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Charcutería */}
          <div>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase px-2 mb-2">Charcutería</p>
            <div className="space-y-1">
              <Link
                href="/charcuteria"
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  pathname === '/charcuteria'
                    ? 'bg-[#990000] text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                Charcutería
              </Link>
            </div>
          </div>
        </aside>

        {/* Separador */}
        <div className={styles.divider} />

        {/* Contenedor de productos */}
        <main className={`${styles.productContainer} w-full md:w-auto`}>
          {/* Toolbar para cambiar vista y orden */}
          <div className="w-full bg-[rgb(22,22,22)] py-3 mb-4 rounded-md">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Selector de vista (rejilla/lista) */}
              {/* Selector columnas para móvil */}
              <div className="flex lg:hidden items-center space-x-2">
                <button
                  onClick={() => setMobileColumns(2)}
                  className={`p-1 transition ${mobileColumns === 2 ? 'opacity-100' : 'opacity-40'}`}
                  aria-label="2 columnas"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="8" height="8" rx="1.5"/>
                    <rect x="12" y="0" width="8" height="8" rx="1.5"/>
                    <rect x="0" y="12" width="8" height="8" rx="1.5"/>
                    <rect x="12" y="12" width="8" height="8" rx="1.5"/>
                  </svg>
                </button>
                <button
                  onClick={() => setMobileColumns(1)}
                  className={`p-1 transition ${mobileColumns === 1 ? 'opacity-100' : 'opacity-40'}`}
                  aria-label="1 columna"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="20" height="8" rx="1.5"/>
                    <rect x="0" y="12" width="20" height="8" rx="1.5"/>
                  </svg>
                </button>
              </div>

              <div className="hidden lg:flex items-center space-x-3">
                <Image
                  src="/imagenes/iconos/aplicaciones.png"
                  alt="Ver en rejilla"
                  width={20}
                  height={20}
                  className={`cursor-pointer ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50'}`}
                  onClick={() => setViewMode('grid')}
                />
                <Image
                  src="/imagenes/iconos/lista.png"
                  alt="Ver en lista"
                  width={20}
                  height={20}
                  className={`cursor-pointer ${viewMode === 'list' ? 'opacity-100' : 'opacity-50'}`}
                  onClick={() => setViewMode('list')}
                />
              </div>

              {/* Selector de orden */}
              <div className="flex items-center space-x-4 text-white text-sm w-full sm:w-auto">
                <label className="flex items-center space-x-1 w-full sm:w-auto">
                  <span>Ordenar:</span>
                  <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value as typeof sortOrder)}
                    className="bg-[rgb(22,22,22)] border border-gray-500 py-1 px-2 rounded text-white text-xs sm:text-sm focus:outline-none w-full sm:w-auto"
                  >
                    <option className="bg-[rgb(22,22,22)] text-white">Relevancia</option>
                    <option className="bg-[rgb(22,22,22)] text-white">Precio ↑</option>
                    <option className="bg-[rgb(22,22,22)] text-white">Precio ↓</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* Vista rejilla o móvil */}
          {(viewMode === 'grid' || isMobile) ? (
            <div className={`grid gap-4 ${isMobile ? (mobileColumns === 1 ? 'grid-cols-1' : 'grid-cols-2') : 'grid-cols-2 lg:grid-cols-3'}`}>
              {sortedProductos.map(p => (
                <div key={p.id} className="relative transition-transform hover:-translate-y-1">
                <Link
                  href={`/detalle-productos/${p.id}`}
                  className={`${styles.productCard} flex flex-col justify-start h-full space-y-2 sm:space-y-4`}
                >
                  {/* Imagen con enlace a detalle */}
                    <Image
                      src={p.imagen.startsWith('http') ? p.imagen : `/imagenes/productos/${p.imagen}`}
                      alt={p.nombre}
                      width={isMobile ? 400 : 320}
                      height={isMobile ? 250 : 200}
                      className={`${styles.productImage} mx-auto rounded w-full h-auto object-cover`}
                      unoptimized={p.imagen.startsWith('http')}
                    />
                  {/* Nombre y precio */}
                  <div className="flex flex-col gap-[2px] px-2">
                    <h2 className="font-semibold text-white text-left text-xs lg:text-base">{p.nombre}</h2>
                    <p className="font-bold text-[#990000] text-left text-xs lg:text-base">{p.precio.toFixed(2)}€/kg</p>
                  </div>

                  {/* Botón añadir a la cesta */}
                  {/* COMENTADO - botón añadir a la cesta
                  <button
                    onClick={() => handleAñadir(p)}
                    disabled={!p.stock}
                    className={`mt-auto w-full rounded text-xs lg:text-sm px-2 py-1 lg:px-3 lg:py-2 transition ${
                      p.stock
                        ? 'bg-gray-200 text-gray-800 hover:bg-[#990000] hover:text-white'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Añadir a la cesta
                  </button>
                  */}
                </Link>
                <div className="absolute bottom-2 right-2 z-10">
                  <BotonFavorito productoId={p.id} />
                </div>
                </div>
              ))}
            </div>
          ) : (
            // Vista lista escritorio
            <div className="flex flex-col space-y-4">
              {sortedProductos.map(p => (
                <div key={p.id} className="relative">
                  <Link
                    href={`/detalle-productos/${p.id}`}
                    className={`${styles.productCardList} flex items-center justify-between p-4 bg-[rgba(0,0,0,0.8)] rounded-lg shadow-md transition-transform hover:-translate-y-1`}
                  >
                  {/* Imagen con enlace a detalle */}
                    <Image
                      src={p.imagen.startsWith('http') ? p.imagen : `/imagenes/productos/${p.imagen}`}
                      alt={p.nombre}
                      width={260}
                      height={240}
                      className="rounded object-cover"
                      unoptimized={p.imagen.startsWith('http')}
                    />
                  {/* Nombre y descripción */}
                  <div className="flex-1 px-4 text-left">
                    <h2 className="font-semibold text-white text-lg">{p.nombre}</h2>
                    <p className="text-gray-300 text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      {p.descripcion}
                    </p>
                  </div>
                  {/* Información adicional y botón añadir */}
                  <div className="product-info flex flex-col space-y-5 border-l border-gray-700 pl-4">
                    <p className="text-[#990000] font-bold text-lg">{p.precio.toFixed(2)}€/kg</p>
                    {/* COMENTADO - disponibilidad stock
<p className="text-white font-medium text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      Disponibilidad:{' '}
                      <span className={p.stock ? 'text-[#00994a]' : 'text-gray-400'}>
                        {p.stock ? 'En Stock' : 'Sin Stock'}
                      </span>
                    </p>
*/}
                    {/* COMENTADO - botón añadir a la cesta
                    <button
                      onClick={() => handleAñadir(p)}
                      disabled={!p.stock}
                      className={`w-full rounded text-sm px-3 py-2 transition ${
                        p.stock
                          ? 'bg-gray-200 text-gray-800 hover:bg-[#990000] hover:text-white'
                          : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Añadir a la cesta
                    </button>
                    */}
                  </div>
                </Link>
                  <div className="absolute top-3 right-3 z-10">
                    <BotonFavorito productoId={p.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Popup carrito montado en nodo externo */}
      {typeof window !== 'undefined' && document.getElementById('contenedor-carrito') &&
        createPortal(
          <PopupCarrito visible={popupVisible} />,
          document.getElementById('contenedor-carrito')!
        )
      }

      {/* Footer */}
      <Footer />
    </>
  )
}
