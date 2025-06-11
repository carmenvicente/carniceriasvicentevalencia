'use client';

import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import Link from 'next/link';
import GestionCookies from '@/app/componentes/Cookies/GestionCookies';

export default function AjustesCookiesPage() {
  return (
    <>
      <Navbar />

      <div className="h-22 w-full bg-black" />

      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">Ajustes de Cookies</h1>
          <div className="mt-1 text-black text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/micuenta" className="hover:text-gray-700">Mi cuenta</Link>
            <span className="mx-1">/</span>
            <span>Ajustes de Cookies</span>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center bg-white px-4 pt-8">
        <GestionCookies />
      </div>

      <Footer />
    </>
  );
}
