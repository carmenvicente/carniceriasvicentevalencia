'use client'

import { useCarrito } from '@/app/contextos/CarritoContexto'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PopupCarrito({ visible }: { visible: boolean }) {
  const { carrito, eliminarDelCarrito } = useCarrito()
  const [show, setShow] = useState(visible)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const hoverRef = useRef(false)

  // Mostrar popup si cambia `visible`
  useEffect(() => {
    if (visible) {
      setShow(true)
      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        if (!hoverRef.current) setShow(false)
      }, 4000)
    }
  }, [visible, carrito])

  const handleMouseEnter = () => {
    hoverRef.current = true
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const handleMouseLeave = () => {
    hoverRef.current = false
    timerRef.current = setTimeout(() => setShow(false), 1000)
  }

  if (!show || carrito.length === 0) return null

  const contenedor = typeof window !== 'undefined'
    ? document.getElementById('contenedor-carrito')
    : null

  if (!contenedor) return null

  const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)

  const estilo: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    width: '320px',
    animation: 'fadeInUp 0.3s ease-out',
    fontSize: '0.85rem',
  }

  return (
    <div style={estilo} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h3 className="font-bold mb-3 text-sm">🛒 Tu cesta</h3>

      <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
        {carrito.map((item) => (
          <div key={item.id} className="flex items-start gap-3 relative">
            <Image
              src={item.imagen.startsWith('http') ? item.imagen : `/imagenes/productos/${item.imagen}`}
              alt={item.nombre}
              width={100}
              height={60}
              className="rounded object-cover"
              unoptimized={item.imagen.startsWith('http')}
            />
            <div className="flex-1" >
              <p className="font-semibold text-sm">{item.nombre}</p>
              <p className="text-xs text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Cantidad: {item.cantidad}</p>
              <p className="text-[#990000] font-bold text-sm">
                {(item.precio * item.cantidad).toFixed(2)}€
              </p>
            </div>
            <button
              onClick={() => eliminarDelCarrito(item.id)}
              className="absolute top-0 right-0 text-gray-500 hover:text-red-600 text-sm"
              title="Eliminar"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t pt-2 text-sm">
        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)}€</span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <Link
            href="/carrito"
            className="text-center bg-gray-800 text-white py-1.5 rounded hover:bg-[#990000] transition" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            Ver mi cesta
          </Link>
          <Link
            href="/realizar-pedido"
            className="text-center bg-[#990000] text-white py-1.5 rounded hover:bg-red-700 transition"
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  )
}
