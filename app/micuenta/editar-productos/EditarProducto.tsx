'use client'

import { useState, useEffect } from 'react'

interface EditarProductoProps {
  producto: {
    id: number
    nombre: string
    descripcion: string
    precio: number
    stock: boolean
    subcategoria_id: number
    imagen: string
  }
  volver: () => void
}

export default function EditarProducto({ producto, volver }: EditarProductoProps) {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState<number | ''>('')  
  const [stock, setStock] = useState(true)
  const [subcategoria, setSubcategoria] = useState<number>(1)
  const [imagen, setImagen] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [exito, setExito] = useState<boolean | null>(null)

  useEffect(() => {
    setNombre(producto.nombre)
    setDescripcion(producto.descripcion)
    setPrecio(producto.precio)
    setStock(producto.stock)
    setSubcategoria(producto.subcategoria_id)

    if (producto.imagen) {
      const urlCompleta = producto.imagen.startsWith('http')
        ? producto.imagen
        : `/imagenes/productos/${producto.imagen}`
      setPreview(urlCompleta)
    } else {
      setPreview(null)
    }
  }, [producto])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()

    if (nombre !== producto.nombre) formData.append('nombre', nombre)
    if (descripcion !== producto.descripcion) formData.append('descripcion', descripcion)
    if (precio !== producto.precio) formData.append('precio', String(precio))
    if (stock !== producto.stock) formData.append('stock', String(stock))
    if (subcategoria !== producto.subcategoria_id) formData.append('subcategoria', String(subcategoria))
    if (imagen) formData.append('imagen', imagen)

    if ([...formData.entries()].length === 0) {
      setMensaje('No se ha realizado ningún cambio.')
      setExito(false)
      return
    }

    try {
      const res = await fetch(`/api/productos/${producto.id}`, {
        method: 'PUT',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error')

      setMensaje(' Producto actualizado correctamente.')
      setExito(true)
      setImagen(null)
      if (!imagen) {
        setPreview(`/imagenes/productos/${producto.imagen}`)
      }

      setTimeout(() => {
        volver()
      }, 2000)
    } catch (error: any) {
      setMensaje(`❌ Error: ${error.message}`)
      setExito(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow-md mb-20">
      <button
        className="mb-6 text-blue-600 hover:underline font-semibold"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        onClick={volver}
      >
        ← Volver a la gestión de productos
      </button>

      <h2 className="text-2xl font-bold mb-4 text-black">Editar producto</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="flex flex-col">
          <label className="font-semibold text-black">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-3 rounded bg-gray-100 text-black"
            required
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-black">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-3 rounded bg-gray-100 text-black"
            required
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-black">Precio (€):</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            className="border p-3 rounded bg-gray-100 text-black"
            required
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-black">Stock:</label>
          <select
            value={stock ? 'sí' : 'no'}
            onChange={(e) => setStock(e.target.value === 'sí')}
            className="border p-3 rounded bg-gray-100 text-black"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            <option value="sí">Hay stock</option>
            <option value="no">No hay stock</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-black">Subcategoría:</label>
          <select
            value={subcategoria}
            onChange={(e) => setSubcategoria(Number(e.target.value))}
            className="border p-3 rounded bg-gray-100 text-black"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            <option value={1}>Ternera</option>
            <option value={2}>Cerdo</option>
            <option value={3}>Cordero</option>
            <option value={4}>Aves y conejos</option>
            <option value={5}>Embutidos caseros</option>
            <option value={6}>Elaborados</option>
            <option value={7}>Charcutería</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-black">Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null
              setImagen(file)
              if (file) {
                setPreview(URL.createObjectURL(file))
              } else {
                setPreview(`/imagenes/productos/${producto.imagen}`)
              }
            }}
            className="border p-3 rounded text-gray-700 bg-gray-100"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          />
          {preview && (
            <div className="mt-4">
              <p className="font-semibold mb-2 text-black">Vista previa:</p>
              <img
                src={preview}
                alt="Vista previa"
                className="w-40 h-40 object-cover border rounded"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 transition"
        >
          Guardar cambios
        </button>
      </form>

      {mensaje && (
        <p
          className={`mt-6 text-sm font-semibold ${
            exito === true ? 'text-green-600' : 'text-red-600'
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {mensaje}
        </p>
      )}
    </div>
  )
}
