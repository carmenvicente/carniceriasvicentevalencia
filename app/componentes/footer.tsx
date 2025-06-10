"use client";
import Link from "next/link";
import "../styles/navbar.css";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Información de contacto */}
        <div>
          <h4 className="text-lg font-bold mb-2">Contacto</h4>
          <p className="text-sm">Carnicerías Vicente</p>
          <p className="text-sm">C/ de Valencia Ponce 2, Valencia, España</p>
          <p className="text-sm mt-1">Tel: +34 969 221 018</p>
          <p className="text-sm">Email: info@carniceriasvicente.es</p>
          <p className="text-sm mt-1">Horario: L-V 9:00–14:00 / 17:00–20:00</p>
          <p className="text-sm">Sábados: 9:00–14:00</p>
        </div>

        {/* Navegación rápida */}
        <div>
          <h4 className="text-lg font-bold mb-2">Navegación</h4>
          <ul className="space-y-1">
            <li><Link href="/" className="text-sm hover:underline">Inicio</Link></li>
            <li><Link href="/productos" className="text-sm hover:underline">Productos</Link></li>
            <li><Link href="/categorias" className="text-sm hover:underline">Categorías</Link></li>
            <li><Link href="/contacto" className="text-sm hover:underline">Contacto</Link></li>
            <li><Link href="/sobre-nosotros" className="text-sm hover:underline">Sobre Nosotros</Link></li>
          </ul>
        </div>

        {/* Atención al Cliente */}
        <div>
          <h4 className="text-lg font-bold mb-2">Atención al Cliente</h4>
          <ul className="space-y-1">
            <li><Link href="/faq" className="text-sm hover:underline">Preguntas frecuentes</Link></li>
            <li><Link href="/envios" className="text-sm hover:underline">Envíos y Devoluciones</Link></li>
            <li><Link href="/pago" className="text-sm hover:underline">Formas de Pago</Link></li>
            <li><Link href="/garantia" className="text-sm hover:underline">Garantía de Productos</Link></li>
          </ul>
        </div>

        {/* Información legal y WhatsApp */}
        <div>
          <h4 className="text-lg font-bold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/legal" className="text-sm hover:underline">Aviso Legal</Link></li>
            <li><Link href="/privacy" className="text-sm hover:underline">Política de Privacidad</Link></li>
            <li><Link href="/cookies" className="text-sm hover:underline">Política de Cookies</Link></li>
          </ul>

          <div className="mt-4">
            <h4 className="text-lg font-bold mb-2">Contáctanos por WhatsApp</h4>
            <a
              href="https://wa.me/34699221018"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 hover:text-green-500"
            >
              <FaWhatsapp className="text-xl" />
              <span className="text-sm">+34 699 221 018</span>
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-700 pt-4">
        <p>© {new Date().getFullYear()} Carnicerías Vicente Valencia. Todos los derechos reservados.</p>
        <p className="mt-1">Desarrollado por [Tu Nombre] como parte del TFG en Ingeniería de Telecomunicaciones</p>
      </div>
    </footer>
  );
}