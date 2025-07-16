'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const font = { fontFamily: "'Inter', sans-serif", fontWeight: 500 };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-10 pb-6">
      {/* Añadido px-4 para padding en móviles, y px-6 para desktop */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-x-20 gap-y-8">

        {/* Logo + Nombre */}
        {/* En móvil, el logo y el texto ahora estarán al 100% de ancho y centrados */}
        <div className="w-full md:w-[200px] flex flex-col items-center text-center">
          <Image
            src="/imagenes/logos/logoblancocolor.png"
            alt="Logo Carnicería"
            width={200}
            height={200}
          />
          <p className="text-sm text-gray-500 font-semibold mt-2" style={font}> {/* Añadido mt-2 para un pequeño margen entre el logo y el texto */}
            Calidad desde 1975
          </p>
        </div>

        {/* Secciones del footer */}
        {/* Cambiado a grid para mejor distribución en móviles, y flex-wrap en desktop */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap gap-x-8 gap-y-8 md:gap-x-20"> {/* Ajustado gap-x para móviles, y revertido a gap-x-20 para md */}

          {/* Navegación */}
          {/* w-full para ocupar todo el ancho en móvil, w-[200px] en desktop */}
          <div className="w-full sm:w-auto"> {/* sm:w-auto permite que ocupe la mitad en sm, y md:w-[200px] en md */}
            <h4 className="text-lg font-bold mb-2">Navegación</h4>
            <ul className="text-sm font-semibold" style={font}>
              <li><Link href="/" className="hover:underline">🏠 Inicio</Link></li>
              <li><Link href="/productos-frescos/ternera" className="hover:underline">🛒 Productos</Link></li>
              <li><Link href="/realizar-pedido" className="hover:underline">📦 Haz tu pedido</Link></li>
              <li><Link href="/micuenta" className="hover:underline">👤 Mi cuenta</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          {/* w-full para ocupar todo el ancho en móvil, w-[300px] en desktop */}
          <div className="w-full sm:w-auto">
            <h4 className="text-lg font-bold mb-2">Contacto</h4>
            <ul className="text-sm font-semibold" style={font}>
              <li>
                📍 <a
                  href="https://www.google.com/maps?q=Av.+de+Castilla-la+Mancha,+Nº+27,+Bajo,+16003+Cuenca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Av. de Castilla-La Mancha, 27 Bajo, 16003 Cuenca
                </a>
              </li>
              <li className="mt-2">📞 <a href="tel:969221018" className="hover:underline">969 221 018</a></li>
              <li>📞 <a href="tel:+34646982666" className="hover:underline">+34 646 982 666</a></li>
              <li className="mt-2">✉️ <a>carniceriavicentevalencia@gmail.com</a></li>
            </ul>
          </div>

          {/* Horario */}
          {/* w-full para ocupar todo el ancho en móvil, w-[200px] en desktop */}
          <div className="w-full sm:w-auto">
            <h4 className="text-lg font-bold mb-2">Horario</h4> {/* Eliminado <br /> aquí, no es necesario */}
            <ul className="text-sm font-semibold" style={font}>
              <li>⏰ Horario</li>
              <li>Lun–Jue: 9:30–15:00</li>
              <li>Vie: 9:30–15:00 / 17:30–20:30</li>
              <li>Sáb: 9:30–15:00</li>
            </ul>
          </div>

          {/* Información Legal */}
          {/* w-full para ocupar todo el ancho en móvil, w-[220px] en desktop */}
          <div className="w-full sm:w-auto">
            <h4 className="text-lg font-bold mb-2">Información Legal</h4>
            <ul className="text-sm font-semibold" style={font}>
              <li><Link href="/informacionlegal/aviso-legal" className="hover:underline">Aviso Legal</Link></li>
              <li><Link href="/informacionlegal/politica-de-privacidad" className="hover:underline">Política de Privacidad</Link></li>
              <li><Link href="/informacionlegal/terminos-y-condiciones" className="hover:underline">Términos y Condiciones</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Línea inferior */}
      {/* Ajustado el padding horizontal y eliminado pl-10 que podía causar un desalineo en móvil */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 border-t border-gray-700 pt-4 px-4 md:px-6 text-xs text-gray-400">
        {/* Texto de copyright y desarrollo, centrado en móvil */}
        <div className="mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
          <p style={font}>© {new Date().getFullYear()} Carnicerías Vicente Valencia. Todos los derechos reservados.</p>
          <p className="mt-1" style={font}>Desarrollado por Carmen Vicente Crespo para el Trabajo Fin de Grado en Ingeniería de Tecnologías de Telecomunicación</p>
        </div>
        {/* Iconos de tarjetas, centrados en móvil */}
        <div className="flex gap-2 justify-center w-full md:w-auto"> {/* Añadido justify-center para centrar en móvil */}
          <Image src="/imagenes/iconos/visa.png" alt="Visa" width={35} height={20} />
          <Image src="/imagenes/iconos/mastercard.png" alt="Mastercard" width={35} height={20} />
        </div>
      </div>
    </footer>
  );
}