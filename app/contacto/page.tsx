'use client'

import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'
import Link from 'next/link'
import Image from 'next/image'
import { CarruselTienda } from '@/app/componentes/CarruselTienda'

export default function Contacto() {
  return (
    <>
      <Navbar />
      <div className="h-22 w-full bg-black" />

      {/* Cabecera */}
      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10 mb-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">
            CONTACTO
          </h1>
          <div className="mt-1 text-black text-sm">
            <Link href="/" className="hover:text-gray-700 font-semibold"  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Home
            </Link>
            <span className="mx-1">/</span>
            <span className="font-semibold"  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Contacto</span>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-10">
        {/* Dirección + Mapa + Carrusel */}
<div className="flex flex-col md:flex-row gap-8 w-full md:w-3/4 mx-auto mb-20 items-start">
  {/* Columna izquierda */}
  <div className="w-full md:w-1/2 flex flex-col">
    <h2 className="text-xl font-semibold text-gray-800" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
      Dónde encontrarnos
    </h2>
    <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
      Av. de Castilla-La Mancha, Nº 27, Bajo, 16003 Cuenca
    </p>
    <div className="relative w-full h-96 rounded-lg shadow-md overflow-hidden">
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
  </div>

  {/* Columna derecha */}
  <div className="w-full md:w-1/2 flex flex-col">
    <h2 className="text-xl font-semibold text-gray-800 mb-10" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
      Nuestro local
    </h2>
    <CarruselTienda flechas={true} />
  </div >
</div>



        {/* Contacto y Horario (sin recuadros) */}
<div className="flex flex-col md:flex-row gap-12 mt-10 w-full md:w-3/4 mx-auto px-4 mb-20">
  {/* Contacto */}
  <div className="flex-1">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
      Contacto
    </h2>
    <p className="text-gray-700 text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
      📞 969 221 018<br />
      📞 +34 646 982 666<br />
      ✉️ carniceriavicentevalencia@gmail.com
    </p>
  </div>

  {/* Horario */}
  <div className="flex-1">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
      Horario
    </h2>
    <p className="text-gray-700 text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
      Lun–Jue: 9:30–15:00<br />
      Vie: 9:30–15:00 / 17:30–20:30<br />
      Sáb: 9:30–15:00
    </p>
  </div>
</div>


        <div className="mt-8 px-4 w-full md:w-3/4 mx-auto mb-20">
  <h2 className="text-xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
    Nuestro Equipo
  </h2>
  <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg shadow-md p-6">
    {/* Imagen de tu padre */}
    <div className="w-full md:w-1/3">
      <img
        src="/imagenes/otros/jesusfoto2.jpg" 
        alt="Dueño de la carnicería"
        className="w-full h-auto rounded-lg shadow"
      />
    </div>

    {/* Texto descriptivo */}
    <div className="w-full md:w-2/3 text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
      <p>
        Jesús Vicente Valencia ha sido el alma de esta carnicería familiar. Con más de 30 años de experiencia en el sector,
        su trabajo diario estuvo marcado por la pasión, la dedicación y el compromiso con la calidad. 
        Su trato cercano y profesional forjó una clientela fiel y un negocio que hoy sigue su rumbo con la misma esencia. 
      </p>
    </div>
  </div>
</div>

      </div>

      <Footer />
    </>
  )
}
