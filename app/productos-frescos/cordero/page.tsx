'use client'

import { useEffect, useState, useMemo } from 'react'
import Navbar from '@/app/componentes/navbar'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/app/componentes/footer'
import styles from '@/app/styles/productos.module.css'
import { useCarrito } from '@/app/contextos/CarritoContexto'
import PopupCarrito from '@/app/componentes/PopupCarrito'
import { createPortal } from 'react-dom'

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  stock: boolean
}

export default function Cordero() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortOrder, setSortOrder] = useState<'Relevancia' | 'Precio ↑' | 'Precio ↓'>('Relevancia')
  const [popupVisible, setPopupVisible] = useState(false)
  const [productoPopup, setProductoPopup] = useState<Producto | null>(null)

  const { añadirAlCarrito } = useCarrito()

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch('/api/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categoria_id: 1, subcategoria_id: 3 }),
        })
        if (!res.ok) throw new Error('Error al obtener productos')
        const data: Producto[] = await res.json()
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
  }, [])

  const sortedProductos = useMemo(() => {
    if (sortOrder === 'Precio ↑') return [...productos].sort((a, b) => a.precio - b.precio)
    if (sortOrder === 'Precio ↓') return [...productos].sort((a, b) => b.precio - a.precio)
    return productos
  }, [productos, sortOrder])

  const handleAñadir = (producto: Producto) => {
    añadirAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen
    })
    setProductoPopup(producto)
    setPopupVisible(true)
  }

  return (
    <>
      <Navbar />

      <div className="w-full py-3 bg-[rgb(22,22,22)]">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-30">
          <h1 className="text-xl md:text-2xl font-bold text-white">Cordero</h1>
          <div className="mt-1 text-white text-sm">
            <Link href="/" className="hover:text-gray-300 font-semibold">Home</Link>
            <span className="mx-1">/</span>
            <span className="font-semibold">Cordero</span>
          </div>
        </div>
      </div>

      <div className={styles.pageContainer}>
        <aside className={`${styles.sidebar} flex flex-col`}>
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

        <div className={styles.divider} />

        <main className={styles.productContainer}>
          <div className="w-full bg-[rgb(22,22,22)] py-3 mb-4">
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3">
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
                <span className="ml-3 text-white border-l border-gray-500 pl-3">
                  Mostrando 1–{sortedProductos.length} de {sortedProductos.length}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-white text-sm">
                <label className="flex items-center space-x-1">
                  <span>Ordenar:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                    className="bg-black-900 border border-gray-500 py-1 px-2 rounded text-white text-xs focus:outline-none"
                  >
                    <option className="bg-gray-900 text-white">Relevancia</option>
                    <option className="bg-gray-900 text-white">Precio ↑</option>
                    <option className="bg-gray-900 text-white">Precio ↓</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProductos.map(p => (
                <div key={p.id} className={`${styles.productCard} flex flex-col justify-start h-full space-y-4 transition-transform hover:-translate-y-1`}>
                  <Link href={`/detalle-productos/${p.id}`}>
                    <Image
                      src={p.imagen.startsWith('http') ? p.imagen : `/imagenes/productos/${p.imagen}`}
                      alt={p.nombre}
                      width={320}
                      height={200}
                      className={`${styles.productImage} mx-auto rounded`}
                      unoptimized={p.imagen.startsWith('http')}
                    />
                  </Link>
                  <h2 className="mt-2 font-semibold text-white text-left text-sm">{p.nombre}</h2>
                  <p className="mt-1 font-bold text-[#990000] text-left text-sm">{p.precio.toFixed(2)}€</p>
                  <button
                    onClick={() => handleAñadir(p)}
                    disabled={!p.stock}
                    className={`mt-auto w-full rounded text-sm px-3 py-2 transition ${p.stock ? 'bg-gray-200 text-gray-800 hover:bg-[#990000] hover:text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                  >
                    Añadir a la cesta
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              {sortedProductos.map(p => (
                <div key={p.id} className={`${styles.productCardList} flex items-center justify-between p-4 bg-[rgba(0,0,0,0.8)] rounded-lg shadow-md transition-transform hover:-translate-y-1`}>
                  <Link href={`/detalle-productos/${p.id}`}>
                    <Image
                      src={p.imagen.startsWith('http') ? p.imagen : `/imagenes/productos/${p.imagen}`}
                      alt={p.nombre}
                      width={260}
                      height={240}
                      className="rounded object-cover"
                      unoptimized={p.imagen.startsWith('http')}
                    />
                  </Link>
                  <div className="flex-1 px-4 text-left">
                    <h2 className="font-semibold text-white text-lg">{p.nombre}</h2>
                    <p className="text-gray-300 text-sm mt-1">{p.descripcion}</p>
                  </div>
                  <div className="product-info flex flex-col space-y-5 border-l border-gray-700 pl-4">
                    <p className="text-[#990000] font-bold text-lg">{p.precio.toFixed(2)}€</p>
                    <p className="text-white font-medium text-sm">
                      Disponibilidad:{' '}
                      <span className={p.stock ? 'text-[#00994a]' : 'text-gray-400'}>
                        {p.stock ? 'En Stock' : 'Sin Stock'}
                      </span>
                    </p>
                    <button
                      onClick={() => handleAñadir(p)}
                      disabled={!p.stock}
                      className={`w-full rounded text-sm px-3 py-2 transition ${p.stock ? 'bg-gray-200 text-gray-800 hover:bg-[#990000] hover:text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                    >
                      Añadir a la cesta
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {typeof window !== 'undefined' && document.getElementById('contenedor-carrito') &&
        createPortal(
          <PopupCarrito visible={popupVisible} />,
          document.getElementById('contenedor-carrito')!
        )
      }

      <Footer />
    </>
  )
}
