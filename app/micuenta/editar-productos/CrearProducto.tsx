'use client'

import { useState } from 'react'

interface CrearProductoProps {
  volver: () => void
}

export default function CrearProducto({ volver }: CrearProductoProps) {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState<number | ''>('')  
  const [stock, setStock] = useState(true)
  const [subcategoria, setSubcategoria] = useState<number>(1)
  const [imagen, setImagen] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje('')

    if (!imagen || !(imagen instanceof File) || !imagen.name) {
      setMensaje('Selecciona una imagen válida.')
      return
    }

    try {
      // 🔸 1. Subir imagen a Vercel Blob
      const imagenForm = new FormData()
      imagenForm.append('file', imagen)

      const resImagen = await fetch('/api/subir-imagen', {
        method: 'POST',
        body: imagenForm,
      })

      const imagenData = await resImagen.json()
      if (!resImagen.ok) throw new Error(imagenData.error || 'Error al subir la imagen')

      const urlImagen = imagenData.url

      // 🔸 2. Crear producto con la URL de la imagen
      const resProducto = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio,
          stock,
          subcategoria_id: subcategoria,
          imagen: urlImagen,
        }),
      })

      const productoData = await resProducto.json()
      if (!resProducto.ok) throw new Error(productoData.message || 'Error al crear producto')

      // 🔸 3. Limpiar formulario
      setMensaje('Producto creado correctamente.')
      setNombre('')
      setDescripcion('')
      setPrecio('')
      setStock(true)
      setSubcategoria(1)
      setImagen(null)
      setPreview(null)
    } catch (error: any) {
      setMensaje(`Error: ${error.message}`)
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

      <h2 className="text-2xl font-bold mb-4">Crear nuevo producto</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="font-semibold">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-3 rounded bg-gray-100"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-3 rounded bg-gray-100"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Precio (€):</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            className="border p-3 rounded bg-gray-100"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Stock:</label>
          <select
            value={String(stock)}
            onChange={(e) => setStock(e.target.value === 'true')}
            className="border p-3 rounded"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            <option value="true">Hay stock</option>
            <option value="false">No hay stock</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Subcategoría:</label>
          <select
            value={subcategoria}
            onChange={(e) => setSubcategoria(Number(e.target.value))}
            className="border p-3 rounded"
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
          <label className="font-semibold">Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null
              setImagen(file)
              if (file) setPreview(URL.createObjectURL(file))
              else setPreview(null)
            }}
            className="border p-3 rounded text-gray-700 bg-gray-100"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            required
          />
          {preview && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Vista previa:</p>
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
          Crear producto
        </button>
      </form>

      {mensaje && (
        <p className="mt-6 text-sm font-semibold text-red-600">{mensaje}</p>
      )}
    </div>
  )
}
