'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const font = { fontFamily: "'Inter', sans-serif", fontWeight: 500 };
 

  return (
    <footer className="bg-[#0a0a0a] text-white pt-10 pb-6">
      <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row gap-12">

        {/* Logo + Nombre */}
        <div className="md:w-[200px] flex flex-col items-center text-center">
          <Image
            src="/imagenes/logos/logoblancocolor.png"
            alt="Logo Carnicería"
            width={200}
            height={200}
          />
          <p className="text-sm text-gray-500 font-semibold" style={font}>
            Calidad desde 1975
          </p>
        </div>

        {/* Secciones del footer */}
        <div className="flex-1 flex flex-wrap">

          {/* Navegación */}
          <div className="w-[200px] mr-[10px]">
            <h4 className="text-lg font-bold mb-2" >Navegación</h4>
            <ul className="text-sm font-semibold" style={font}>
              <li><Link href="/" className="hover:underline">🏠 Inicio</Link></li>
              <li><Link href="/productos-frescos/ternera" className="hover:underline">🛒 Productos</Link></li>
              <li><Link href="/pedido" className="hover:underline">📦 Haz tu pedido</Link></li>
              <li><Link href="/comida-semanal" className="hover:underline">📅 Menú semanal</Link></li>
              <li><Link href="/micuenta" className="hover:underline">👤 Mi cuenta</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="w-[300px] mr-[4px]">
            <h4 className="text-lg font-bold mb-2" >Contacto</h4>
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
          <div className="w-[200px] mr-[30px]">
            <h4 className="text-lg font-bold mb-2" style={font}><br></br></h4>
            <ul className="text-sm font-semibold" style={font}>
              <li>⏰ Horario</li>
              <li>Lun–Jue: 9:30–15:00</li>
              <li>Vie: 9:30–15:00 / 17:30–20:30</li>
              <li>Sáb: 9:30–15:00</li>
            </ul>
          </div>

          {/* Información Legal */}
          <div className="w-[220px] mr-[25px]">
            <h4 className="text-lg font-bold mb-2" >Información Legal</h4>
            <ul className="text-sm font-semibold" style={font}>
              <li><Link href="/informacionlegal/aviso-legal" className="hover:underline">Aviso Legal</Link></li>
              <li><Link href="/informacionlegal/politica-de-privacidad" className="hover:underline">Política de Privacidad</Link></li>
              <li><Link href="/informacionlegal/terminos-y-condiciones" className="hover:underline">Términos y Condiciones</Link></li>
            </ul>
          </div>

         {/* Menú Semanal */}
          <div className="w-[200px]">
            <h4 className="text-lg font-bold mb-2" >Menú Semanal</h4>
            <p className="text-sm mb-5 font-semibold" style={font}>
              ¿Quieres estar al tanto de<br></br> los menús semanales?
            </p>
            <a
              href="https://wa.me/34699221018"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-row items-center gap-x-3"
            >
              
              <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white group-hover:bg-green-500 transition">
                <FaWhatsapp className="text-2xl text-white group-hover:text-black transition" />
              </div>
              <span className="text-sm font-semibold group-hover:text-green-500" style={font}>
                Únete a nuestra comunidad
              </span>
              
            </a>
          </div>




        </div>
      </div>

      {/* Línea inferior */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 border-t border-gray-700 pt-4 px-6 text-xs text-gray-400">
        <div className="mb-4 md:mb-0 pl-10">
          <p style={font}>© {new Date().getFullYear()} Carnicerías Vicente Valencia. Todos los derechos reservados.</p>
          <p className="mt-1" style={font}>Desarrollado por Carmen Vicente Crespo para el Trabajo Fin de Grado en Ingeniería de Telecomunicaciones</p>
        </div>
        <div className="flex gap-2">
          <Image src="/imagenes/iconos/visa.png" alt="Visa" width={35} height={20} />
          <Image src="/imagenes/iconos/mastercard.png" alt="Mastercard" width={35} height={20} />
        </div>
      </div>
    </footer>
  );
}
