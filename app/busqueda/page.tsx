// app/busqueda/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/styles/productos.module.css'

interface Producto {
    id: number
    nombre: string
    descripcion: string
    precio: number
    imagen: string
    stock: boolean
}

export default function BusquedaPage() {
    const params = useSearchParams()
    const query = params.get('search') || ''
    const [productos, setProductos] = useState<Producto[]>([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    useEffect(() => {
        async function fetchResults() {
            setLoading(true)
            const res = await fetch(`/api/productos?search=${encodeURIComponent(query)}`, {
                cache: 'no-store',
            })
            const data: Producto[] = await res.json()
            setProductos(data)
            setLoading(false)
        }
        fetchResults()
    }, [query])

    return (
        <>
            <Navbar />

            {/* Cabecera */}
            <div className="w-full py-3 bg-[rgb(22,22,22)]">
                <div className="max-w-screen-xl mx-auto text-center px-4 mt-30">
                    <h1 className="text-xl md:text-2xl font-bold text-white">Resultados de {query}</h1>
                    <div className="mt-1 text-white text-sm ">
                        <Link href="/" className="hover:text-gray-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Home</Link>
                        <span className="mx-1" >/</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Busqueda</span>
                    </div>
                </div>
            </div>


            <div className={styles.pageContainer}>
                {/* Sidebar */}
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
                        {['CHARCUTERIA'].map(cat => (
                            <li key={cat}>
                                <Link
                                    href={`/${cat.toLowerCase().replace(/ /g, '')}`}
                                    className="text-sm text-white hover:text-[#990000] transition-colors"
                                >
                                    {cat}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className={styles.divider} />

                {/* Contenedor principal */}
                <main className={styles.productContainer}>
                    {/* Toolbar Grid/List */}
                    <div className="w-full bg-[rgb(22,22,22)] py-3 mb-4">
                        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-3">
                                <Image
                                    src="/imagenes/iconos/aplicaciones.png"
                                    alt="Grid"
                                    width={20} height={20}
                                    className={`cursor-pointer ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50'}`}
                                    onClick={() => setViewMode('grid')}
                                />
                                <Image
                                    src="/imagenes/iconos/lista.png"
                                    alt="List"
                                    width={20} height={20}
                                    className={`cursor-pointer ${viewMode === 'list' ? 'opacity-100' : 'opacity-50'}`}
                                    onClick={() => setViewMode('list')}
                                />
                                <span className="ml-3 text-white border-l border-gray-500 pl-3">
                                    {loading ? '...' : `1–${productos.length} de ${productos.length}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-white">Cargando…</p>
                    ) : productos.length === 0 ? (
                        <p className="text-white">No se encontraron productos.</p>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {productos.map(p => (
                                <Link key={p.id}
                                    href={`/detalle-productos/${p.id}`}
                                    className={`${styles.productCard} flex flex-col justify-start h-full space-y-4 transition-transform hover:-translate-y-1`}>
                                    <div>
                                        <Image
                                            src={`/imagenes/productos/${p.imagen}`}
                                            alt={p.nombre}
                                            width={320} height={200}
                                            className={`${styles.productImage} mx-auto rounded`}
                                        />
                                        <h2 className="mt-2 font-semibold text-white text-left text-sm">{p.nombre}</h2>
                                        <p className="mt-1 font-bold text-[#990000] text-left text-sm">
                                            {typeof p.precio === 'number' ? p.precio.toFixed(2) : Number(p.precio).toFixed(2)}€
                                        </p>
                                    </div>
                                    <button
                                        disabled={!p.stock}
                                        className={`mt-auto w-full rounded text-sm px-3 py-2 transition ${p.stock
                                                ? 'bg-gray-200 text-gray-800 hover:bg-[#990000] hover:text-white'
                                                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            }`}
                                    >
                                        Añadir a la cesta
                                    </button>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            {productos.map(p => (
                                <Link key={p.id}
                                    href={`/detalle-productos/${p.id}`}
                                    className={`${styles.productCardList} flex items-center justify-between p-4 bg-[rgba(0,0,0,0.8)] rounded-lg shadow-md transition-transform hover:-translate-y-1`}>
                                    <Image
                                        src={`/imagenes/productos/${p.imagen}`}
                                        alt={p.nombre}
                                        width={260} height={240}
                                        className="rounded object-cover"
                                    />
                                    <div className="flex-1 px-4 text-left">
                                        <h2 className="font-semibold text-white text-lg">{p.nombre}</h2>
                                        <p className="text-gray-300 text-sm mt-1"  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600}}>{p.descripcion}</p>
                                    </div>
                                    <div className="product-info flex flex-col space-y-5 border-l border-gray-700 pl-4">
                                        <p className="text-[#990000] font-bold text-lg">
                                            {typeof p.precio === 'number' ? p.precio.toFixed(2) : Number(p.precio).toFixed(2)}€
                                        </p>
                                        <p className="text-white font-medium text-sm">
                                            Disponibilidad:{' '}
                                            <span className={p.stock ? 'text-[#00994a]' : 'text-gray-400'}>
                                                {p.stock ? 'En Stock' : 'Sin Stock'}
                                            </span>
                                        </p>
                                        <button
                                            disabled={!p.stock}
                                            className={`w-full rounded text-sm px-3 py-2 transition ${p.stock
                                                    ? 'bg-gray-200 text-gray-800 hover:bg-[#990000] hover:text-white'
                                                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                                }`}
                                        >
                                            Añadir a la cesta
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </>
    )
}
