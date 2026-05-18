'use client'

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

// Definición del tipo Producto
interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  stock: boolean
}

export default function Avesyconejos() {
  // Estado que contiene el listado de productos
  const [productos, setProductos] = useState<Producto[]>([])

  // Estado para controlar modo de visualización: rejilla o lista
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Estado para controlar el criterio de ordenación
  const [sortOrder, setSortOrder] = useState<'Relevancia' | 'Precio ↑' | 'Precio ↓'>('Relevancia')

  // Estado para controlar la visibilidad del popup del carrito
  const [popupVisible, setPopupVisible] = useState(false)

  // Estado para almacenar el producto que se muestra en el popup

  // Función para añadir productos al carrito
  const { añadirAlCarrito } = useCarrito()

  // Estado para detectar si la pantalla es móvil (ancho menor a 768px)
  const [isMobile, setIsMobile] = useState(false)

  // Efecto para cargar productos y detectar tamaño de pantalla
  useEffect(() => {
    // Función para obtener productos filtrados por categoría y subcategoría
    async function fetchProductos() {
      try {
        const res = await fetch('/api/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categoria_id: 1, subcategoria_id: 4 }), // Subcategoría Aves y Conejos
        })
        if (!res.ok) throw new Error('Error al obtener productos')
        const data: Producto[] = await res.json()
        // Asegura que el precio sea un número
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

    // Detecta tamaño de ventana para establecer vista móvil o no
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()

    // Añade listener para cambios en tamaño ventana
    window.addEventListener('resize', handleResize)

    // Limpia listener al desmontar componente
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Memoiza productos ordenados según el criterio de ordenación
  const sortedProductos = useMemo(() => {
    if (sortOrder === 'Precio ↑') return [...productos].sort((a, b) => a.precio - b.precio)
    if (sortOrder === 'Precio ↓') return [...productos].sort((a, b) => b.precio - a.precio)
    return productos
  }, [productos, sortOrder])

  // Añade producto al carrito y muestra popup
  const handleAñadir = (producto: Producto) => {
    añadirAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    })
    setProductoPopup(producto)
    setPopupVisible(true)
  }

  return (
    <>
      {/* Navbar con navegación principal */}
      <Navbar />

      {/* Cabecera con título y breadcrumb */}
      <div className="w-full py-3 bg-[rgb(22,22,22)]">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-30">
          <h1 className="text-xl md:text-2xl font-bold text-white">Aves y Conejos</h1>
          <div className="mt-1 text-white text-sm ">
            <Link
              href="/"
              className="hover:text-gray-300"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              Home
            </Link>
            <span className="mx-1">/</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Aves y Conejos
            </span>
          </div>
        </div>
      </div>

      {/* Contenedor principal: sidebar + contenido */}
      <div className={styles.pageContainer}>
        {/* Sidebar con categorías (oculto en móvil, visible md+) */}
        <aside className={`${styles.sidebar} hidden md:flex flex-col`}>
          <h2 className="text-white text-lg mb-3 pl-4">PRODUCTOS FRESCOS</h2>
          <ul className="space-y-2 pl-4 text-left">
            {['TERNERA', 'CERDO', 'CORDERO', 'AVES Y CONEJOS'].map(cat => (
              <li key={cat}>
                <Link
                  href={`/productos-frescos/${cat.toLowerCase().replace(/ /g, '')}`}
                  className="text-sm text-white hover:text-[#990000] transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-white text-lg mb-3 pl-4 mt-15">PRODUCTOS ELABORADOS</h2>
          <ul className="space-y-2 pl-4 text-left">
            {['EMBUTIDOS CASEROS', 'ELABORADOS'].map(cat => (
              <li key={cat}>
                <Link
                  href={`/productos-elaborados/${cat.toLowerCase().replace(/ /g, '')}`}
                  className="text-sm text-white hover:text-[#990000] transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-white text-lg mb-3 pl-4 mt-15">Charcutería</h2>
          <ul className="space-y-2 pl-4 text-left">
            <li>
              <Link
                href="/charcuteria"
                className="text-sm text-white hover:text-[#990000] transition-colors"
              >
                CHARCUTERIA
              </Link>
            </li>
          </ul>
        </aside>

        {/* Separador entre sidebar y contenido */}
        <div className={styles.divider} />

        {/* Contenido principal con listado de productos */}
        <main className={`${styles.productContainer} w-full md:w-auto`}>
          {/* Barra para seleccionar vista y orden */}
          <div className="w-full bg-[rgb(22,22,22)] py-3 mb-4 rounded-md">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              {/* Selector modo vista (rejilla/lista), oculto en móvil */}
              <div className="hidden sm:flex items-center space-x-3">
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
                <span className="ml-3 text-white border-l border-gray-500 pl-3 text-xs md:text-sm">
                  Mostrando 1–{sortedProductos.length} de {sortedProductos.length}
                </span>
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

          {/* Vista en rejilla o móvil */}
          {(viewMode === 'grid' || isMobile) ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

                  {/* Nombre y precio (precio especial para "Codorniz") */}
                  <div className="flex flex-col gap-[2px] px-2">
                    <h2 className="font-semibold text-white text-left text-xs lg:text-base">{p.nombre}</h2>
                    <p className="font-bold text-[#990000] text-left text-xs lg:text-base">
                      {p.precio.toFixed(2)}€{p.nombre === "Codorniz" ? "/unidad" : "/kg"}
                    </p>
                  </div>

                  {/* Botón para añadir al carrito */}
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
            // Vista en lista solo en escritorio
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
                    <p
                      className="text-gray-300 text-sm mt-1"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                    >
                      {p.descripcion}
                    </p>
                  </div>

                  {/* Información adicional: precio, disponibilidad y botón añadir */}
                  <div className="product-info flex flex-col space-y-5 border-l border-gray-700 pl-4">
                    <p className="text-[#990000] font-bold text-lg">
                      {p.precio.toFixed(2)}€{p.nombre === "Codorniz" ? "/unidad" : "/kg"}
                    </p>
                    {/* COMENTADO - disponibilidad stock
                    <p
                      className="text-white font-medium text-sm"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                    >
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

      {/* Popup carrito usando portal para posicionar fuera del flujo DOM principal */}
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
