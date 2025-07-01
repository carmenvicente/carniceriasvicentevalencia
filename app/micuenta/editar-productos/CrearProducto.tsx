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

    if (!imagen || !(imagen instanceof File) || !imagen.name) {
  setMensaje('Selecciona una imagen válida.')
  return
}


    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('descripcion', descripcion)
    formData.append('precio', String(precio))
    formData.append('stock', String(stock))
    formData.append('subcategoria', String(subcategoria))
    formData.append('imagen', imagen)


    console.log('🟢 Enviando producto:', {
  nombre,
  descripcion,
  precio,
  stock,
  subcategoria,
  imagenNombre: imagen?.name,
})


    try {
      const res = await fetch('/api/productos', {
  method: 'POST',
  body: formData,
})

let data
try {
  data = await res.json()
} catch (err) {
  const text = await res.text()
  throw new Error(`Respuesta inesperada: ${text}`)
}

if (!res.ok) throw new Error(data.message || 'Error')


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
            required
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-3 rounded bg-gray-100"
            required
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Precio (€):</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            className="border p-3 rounded bg-gray-100"
            required
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
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
              if (file) {
                setPreview(URL.createObjectURL(file))
              } else {
                setPreview(null)
              }
            }}
            className="border p-3 rounded text-gray-700 bg-gray-100"
            required
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
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
        <p
          className="mt-6 text-sm font-semibold text-red-600"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {mensaje}
        </p>
      )}
    </div>
  )
}
