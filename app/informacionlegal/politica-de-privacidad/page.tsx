'use client';

import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import Link from 'next/link';

export default function PoliticaPrivacidad() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar y cabecera */}
      <Navbar />

      {/* 40px de altura en negro arriba */}
      <div className="h-22 w-full bg-black" />

      {/* Cabecera blanca */}
      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">POLÍTICA DE PRIVACIDAD</h1>
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
              Política de Privacidad
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-screen-xl mx-auto px-4 py-10 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
        <p className="mb-4">
          Carnicería Vicente Valencia, en adelante RESPONSABLE, es el Responsable del tratamiento de los datos personales del Usuario
          y le informa que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 (GDPR) y
          la Ley Orgánica 3/2018 (LOPDGDD), por lo que se le facilita la siguiente información:
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Finalidad del tratamiento</h2>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Remisión de comunicaciones comerciales por medios electrónicos o físicos.</li>
          <li>Realización de estudios estadísticos.</li>
          <li>Tramitación de pedidos, solicitudes o cualquier petición realizada por el usuario.</li>
          <li>Remisión del boletín de noticias.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">2. Base jurídica del tratamiento</h2>
        <p className="mb-4">El tratamiento se basa en el consentimiento del interesado.</p>

        <h2 className="text-lg font-semibold mb-2">3. Conservación de datos</h2>
        <p className="mb-4">
          Los datos se conservarán mientras exista una relación comercial y no se solicite su supresión,
          aplicando medidas de seguridad para garantizar su confidencialidad.
        </p>

        <h2 className="text-lg font-semibold mb-2">4. Comunicación de los datos</h2>
        <p className="mb-4">No se comunicarán los datos a terceros, salvo obligación legal.</p>

        <h2 className="text-lg font-semibold mb-2">5. Derechos del usuario</h2>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Retirar el consentimiento en cualquier momento.</li>
          <li>Acceder, rectificar, portar y suprimir los datos, así como limitar u oponerse a su tratamiento.</li>
          <li>Presentar una reclamación ante la AEPD (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">6. Datos de contacto</h2>
        <p className="mb-4">
          Carnicería Vicente Valencia - Av. de Castilla-La Mancha, Nº 27, Bajo, 16003 Cuenca (España).<br />
          Email: carniceriavicentevalencia@gmail.com
        </p>

        <h2 className="text-lg font-semibold mb-2">7. Información obligatoria</h2>
        <p className="mb-4">
          Todos los campos marcados con * en los formularios son obligatorios. El Usuario garantiza la veracidad de los datos proporcionados
          y se compromete a comunicar cualquier modificación.
        </p>

        <h2 className="text-lg font-semibold mb-2">8. Medidas de seguridad</h2>
        <p className="mb-4">
          El RESPONSABLE aplica medidas técnicas y organizativas adecuadas para garantizar la seguridad de los datos, de acuerdo
          con el GDPR, protegiendo los derechos y libertades de los usuarios.
        </p>

        <h2 className="text-lg font-semibold mb-2">9. Cumplimiento legal</h2>
        <p className="mb-4">
          Esta web cumple con la legislación vigente en materia de protección de datos: LOPD, LSSICE, RGPD y LOPDGDD.
        </p>

        <h2 className="text-lg font-semibold mb-2">10. Cambios en la política</h2>
        <p className="mb-4">
          El RESPONSABLE se reserva el derecho a modificar esta política de privacidad conforme a cambios legales o criterios propios.
        </p>

        <h2 className="text-lg font-semibold mb-2">11. Uso de cookies</h2>
<p className="mb-4">
  Este sitio web utiliza cookies técnicas necesarias para su correcto funcionamiento. No se emplean cookies analíticas ni de terceros sin el consentimiento expreso del usuario.
  El usuario puede configurar sus preferencias sobre el uso de cookies en cualquier momento desde el panel de gestión disponible en la sección <Link href="/micuenta" className="text-blue-600 hover:underline font-semibold">Mi Cuenta</Link>.
  </p>



        <p className="text-sm text-gray-500 text-right mt-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
  Última actualización: junio de 2025
</p>

      </div>

      {/* Footer */}
      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
}
