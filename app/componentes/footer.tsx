"use client";
import Link from "next/link";
import "../styles/navbar.css"; // O bien, crea un archivo footer.css si prefieres separar los estilos

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sección de Contacto */}
        <div>
          <h4 className="text-lg font-bold mb-2">Contacto</h4>
          <p className="text-sm">C/ de Valencia Ponce 2, Valencia, España</p>
          <p className="text-sm mt-1">+34 969 221 018</p>
          <p className="text-sm">info@carniceriasvicente.es</p>
        </div>

        {/* Sección de Atención al Cliente */}
        <div>
          <h4 className="text-lg font-bold mb-2">Atención al Cliente</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/faq" className="text-sm hover:underline">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm hover:underline">
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link href="/returns" className="text-sm hover:underline">
                Envíos y Devoluciones
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección de Información */}
        <div>
          <h4 className="text-lg font-bold mb-2">Información</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/legal" className="text-sm hover:underline">
                Aviso Legal
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm hover:underline">
                Política de Privacidad
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección de Redes Sociales */}
        <div>
          <h4 className="text-lg font-bold mb-2">Redes Sociales</h4>
          <div className="flex space-x-2">
            <Link href="https://facebook.com" className="text-sm hover:text-red-600">
              FB
            </Link>
            <Link href="https://instagram.com" className="text-sm hover:text-red-600">
              IG
            </Link>
            <Link href="https://twitter.com" className="text-sm hover:text-red-600">
              TW
            </Link>
            <Link href="https://youtube.com" className="text-sm hover:text-red-600">
              YT
            </Link>
          </div>
        </div>
      </div>
      {/* Pie de página inferior */}
      <div className="mt-8 text-center text-xs text-gray-400">
        © 2025 Carnicerías Vicente Valencia. Todos los derechos reservados.
      </div>
    </footer>
  );
}
