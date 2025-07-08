'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const imagenes = [
  '/imagenes/otros/foto1tienda.JPG',
  '/imagenes/otros/foto2tienda.JPG',
  '/imagenes/otros/foto3tienda.JPG',
  '/imagenes/otros/foto4tienda.JPG',
  '/imagenes/otros/foto5tienda.JPG',
]

interface CarruselTiendaProps {
  flechas?: boolean
}

export function CarruselTienda({ flechas = false }: CarruselTiendaProps) {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const avanzar = () => setIndice((prev) => (prev + 1) % imagenes.length)
  const retroceder = () => setIndice((prev) => (prev - 1 + imagenes.length) % imagenes.length)

  return (
    <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-md group">
      <Image
        src={imagenes[indice]}
        alt={`Imagen tienda ${indice + 1}`}
        fill
        className="object-cover transition-opacity duration-700 ease-in-out"
      />

      {flechas && (
        <>
          <button
            onClick={retroceder}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-opacity-30 hover:text-opacity-80 transition-opacity duration-200 z-10 hidden group-hover:block"
          >
            <FaChevronLeft size={30} />
          </button>

          <button
            onClick={avanzar}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-opacity-30 hover:text-opacity-80 transition-opacity duration-200 z-10 hidden group-hover:block"
          >
            <FaChevronRight size={30} />
          </button>
        </>
      )}
    </div>
  )
}
