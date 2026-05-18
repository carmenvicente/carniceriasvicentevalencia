'use client'

import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'
import CrearProducto from './CrearProducto'
import EditarProducto from './EditarProducto'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type Producto = {
  id: number
  nombre: string
  imagen: string
  subcategoria_id: number
  descripcion: string
  precio: number
  stock: boolean
  imagenUrl: string
}

const nombresSubcategorias: Record<number, string> = {
  1: 'Ternera',
  2: 'Cerdo',
  3: 'Cordero',
  4: 'Aves y conejos',
  5: 'Embutidos caseros',
  6: 'Elaborados',
  7: 'Charcutería',
}

export default function EditarProductosPage() {
  const [modo, setModo] = useState<'crear' | 'editar' | null>(null)
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [seleccionados, setSeleccionados] = useState<number[]>([])

  async function recargarProductos() {
    setCargando(true)
    try {
      const res = await fetch('/api/productos')
      if (!res.ok) throw new Error('Error al cargar productos')
      const data = await res.json()
      setProductos(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    recargarProductos()
  }, [])

  const seleccionado = seleccionados.length === 1
    ? productos.find(p => p.id === seleccionados[0]) || null
    : null

  const productosPorSubcategoria = Object.values(
    productos.reduce((acc, producto) => {
      const key = producto.subcategoria_id
      if (!acc[key]) {
        acc[key] = {
          subcategoria_id: key,
          subcategoria_nombre: nombresSubcategorias[key] || `Subcategoría ${key}`,
          productos: [] as Producto[],
        }
      }
      acc[key].productos.push(producto)
      return acc
    }, {} as Record<number, { subcategoria_id: number; subcategoria_nombre: string; productos: Producto[] }>),
  )

  function toggleSeleccion(id: number) {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter(sid => sid !== id))
    } else {
      setSeleccionados([...seleccionados, id])
    }
  }

  function editarProducto() {
    if (seleccionados.length === 1) {
      setModo('editar')
    }
  }

  async function eliminarProductos() {
    if (seleccionados.length > 0) {
      if (confirm(`¿Seguro que quieres eliminar ${seleccionados.length} producto(s)?`)) {
        try {
          for (const id of seleccionados) {
            const res = await fetch(`/api/productos/${id}`, {
              method: 'DELETE',
            })
            if (!res.ok) {
              const data = await res.json()
              throw new Error(data.message || `Error al eliminar producto con ID ${id}`)
            }
          }

          const res = await fetch('/api/productos')
          if (!res.ok) throw new Error('Error al recargar productos')
          const data = await res.json()
          setProductos(data)
          setSeleccionados([])
          alert('Producto(s) eliminado(s) correctamente.')
        } catch (error: any) {
          console.error('❌ Error al eliminar:', error)
          alert(`Error al eliminar producto(s): ${error.message}`)
        }
      }
    }
  }

  function getGrupo(id: number) {
    return productosPorSubcategoria.find(g => g.subcategoria_id === id)
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <div className="h-22 w-full bg-black" />

      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">Gestión de Productos</h1>
          <div className="mt-1 text-black text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/micuenta" className="hover:text-gray-700">Mi cuenta</Link>
            <span className="mx-1">/</span>
            <span>Gestión de Productos</span>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 pt-3 pb-0">
        <Link href="/micuenta" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-black transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Mi Cuenta
        </Link>
      </div>


      <div className="flex-grow">
        <div className="max-w-screen-2xl mx-auto py-9 px-4"> {/* Añadido px-4 para padding en móvil */}
          {!modo && (
            <>
              <div className="flex flex-col md:flex-row gap-6 text-center mb-8 items-center justify-center">
                <button
                  onClick={() => setModo('crear')}
                  className="px-8 py-4 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
                >
                  Crear nuevo producto
                </button>

                {seleccionados.length === 1 && (
                  <>
                    <button
                      onClick={editarProducto}
                      className="px-6 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
                    >
                      Editar producto seleccionado
                    </button>
                    <button
                      onClick={eliminarProductos}
                      className="px-6 py-4 bg-red-600 text-white rounded-lg text-lg hover:bg-red-700 transition"
                    >
                      Eliminar producto seleccionado
                    </button>
                  </>
                )}

                {seleccionados.length > 1 && (
                  <button
                    onClick={eliminarProductos}
                    className="px-6 py-4 bg-red-600 text-white rounded-lg text-lg hover:bg-red-700 transition"
                  >
                    Eliminar productos seleccionados
                  </button>
                )}
              </div>

              {cargando && <p className="text-center text-black">Cargando productos...</p>}
              {error && <p className="text-red-600 text-center">{error}</p>}

              {!cargando && !error && (
                <>
                  {/* Mostrar las subcategorías 1,2,3,4 (Ternera, Cerdo, Cordero, Aves y Conejos) */}
                  {(() => {
                    const subcategoriasFiltradas = productosPorSubcategoria
                      .filter(g => ![5, 6, 7].includes(g.subcategoria_id))
                      .sort((a, b) => a.subcategoria_id - b.subcategoria_id) // Asegurarse del orden

                    // Para móvil, cada subcategoría en una fila.
                    // Para desktop, 2 subcategorías por fila.
                    return (
                      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 mb-8">
                        {subcategoriasFiltradas.map(grupo => (
                          <div
                            key={grupo.subcategoria_id}
                            className="border rounded-lg p-4 shadow flex-1 mb-4 md:mb-0" // Añadido mb-4 para espaciado en móvil
                            style={{ backgroundColor: 'rgb(22,22,22)', color: 'white' }}
                          >
                            <h2 className="text-lg font-semibold mb-10 text-center">
                              {grupo.subcategoria_nombre}
                            </h2>

                            {/* Aquí ponemos grid con 2 columnas para los productos en móvil y 4 en desktop */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {grupo.productos.map(producto => {
                                const estaSeleccionado = seleccionados.includes(producto.id)
                                return (
                                  <div
                                    key={producto.id}
                                    onClick={() => toggleSeleccion(producto.id)}
                                    className={`rounded-lg overflow-hidden cursor-pointer transition
                                      ${estaSeleccionado ? 'border-4 border-gray-500 shadow-lg' : 'border'}
                                      hover:shadow-md`}
                                    style={{
                                      userSelect: 'none',
                                      backgroundColor: 'rgb(22,22,22)',
                                      color: 'white',
                                      borderColor: estaSeleccionado ? undefined : 'rgb(22,22,22)',
                                    }}
                                    title={estaSeleccionado ? 'Producto seleccionado' : 'Haz clic para seleccionar'}
                                  >
                                    <img
                                      src={
                                        producto.imagen.startsWith('http')
                                          ? producto.imagen
                                          : `/imagenes/productos/${producto.imagen}`
                                      }
                                      alt={producto.nombre}
                                      className="w-full h-32 object-cover"
                                    />
                                    <div
                                      className="p-2 text-center font-medium"
                                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                                    >
                                      {producto.nombre}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Grupo Embutidos caseros (5) y Charcutería (7) */}
                  {/* Ahora también se apilarán en móvil y se mostrarán lado a lado en desktop */}
                  <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 mb-8">
                    {[5, 7].map(id => {
                      const grupo = getGrupo(id)
                      if (!grupo) return null
                      return (
                        <div
                          key={grupo.subcategoria_id}
                          className="border rounded-lg p-4 shadow mb-4 md:mb-0" // Añadido mb-4 para espaciado en móvil
                          style={{ backgroundColor: 'rgb(22,22,22)', color: 'white' }}
                        >
                          <h2 className="text-lg font-semibold mb-10 text-center">
                            {grupo.subcategoria_nombre}
                          </h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {grupo.productos.map(producto => {
                              const estaSeleccionado = seleccionados.includes(producto.id)
                              return (
                                <div
                                  key={producto.id}
                                  onClick={() => toggleSeleccion(producto.id)}
                                  className={`rounded-lg overflow-hidden cursor-pointer transition
                                    ${estaSeleccionado ? 'border-4 border-blue-500 shadow-lg' : 'border'}
                                    hover:shadow-md`}
                                  style={{
                                    userSelect: 'none',
                                    backgroundColor: 'rgb(22,22,22)',
                                    color: 'white',
                                    borderColor: estaSeleccionado ? undefined : 'rgb(22,22,22)',
                                  }}
                                  title={estaSeleccionado ? 'Producto seleccionado' : 'Haz clic para seleccionar'}
                                >
                                  <img
                                    src={
                                      producto.imagen.startsWith('http')
                                        ? producto.imagen
                                        : `/imagenes/productos/${producto.imagen}`
                                    }
                                    alt={producto.nombre}
                                    className="w-full h-32 object-cover"
                                  />
                                  <div
                                    className="p-2 text-center font-medium"
                                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                                  >
                                    {producto.nombre}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Grupo Elaborados (6) */}
                  {(() => {
                    const grupo = getGrupo(6)
                    if (!grupo) return null
                    return (
                      <div
                        className="border rounded-lg p-4 shadow mb-8"
                        style={{ backgroundColor: 'rgb(22,22,22)', color: 'white' }}
                      >
                        <h2 className="text-lg font-semibold mb-10 text-center">
                          {grupo.subcategoria_nombre}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                          {grupo.productos.map(producto => {
                            const estaSeleccionado = seleccionados.includes(producto.id)
                            return (
                              <div
                                key={producto.id}
                                onClick={() => toggleSeleccion(producto.id)}
                                className={`rounded-lg overflow-hidden cursor-pointer transition
                                  ${estaSeleccionado ? 'border-4 border-blue-500 shadow-lg' : 'border'}
                                  hover:shadow-md`}
                                style={{
                                  userSelect: 'none',
                                  backgroundColor: 'rgb(22,22,22)',
                                  color: 'white',
                                  borderColor: estaSeleccionado ? undefined : 'rgb(22,22,22)',
                                }}
                                title={estaSeleccionado ? 'Producto seleccionado' : 'Haz clic para seleccionar'}
                              >
                                <img
                                  src={
                                    producto.imagen.startsWith('http')
                                      ? producto.imagen
                                      : `/imagenes/productos/${producto.imagen}`
                                  }
                                  alt={producto.nombre}
                                  className="w-full h-32 object-cover"
                                />
                                <div
                                  className="p-2 text-center font-medium"
                                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                                >
                                  {producto.nombre}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })()}
                </>
              )}
            </>
          )}

          {modo === 'crear' && (
            <div className="mt-8 w-full">
              <CrearProducto
                volver={() => {
                  setModo(null)
                  setSeleccionados([])
                  recargarProductos()
                }}
              />
            </div>
          )}

          {modo === 'editar' && seleccionado && (
            <div className="mt-8 w-full">
              <EditarProducto
                producto={seleccionado}
                volver={() => {
                  setModo(null)
                  setSeleccionados([])
                  recargarProductos()
                }}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}