'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import BotonFavorito from '@/app/componentes/BotonFavorito';
import { useFavoritos } from '@/app/contextos/FavoritosContexto';

type Favorito = {
  producto_id: number;
  nombre: string;
  precio: number;
  imagen: string;
};

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [cargando, setCargando] = useState(true);
  const { favoritoIds } = useFavoritos();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/registrologin/login');
      return;
    }

    fetch('/api/favoritos', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : [])
      .then(data => setFavoritos(data))
      .catch(() => {})
      .finally(() => setCargando(false));
  }, [router]);

  // Filtra en tiempo real los que se han eliminado con el corazón
  const favoritosVisibles = favoritos.filter(f => favoritoIds.has(f.producto_id));

  return (
    <>
      <div className="min-h-screen">
      <Navbar />
      <div className="h-22 w-full bg-black" />

      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">MIS FAVORITOS</h1>
          <div className="mt-1 text-black text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/micuenta" className="hover:text-gray-700">Mi Cuenta</Link>
            <span className="mx-1">/</span>
            <span>Favoritos</span>
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


      <main className="max-w-screen-xl mx-auto px-4 py-10 min-h-[50vh]">
        {cargando ? (
          <p className="text-center text-gray-500 mt-20">Cargando...</p>
        ) : favoritosVisibles.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-gray-500 text-lg mb-4">No tienes productos favoritos aún.</p>
            <Link href="/productos-frescos/ternera" className="text-[#990000] hover:underline font-semibold">
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {favoritosVisibles.map(f => (
              <div key={f.producto_id} className="relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:-translate-y-1 transition-transform">
                <Link href={`/detalle-productos/${f.producto_id}`} className="flex flex-col h-full p-3 space-y-2">
                  <Image
                    src={f.imagen.startsWith('http') ? f.imagen : `/imagenes/productos/${f.imagen}`}
                    alt={f.nombre}
                    width={300}
                    height={200}
                    className="w-full h-auto object-cover rounded"
                    unoptimized={f.imagen.startsWith('http')}
                  />
                  <div className="flex flex-col gap-[2px]">
                    <h2 className="font-semibold text-gray-800 text-xs lg:text-sm">{f.nombre}</h2>
                    <p className="font-bold text-[#990000] text-xs lg:text-sm">{Number(f.precio).toFixed(2)}€/kg</p>
                  </div>
                </Link>
                <div className="absolute bottom-2 right-2 z-10">
                  <BotonFavorito productoId={f.producto_id} sinFondo />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      </div>

      <Footer />
    </>
  );
}
