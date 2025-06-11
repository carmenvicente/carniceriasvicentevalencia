'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { HiOutlineClock } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 md:flex md:gap-12">
        
        {/* Logo + Nombre con más espacio a la derecha */}
        <div className="md:mr-16 flex flex-col items-center text-center mb-8 md:mb-0">
          <Image
            src="/imagenes/logos/logoblancocolor.png"
            alt="Logo Carnicería"
            width={200}
            height={200}
            className="mb-2"
          />
          <p className="text-lg font-bold">Carnicerías Vicente Valencia</p>
          <p className="text-sm text-gray-400" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Calidad desde 1975</p>
        </div>

        {/* Resto de columnas con menos separación entre sí */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          
          {/* Navegación */}
          <div>
            <h4 className="text-lg font-bold mb-2">Navegación</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" className="hover:underline">Inicio</Link></li>
              <li><Link href="/productos" className="hover:underline">Productos</Link></li>
              <li><Link href="/categorias" className="hover:underline">Categorías</Link></li>
              <li><Link href="/contacto" className="hover:underline">Contacto</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:underline">Sobre Nosotros</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-bold mb-2">Contacto</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> C/ de Valencia Ponce 2</li>
              <li className="flex items-center gap-2"><FaPhone /> +34 969 221 018</li>
              <li className="flex items-center gap-2"><FaEnvelope /> info@carniceriasvicente.es</li>
              <li className="flex items-center gap-2"><HiOutlineClock /> L-V: 9:00–14:00 / 17:00–20:00</li>
              <li className="pl-6">Sábados: 9:00–14:00</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="text-lg font-bold mb-2">Redes Sociales</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="https://wa.me/34699221018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-green-500"
                >
                  <FaWhatsapp /> Unirse a nuestra comunidad
                </a>
              </li>
            </ul>
          </div>

          {/* Información Legal */}
          <div>
            <h4 className="text-lg font-bold mb-2">Información Legal</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/aviso-legal" className="hover:underline">Aviso Legal</Link></li>
              <li><Link href="/politica-de-privacidad" className="hover:underline">Política de Privacidad</Link></li>
              <li><Link href="/terminos-y-condiciones" className="hover:underline">Términos y Condiciones</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="max-w-screen-xl mx-auto mt-8 px-4 flex flex-wrap justify-center gap-4">
        <Image src="/visa.png" alt="Visa" width={50} height={30} />
        <Image src="/mastercard.png" alt="Mastercard" width={50} height={30} />
        <Image src="/amex.png" alt="American Express" width={50} height={30} />
        <Image src="/paypal.png" alt="PayPal" width={50} height={30} />
      </div>

      {/* Línea inferior */}
      <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-700 pt-4">
        <p>© {new Date().getFullYear()} Carnicerías Vicente Valencia. Todos los derechos reservados.</p>
        <p className="mt-1">Desarrollado por [Tu Nombre] como parte del TFG en Ingeniería de Telecomunicaciones</p>
      </div>
    </footer>
  );
}
