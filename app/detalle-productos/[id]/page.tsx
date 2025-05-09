// app/detalle-productos/[id]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image';

export const dynamic = 'force-dynamic'  // opcional, fuerza SSR

interface Props {
  params: Promise<{ id: string }>
}

export default async function DetalleProducto({ params }: Props) {
  // ① await params para extraer el id
  const { id } = await params

  // ② fetch sin caché
  const res = await fetch(`http://localhost:3000/api/productos/${id}`, {
    cache: 'no-store'
  })

  if (res.status === 404) notFound()
  if (!res.ok) throw new Error(`Error al cargar (${res.status})`)

  const producto = await res.json()

  return (
    <div className="max-w-screen-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{producto.nombre}</h1>
      <Image
        src={`/imagenes/productos/${producto.imagen}`}
        alt={producto.nombre}
        width={800}  // ajusta según el tamaño real de tus imágenes
        height={600} // ajusta según el tamaño real de tus imágenes
        className="w-full h-auto rounded mb-6"
      />

      <p className="mb-2"><strong>Precio:</strong> {producto.precio} €</p>
      <p className="mb-4">{producto.descripcion}</p>
    </div>
  )
}
