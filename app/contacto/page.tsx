import Navbar from '@/app/componentes/navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function Contacto() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Sección Hero: imagen con componente Image y texto superpuesto */}
      <div className="relative w-full h-64 md:h-80">
        <Image
          src="/imagenes/productos/albondigas.jpg"
          alt="Buscar"
          width={300}
          height={300}
          className="navbar-icon h-6 w-6"
        />

        {/* Texto superpuesto */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Contacto</h1>
          <div className="mt-5 text-white text-lg">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <span> / Contacto</span>
          </div>
        </div>
      </div>


      {/* Logo de la carnicería */}
      <Link href="/">
        <Image
          src="/imagenes/productos/albondigas.jpg"
          alt="Buscar"
          width={300}
          height={300}
          className="navbar-icon h-6 w-6"
        />
      </Link>

      {/* Google Maps + Foto del Dueño */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full md:w-3/4">
        <div className="relative w-full md:w-1/2 h-120 rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.3226972039242!2d-2.1418106881545063!3d40.068213476658215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5d6766cf227789%3A0xdb74fb5ea756e80a!2sCarnicer%C3%ADas%20Vicente%20Valencia!5e0!3m2!1ses!2ses!4v1743764551725!5m2!1ses!2ses"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

       <Image
          src="/imagenes/productos/albondigas.jpg"
          alt="Buscar"
          width={300}
          height={300}
          className="navbar-icon h-6 w-6"
        />
      </div>

      {/* Sección: Contacto y Horario (lado a lado) */}
      <div className="flex flex-col md:flex-row gap-6 mt-10 w-full md:w-3/4">
        {/* Contacto */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex-1 text-center border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contacto</h2>
          <p className="text-lg text-gray-600 mb-4">¡Estamos aquí para ayudarte!</p>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">📞</span>
              <span className="font-medium text-gray-700">+34 646 982 666</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">📞</span>
              <span className="font-medium text-gray-700">969 221 018</span>
            </div>
          </div>
        </div>

        {/* Horario de Atención */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex-1 text-center border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Horario de Atención</h2>
          <p className="text-lg text-gray-700">
            Lunes a Viernes: 9:00 AM - 6:00 PM <br />
            Sábados: 9:00 AM - 2:00 PM
          </p>
        </div>
      </div>

      {/* Sobre Nosotros */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4">
        <h2 className="text-xl font-semibold mb-2">Sobre Nosotros</h2>
        <p className="text-gray-600">
          Próximamente añadiremos un video sobre nuestra historia y valores.
        </p>
      </div>

      {/* ¿Por qué elegirnos? */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4">
        <h2 className="text-xl font-semibold mb-2">¿Por qué elegirnos?</h2>
        <p className="text-gray-600">
          Nos dedicamos a ofrecer los mejores productos frescos y elaborados, con una tradición que nos avala. Nuestro compromiso con la calidad es nuestra prioridad y nos enorgullece ofrecer productos de la más alta gama para nuestros clientes.
        </p>
      </div>

      {/* Nuestro Equipo */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4">
        <h2 className="text-xl font-semibold mb-2">Nuestro Equipo</h2>
        <p className="text-gray-600">
          Contamos con un equipo profesional y comprometido con el servicio al cliente. Cada uno de nuestros miembros está altamente capacitado para ofrecerte la mejor experiencia de compra.
        </p>
      </div>

    </div>
  );
}
