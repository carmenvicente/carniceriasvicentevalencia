'use client'

import { useCarrito } from '@/app/contextos/CarritoContexto'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'
import Image from 'next/image'
import Link from 'next/link'

export default function PaginaCarrito() {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    actualizarCantidad
  } = useCarrito()

  const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0)

  const incrementar = (id: number) => {
    const producto = carrito.find(p => p.id === id)
    if (producto) {
      actualizarCantidad(id, producto.cantidad + 1)
    }
  }

  const decrementar = (id: number) => {
    const producto = carrito.find(p => p.id === id)
    if (producto && producto.cantidad > 1) {
      actualizarCantidad(id, producto.cantidad - 1)
    }
  }

  return (
    <>
      <Navbar />

      <div className="bg-[rgb(22,22,22)] text-white min-h-screen pb-20">
        <div className="w-full py-3 bg-[rgb(22,22,22)] mb-12">
          <div className="max-w-screen-xl mx-auto text-center px-4 mt-30">
            <h1 className="text-xl md:text-2xl font-bold text-white">Carrito</h1>
            <div className="mt-1 text-white text-sm">
              <Link href="/" className="hover:text-gray-300 font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Home</Link>
              <span className="mx-1">/</span>
              <span className="font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Carrito</span>
            </div>
          </div>
        </div>

        {carrito.length === 0 ? (
          <p className="text-center text-gray-400" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Tu carrito está vacío.</p>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 px-6">
            {/* Lista de productos */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-sm text-gray-400 font-bold border-b border-gray-600 pb-2 px-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                <span>Producto</span>
                <span>Precio</span>
                <span>Cantidad</span>
                <span>Precio total</span>
              </div>

              {carrito.map(producto => (
                <div key={producto.id} className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-x-4 bg-black/20 p-4 rounded">
                  <div className="flex items-center gap-5">
                    <Image
                      src={producto.imagen.startsWith('http') ? producto.imagen : `/imagenes/productos/${producto.imagen}`}
                      alt={producto.nombre}
                      width={80}
                      height={80}
                      className="rounded object-cover"
                      unoptimized={producto.imagen.startsWith('http')}
                    />
                    <p className="font-semibold text-sm">{producto.nombre}</p>
                  </div>

                  <p className="text-[#990000] font-bold">{producto.precio.toFixed(2)} €</p>

                  <div className="flex items-center">
                    <button onClick={() => decrementar(producto.id)} className="px-2 py-1 hover:bg-gray-600 rounded-l">−</button>
                    <div className="px-4 py-1">{producto.cantidad}</div>
                    <button onClick={() => incrementar(producto.id)} className="px-2 py-1 hover:bg-gray-600 rounded-r">+</button>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="font-bold">{(producto.precio * producto.cantidad).toFixed(2)} €</p>
                    <button
                      onClick={() => eliminarDelCarrito(producto.id)}
                      className="ml-4 text-red-400 hover:text-red-600 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <Link href="/" className="inline-block mt-4 text-sm bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                ← Seguir comprando
              </Link>
            </div>

            {/* Resumen del pedido */}
            <div className="w-full lg:w-1/3 bg-black/20 text-white p-6 rounded shadow-md h-fit">
              <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                🛒 Total artículos: <span className="text-gray-400 font-semibold">{totalArticulos}</span>
              </p>

              <hr className="my-2 border-gray-400 mb-6" />

              <div className="mb-4">
                <p className="text-base font-bold">
                  Total:
                  <span className="float-right">{subtotal.toFixed(2)} €</span>
                </p>
                <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                  Impuestos incluidos
                </p>
              </div>

              <Link href="/realizar-pedido">
                <button
                  disabled={carrito.length === 0}
                  className={`w-full font-bold py-2 rounded  ${
                    carrito.length === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#990000] text-white hover:bg-red-700'
                  }`}
                >
                  Realizar el pedido
                </button>
              </Link>

              <button
                onClick={vaciarCarrito}
                className="w-full mt-4 text-sm text-gray-400 hover:text-red-500" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
