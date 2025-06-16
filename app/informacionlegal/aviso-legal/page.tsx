'use client';

import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import Link from 'next/link';

export default function AvisoLegal() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar y cabecera */}
      <Navbar />

      {/* Franja negra superior */}
      <div className="h-22 w-full bg-black" />

      {/* Cabecera */}
            <div className="w-full py-3 bg-white">
                <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
                    <h1 className="text-xl md:text-2xl font-bold text-black">Aviso Legal</h1>
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
                            Aviso Legal
                        </span>
                    </div>
                </div>
            </div>

      {/* Contenido principal */}
      <div className="max-w-screen-xl mx-auto px-4 py-10 text-black text-justify" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
        <p className="mb-6">
          Carnicería Vicente Valencia, responsable del sitio web, en adelante RESPONSABLE, pone a disposición de los usuarios el presente documento,
          con el que pretende dar cumplimiento a las obligaciones dispuestas en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información
          y de Comercio Electrónico (LSSICE), BOE Nº 166, así como informar a todos los usuarios del sitio web respecto a cuáles son las condiciones de uso.
        </p>

        <p className="mb-20">
          Toda persona que acceda a este sitio web asume el papel de usuario, comprometiéndose a la observancia y cumplimiento riguroso de las disposiciones
          aquí dispuestas, así como a cualquier otra disposición legal que fuera de aplicación. El RESPONSABLE se reserva el derecho de modificar cualquier tipo
          de información que pudiera aparecer en el sitio web, sin que exista obligación de preavisar o poner en conocimiento de los usuarios dichas obligaciones,
          entendiéndose como suficiente con la publicación en el sitio web del RESPONSABLE. 
        </p>

        <h2 className="text-lg font-semibold mb-4">1. Datos identificativos</h2>
        <p className="mb-20">
          Denominación social: Carnicería Vicente Valencia SL<br />
          CIF: B16188021<br />
          Domicilio social: Av. de Castilla-la Mancha, N° 27, Bajo, 16003 Cuenca <br />
          Correo electrónico de contacto: carniceriavicentevalencia@gmail.com
        </p>

        <h2 className="text-lg font-semibold mb-4">2. Derechos de propiedad intelectual e industrial</h2>
        <p className="mb-6">
          El sitio web, incluyendo su programación, edición, compilación, diseños, logotipos, texto y/o gráficos, son propiedad del RESPONSABLE o, en su caso,
          dispone de licencia o autorización expresa por parte de los autores. Todos los contenidos están protegidos por la normativa de propiedad intelectual e industrial.
        </p>
        <p className="mb-20">
          La reproducción total o parcial, uso, explotación, distribución y comercialización requiere en todo caso autorización escrita previa por parte del RESPONSABLE.
          Cualquier uso no autorizado será considerado un incumplimiento grave.
        </p>

        <h2 className="text-lg font-semibold mb-4">3. Exención de responsabilidades</h2>
        <p className="mb-6">
          El RESPONSABLE se exime de cualquier responsabilidad derivada de la información manipulada por terceros o de enlaces a contenidos externos.
        </p>

        <h2 className="text-lg font-semibold mb-4">Uso de cookies</h2>
<p className="mb-6">
  Este sitio web utiliza cookies técnicas necesarias para su correcto funcionamiento. No se emplean cookies analíticas ni de terceros sin el consentimiento expreso del usuario.
  El usuario puede configurar sus preferencias sobre el uso de cookies en cualquier momento desde el panel de gestión disponible en la sección <Link href="/micuenta" className="text-blue-600 hover:underline font-semibold">Mi Cuenta</Link>.
</p>


        <h2 className="text-lg font-semibold mb-4">Política de enlaces</h2>
        <p className="mb-6">
          Este sitio puede contener enlaces a sitios de terceros. El RESPONSABLE no controla ni asume responsabilidad sobre sus contenidos. Ante contenido inadecuado
          se retirará el enlace lo antes posible.
        </p>

        <h2 className="text-lg font-semibold mb-4">Direcciones IP</h2>
        <p className="mb-20">
          Los servidores del sitio web podrán detectar automáticamente la dirección IP del usuario para obtener estadísticas de navegación. Estos datos no se asocian
          a información personal y son tratados de forma anónima.
        </p>

        <h2 className="text-lg font-semibold mb-4">4. Legislación aplicable y jurisdicción</h2>
        <p className="mb-6">
          Para la resolución de conflictos relacionados con este sitio web, será de aplicación la legislación española, y se someterán expresamente a la jurisdicción
          de los Juzgados y Tribunales de Cuenca, salvo que la normativa establezca lo contrario.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
}
