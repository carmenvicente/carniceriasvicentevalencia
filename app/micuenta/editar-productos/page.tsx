'use client';

import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import CrearProducto from './CrearProducto';
import Link from 'next/link';
import EditarProducto from './EditarProducto';
import { useState } from 'react';

export default function EditarProductosPage() {
  const [modo, setModo] = useState<'crear' | 'editar' | null>(null);

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* 40px de altura en negro arriba */}
      <div className="h-22 w-full bg-black" />

      {/* Cabecera blanca */}
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

      {/* Contenido principal con flex-grow para empujar el footer hacia abajo */}
      <div className="flex-grow">
        <div className={`max-w-screen-xl mx-auto px-4 py-6 ${modo ? '' : 'flex justify-center items-center h-[calc(100vh-200px)]'}`}>
          {!modo && (
            <div className="flex flex-col md:flex-row gap-6 text-center">
              <button
                onClick={() => setModo('crear')}
                className="px-8 py-4 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
              >
                Crear nuevo producto
              </button>
              <button
                onClick={() => setModo('editar')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
              >
                Editar producto existente
              </button>
            </div>
          )}

          {modo === 'crear' && (
            <div className="mt-8">
              <CrearProducto />
            </div>
          )}

          {modo === 'editar' && (
            <div className="mt-8">
              <EditarProducto />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
