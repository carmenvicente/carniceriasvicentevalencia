'use client';

import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import Link from 'next/link';

export default function PoliticaPrivacidad() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="h-22 w-full bg-black" />

      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">POLÍTICA DE PRIVACIDAD</h1>
          <div className="mt-1 text-black text-sm">
            <Link href="/" className="hover:text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Home
            </Link>
            <span className="mx-1">/</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Política de Privacidad</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-10 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
        <p className="mb-20">
          Carnicería Vicente Valencia, en adelante RESPONSABLE, es el Responsable del tratamiento de los datos personales del Usuario
          y le informa de que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 (GDPR) y
          la Ley Orgánica 3/2018 (LOPDGDD), por lo que se le facilita la siguiente información:
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Finalidad del tratamiento</h2>
        <ul className="list-disc pl-5 mb-20 space-y-1">
          <li>Realización de estudios estadísticos anónimos para mejorar el servicio.</li>
          <li>Tramitación de pedidos, solicitudes o cualquier petición realizada por el usuario.</li>
          <li>Gestión del registro y acceso a la cuenta personal del usuario.</li>
          <li>Envío de comunicaciones relacionadas con pedidos o el estado de la cuenta.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">2. Base jurídica del tratamiento</h2>
        <p className="mb-20">El tratamiento se basa en el consentimiento del interesado y en la ejecución de un contrato del que el usuario es parte.</p>

        <h2 className="text-lg font-semibold mb-2">3. Conservación de datos</h2>
        <p className="mb-20">
          Los datos se conservarán mientras exista una relación comercial y no se solicite su supresión,
          aplicando medidas de seguridad adecuadas para garantizar su confidencialidad e integridad.
        </p>

        <h2 className="text-lg font-semibold mb-2">4. Comunicación de los datos</h2>
        <p className="mb-20">No se comunicarán los datos a terceros, salvo obligación legal o cuando sea estrictamente necesario para la prestación del servicio.</p>

        <h2 className="text-lg font-semibold mb-2">5. Derechos del usuario</h2>
        <ul className="list-disc pl-5 mb-20 space-y-1">
          <li>Retirar el consentimiento en cualquier momento.</li>
          <li>Acceder, rectificar, portar y suprimir los datos, así como limitar u oponerse a su tratamiento.</li>
          <li>Presentar una reclamación ante la AEPD (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">6. Datos de contacto</h2>
        <p className="mb-20">
          Carnicería Vicente Valencia — Av. de Castilla-La Mancha, Nº 27, Bajo, 16003 Cuenca (España).<br />
          Email: carniceriavicentevalencia@gmail.com
        </p>

        <h2 className="text-lg font-semibold mb-2">7. Información obligatoria</h2>
        <p className="mb-20">
          Todos los campos marcados con * en los formularios son obligatorios. El usuario garantiza la veracidad de los datos proporcionados
          y se compromete a comunicar cualquier modificación que afecte a su exactitud.
        </p>

        <h2 className="text-lg font-semibold mb-2">8. Medidas de seguridad</h2>
        <p className="mb-20">
          El RESPONSABLE aplica medidas técnicas y organizativas adecuadas para garantizar la seguridad de los datos personales, de acuerdo
          con el GDPR, protegiendo los derechos y libertades de los usuarios frente a accesos no autorizados, pérdida o destrucción accidental.
        </p>

        <h2 className="text-lg font-semibold mb-2">9. Cumplimiento legal</h2>
        <p className="mb-20">
          Esta web cumple con la legislación vigente en materia de protección de datos: Reglamento General de Protección de Datos (RGPD/GDPR)
          y Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
        </p>

        <h2 className="text-lg font-semibold mb-2">10. Uso de cookies</h2>
        <p className="mb-20">
          Este sitio web utiliza cookies técnicas necesarias para su correcto funcionamiento. No se emplean cookies analíticas ni de terceros sin el
          consentimiento expreso del usuario. El usuario puede configurar sus preferencias en cualquier momento desde la sección{' '}
          <Link href="/micuenta" className="text-blue-600 hover:underline font-semibold">Mi Cuenta</Link>.
        </p>

        <h2 className="text-lg font-semibold mb-2">11. Cambios en la política</h2>
        <p className="mb-20">
          El RESPONSABLE se reserva el derecho a modificar esta política de privacidad conforme a cambios legislativos o criterios propios,
          notificándolo a los usuarios a través del sitio web.
        </p>

        <p className="text-sm text-gray-500 text-right mt-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
          Última actualización: mayo de 2026
        </p>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
}
