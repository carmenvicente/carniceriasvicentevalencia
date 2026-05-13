'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'
import Image from 'next/image'
import Link from 'next/link'
import { useCarrito } from '@/app/contextos/CarritoContexto'
import PopupCarrito from '@/app/componentes/PopupCarrito'
import { createPortal } from 'react-dom'

interface Subcategoria {
  id: number
  nombre: string
}

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: string | number
  imagen: string
  stock: boolean
  subcategoria?: Subcategoria
}

const rutasSubcategorias: Record<number, string> = {
  1: '/productos-frescos/ternera',
  2: '/productos-frescos/cerdo',
  3: '/productos-frescos/cordero',
  4: '/productos-frescos/avesyconejos',
  5: '/productos-elaborados/embutidoscaseros',
  6: '/productos-elaborados/elaborados',
  7: '/charcuteria'
}

export default function DetalleProducto() {
  const params = useParams()
  const id = params?.id
  const [producto, setProducto] = useState<Producto | null>(null)
  const [cantidad, setCantidad] = useState(1)
  const { añadirAlCarrito } = useCarrito()
  const [popupVisible, setPopupVisible] = useState(false)

  useEffect(() => {
    async function fetchProducto() {
      if (!id) return
      try {
        const res = await fetch(`/api/productos/${id}`, { cache: 'no-store' })
        if (!res.ok) throw new Error(`Error al cargar producto (${res.status})`)
        const data = await res.json()
        setProducto(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProducto()
  }, [id])

  if (!producto) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-white text-sm">
        Cargando producto...
      </div>
    )
  }

  const precio = parseFloat(producto.precio as string)
  const subcategoriaId = producto.subcategoria?.id
  const subcategoriaNombre = producto.subcategoria?.nombre || 'Producto'
  const rutaSubcategoria = subcategoriaId ? rutasSubcategorias[subcategoriaId] : null

  const incrementar = () => setCantidad(prev => Math.min(prev + 1, 99))
  const decrementar = () => setCantidad(prev => Math.max(prev - 1, 1))

  const añadirVariasVeces = () => {
    for (let i = 0; i < cantidad; i++) {
      añadirAlCarrito({
        id: producto.id,
        nombre: producto.nombre,
        precio: precio,
        imagen: producto.imagen
      })
    }
    setPopupVisible(true)
  }

  return (
    <>
      <Navbar />

      {/* Cabecera */}
      <div className="w-full py-3 bg-[rgb(22,22,22)]">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-30">
          <h1 className="text-xl md:text-2xl font-bold text-white">{producto.nombre}</h1>
          <div className="mt-1 text-white text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            <Link href="/" className="hover:text-gray-300 font-semibold">Home</Link>
            <span className="mx-1">/</span>
            {rutaSubcategoria ? (
              <Link href={rutaSubcategoria} className="hover:text-gray-300 font-semibold">
                {subcategoriaNombre}
              </Link>
            ) : (
              <span className="font-semibold">{subcategoriaNombre}</span>
            )}
            <span className="mx-1">/</span>
            <span className="font-semibold">{producto.nombre}</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="w-full bg-[rgb(22,22,22)] py-10 md:py-20 px-4 md:px-6 flex justify-center pb-16 md:pb-32">
        <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Imagen */}
          <div className="w-full md:w-[60%] flex justify-center items-start">
            <Image
              src={producto.imagen.startsWith('http') ? producto.imagen : `/imagenes/productos/${producto.imagen}`}
              alt={producto.nombre}
              width={1000}
              height={800}
              unoptimized={producto.imagen.startsWith('http')}
              className="rounded shadow-md w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Detalles */}
          <div className="w-full md:w-[40%] text-white space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{producto.nombre}</h2>
            <p className="text-[#990000] text-xl md:text-2xl font-semibold mb-2">
              {precio.toFixed(2)} €{producto.nombre === "Codorniz" || producto.nombre === "Zarajos" ? "/unidad" : "/kg"}
            </p>

            <p className="text-gray-400 text-sm mb-10" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Impuestos incluidos</p>
            <p
              className="text-white mb-6"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              {producto.descripcion.split('\n').map((linea, index) => (
                <span key={index}>
                  {linea}
                  <br />
                </span>
              ))}
            </p>


            {/* Sumatorio + botón */}
            <div className="pt-4 border-t border-gray-700 mt-6 space-y-4">
              <p className="text-xl text-white font-bold">Total: {(precio * cantidad).toFixed(2)} €</p>

              <div className="flex items-center gap-4">
                <div className="flex border border-gray-500 rounded overflow-hidden">
                  <button onClick={decrementar} className="px-2 md:px-3 py-1 text-base md:text-xl text-white bg-[rgb(22,22,22)] hover:bg-gray-700">−</button>
                  <div className="px-3 md:px-4 py-1 text-white bg-[rgb(22,22,22)]">{cantidad}</div>
                  <button onClick={incrementar} className="px-2 md:px-3 py-1 text-base md:text-xl text-white bg-[rgb(22,22,22)] hover:bg-gray-700">+</button>
                </div>

                <button
                  onClick={añadirVariasVeces}
                  disabled={!producto.stock}
                  className={`flex-1 rounded text-sm px-4 py-2 transition text-center
                    ${producto.stock
                      ? 'bg-gray-200 text-gray-800 hover:bg-[#990000] hover:text-white'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                >
                  Añadir a la cesta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Popup del carrito */}
      {typeof window !== 'undefined' && document.getElementById('contenedor-carrito') &&
        createPortal(
          <PopupCarrito visible={popupVisible} />,
          document.getElementById('contenedor-carrito')!
        )}
    </>
  )
}
