'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaReceipt, FaTags, FaFileAlt, FaInfoCircle, FaSmile } from 'react-icons/fa';

type Usuario = {
  nombre: string;
  role: string;
  tratamiento: string;
};

export default function MiCuenta() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const base64 = token.split('.')[1];
        const json = decodeURIComponent(escape(atob(base64)));
        const payload = JSON.parse(json);
        setUsuario({
          nombre: payload.nombre,
          role: payload.role,
          tratamiento: payload.tratamiento,
        });
      } else {
        router.push('/registrologin/login');
      }
    } catch (error) {
      console.error('Error al leer token', error);
      router.push('/registrologin/login');
    }
  }, [router]);

  if (!usuario) return null;

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar y cabecera */}
      <Navbar />

      {/* 40px de altura en negro arriba */}
      <div className="h-22 w-full bg-black" />

      {/* Cabecera blanca */}
      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">MI CUENTA</h1>
          <div className="mt-1 text-black text-sm">
            <Link
              href="/"
              className="hover:text-gray-700"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              Home
            </Link>
            <span className="mx-1">/</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Mi Cuenta
            </span>
          </div>
        </div>
      </div>

      <p
        className="text-center mt-20 text-lg text-black mb-8"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
      >
        Te damos la bienvenida, {usuario?.tratamiento ? `${usuario.tratamiento} ${usuario.nombre}` : usuario?.nombre || 'usuario'}
      </p>




      {/* Tarjetas de opciones */}
      <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-4 gap-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
        <Tarjeta icono={<FaUser size={24} />} texto="Información" href="/micuenta/informacion" />
        {usuario.role === 'admin' ? (
          <Link
            href="/admin/editar-productos"
            className="border rounded-md p-6 flex flex-col items-center justify-center bg-[#990000] text-white hover:bg-[#b30000] transition"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            <FaCalendarAlt size={24} />
            <span className="mt-2 font-semibold text-center">Editar productos</span>
          </Link>
        ) : (
          <Tarjeta icono={<FaCalendarAlt size={24} />} texto="Mis pedidos" href="/micuenta/pedidos" />
        )}

        <Tarjeta icono={<FaInfoCircle size={24} />} texto="Tus ajustes de cookies" href="/micuenta/ajustes-cookies" />
        <div
          onClick={() => {
            const confirmado = window.confirm('¿Seguro que deseas cerrar sesión?');
            if (confirmado) {
              localStorage.removeItem('token');
              setUsuario(null);
              router.push('/');
            }
          }}
          className="cursor-pointer border rounded-md p-6 flex flex-col items-center justify-center hover:bg-gray-100 transition"
        >
          <FaSmile size={24} />
          <span className="mt-2 font-semibold text-center">Desconectar</span>
        </div>
      </div>
      <div className="mt-30">
        <Footer />
      </div>
    </main>
  );
}

function Tarjeta({ icono, texto, href }: { icono: React.ReactNode; texto: string; href: string }) {
  return (
    <Link href={href} className="border rounded-md p-6 flex flex-col items-center justify-center hover:bg-gray-100 transition text-center">
      {icono}
      <span className="mt-2 font-semibold">{texto}</span>
    </Link>
  );
}
