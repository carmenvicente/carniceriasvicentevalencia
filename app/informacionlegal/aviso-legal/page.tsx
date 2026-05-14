'use client';

import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import Link from 'next/link';

export default function AvisoLegal() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="h-22 w-full bg-black" />

      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">Aviso Legal</h1>
          <div className="mt-1 text-black text-sm">
            <Link href="/" className="hover:text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Home
            </Link>
            <span className="mx-1">/</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Aviso Legal</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-10 text-black text-justify" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>

        <p className="mb-6">
          <strong>Carnicería Vicente Valencia SL</strong>, en adelante el RESPONSABLE, titular y gestora del presente sitio web, pone a disposición de los
          usuarios este documento con el que pretende dar cumplimiento a las obligaciones dispuestas en la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSICE), así como al Reglamento (UE) 2016/679 (GDPR) y la Ley Orgánica 3/2018 (LOPDGDD),
          e informar a todos los usuarios del sitio web sobre las condiciones de uso vigentes.
        </p>
        <p className="mb-20">
          Toda persona que acceda a este sitio web asume el papel de usuario, comprometiéndose a la observancia y cumplimiento riguroso de las disposiciones
          aquí recogidas, así como a cualquier otra normativa legal que pudiera resultar de aplicación. El RESPONSABLE se reserva el derecho de modificar
          cualquier tipo de información que pudiera aparecer en el sitio web, sin que exista obligación de preavisar a los usuarios, entendiéndose como
          suficiente la publicación de dichas modificaciones en el propio sitio web.
        </p>

        <h2 className="text-lg font-semibold mb-4">1. Datos identificativos</h2>
        <p className="mb-20">
          Denominación social: Carnicería Vicente Valencia SL<br />
          CIF: B16188021<br />
          Domicilio social: Av. de Castilla-La Mancha, Nº 27, Bajo, 16003 Cuenca<br />
          Correo electrónico de contacto: carniceriavicentevalencia@gmail.com
        </p>

        <h2 className="text-lg font-semibold mb-4">2. Autoría y derechos de propiedad intelectual e industrial</h2>
        <p className="mb-6">
          El presente sitio web —incluyendo su diseño, estructura, programación, interfaz visual, textos, logotipos, imágenes, fotografías,
          gráficos, iconos y cualquier otro elemento que lo componga— ha sido íntegramente creado y desarrollado por <strong>Carmen Vicente Crespo</strong>,
          quien ostenta los derechos de autoría sobre el conjunto de la obra en virtud de lo dispuesto en el Real Decreto Legislativo 1/1996,
          de 12 de abril, por el que se aprueba el Texto Refundido de la Ley de Propiedad Intelectual (TRLPI).
        </p>
        <p className="mb-6">
          El RESPONSABLE, Carnicería Vicente Valencia SL, es el titular de los derechos de explotación del sitio web y de todos sus contenidos,
          contando con la correspondiente cesión de derechos por parte de la autora. Tanto la autora como el RESPONSABLE se reservan expresamente
          todos los derechos sobre la totalidad de los contenidos publicados. Ningún contenido de este sitio web podrá ser reproducido, distribuido,
          comunicado públicamente, transformado, almacenado, cedido, sublicenciado ni utilizado de ninguna forma —con o sin ánimo de lucro—
          sin la autorización previa y por escrito de <strong>Carmen Vicente Crespo</strong> y del RESPONSABLE. Cualquier uso no autorizado será
          considerado una vulneración grave de los derechos de propiedad intelectual, pudiendo derivar en las responsabilidades civiles y penales
          que la legislación vigente establece.
        </p>
        <p className="mb-6">
          <strong>Fotografías:</strong> Todas las fotografías publicadas en este sitio web han sido realizadas por <strong>Carmen Vicente Crespo</strong>,
          quien es la única titular de los derechos de imagen y autoría sobre las mismas. Queda expresamente prohibida su reproducción, distribución,
          comunicación pública, transformación, descarga, uso en redes sociales, publicaciones digitales o impresas, o cualquier otra forma de
          explotación, ya sea con o sin ánimo de lucro, sin la autorización escrita y expresa de la autora. Las solicitudes de autorización de uso
          deberán dirigirse por escrito al correo electrónico: carniceriavicentevalencia@gmail.com, indicando el propósito, el medio de difusión
          y el período de uso previsto. El uso no autorizado de cualquier fotografía podrá ser perseguido por la vía que corresponda en derecho.
        </p>
        <p className="mb-20">
          Los nombres comerciales, marcas y signos distintivos que pudieran aparecer en este sitio web son titularidad del RESPONSABLE o de terceros
          que han autorizado su uso, y no podrán ser objeto de reproducción o uso sin la correspondiente autorización.
        </p>

        <h2 className="text-lg font-semibold mb-4">3. Exención de responsabilidades</h2>
        <p className="mb-6">
          El RESPONSABLE no garantiza la inexistencia de errores en el acceso al sitio web ni en sus contenidos, aunque pondrá su mayor diligencia
          en evitarlos. En caso de producirse, adoptará las medidas necesarias para subsanarlos. Asimismo, el RESPONSABLE queda exonerado de
          responsabilidad ante daños o perjuicios de cualquier naturaleza que pudieran derivarse de la falta de disponibilidad o accesibilidad al
          sitio web, de interrupciones en el servicio, de la presencia de virus u otros elementos lesivos en los contenidos, así como del uso
          fraudulento o ilícito que los usuarios pudieran hacer de la información publicada.
        </p>
        <p className="mb-20">
          El RESPONSABLE no se hace responsable de los contenidos alojados en sitios web de terceros a los que pudiera enlazar este sitio,
          ni de los posibles daños que su consulta pudiera ocasionar al usuario.
        </p>

        <h2 className="text-lg font-semibold mb-4">4. Uso de cookies</h2>
        <p className="mb-20">
          Este sitio web utiliza únicamente cookies técnicas necesarias para su correcto funcionamiento, como la gestión de sesiones de usuario.
          No se emplean cookies analíticas, publicitarias ni de perfiles de terceros sin el consentimiento expreso del usuario. El usuario puede
          consultar y modificar sus preferencias sobre el uso de cookies en cualquier momento desde el panel de gestión disponible en la
          sección{' '}
          <Link href="/micuenta/ajustes-cookies" className="text-blue-600 hover:underline font-semibold">Ajustes de Cookies</Link>.
          Para más información, consúltese la{' '}
          <Link href="/informacionlegal/politica-de-privacidad" className="text-blue-600 hover:underline font-semibold">Política de Privacidad</Link>.
        </p>

        <h2 className="text-lg font-semibold mb-4">5. Política de enlaces</h2>
        <p className="mb-20">
          Este sitio puede contener enlaces a páginas web de terceros con carácter meramente informativo. El RESPONSABLE no controla, ni asume
          responsabilidad alguna sobre los contenidos, productos o servicios ofrecidos en dichos sitios externos. La inclusión de un enlace no
          implica ningún tipo de relación, recomendación o acuerdo comercial con el sitio enlazado. Ante cualquier contenido que pudiera resultar
          inadecuado o ilícito, el enlace será retirado en el menor tiempo posible una vez se tenga conocimiento de ello.
        </p>

        <h2 className="text-lg font-semibold mb-4">6. Direcciones IP y datos de navegación</h2>
        <p className="mb-20">
          Con el fin de mejorar el servicio y la experiencia de los usuarios, los servidores del sitio web podrán registrar automáticamente
          información técnica de navegación, como la dirección IP del dispositivo, el tipo de navegador, el sistema operativo, las páginas
          visitadas y la fecha y hora de acceso. Esta información se trata de forma agregada y anónima, sin asociarse a ningún dato personal
          identificable, y se utiliza exclusivamente con fines estadísticos internos.
        </p>

        <h2 className="text-lg font-semibold mb-4">7. Legislación aplicable y jurisdicción</h2>
        <p className="mb-20">
          El presente Aviso Legal y las relaciones entre el RESPONSABLE y los usuarios del sitio web se rigen por la legislación española vigente.
          Para la resolución de cualquier controversia o conflicto que pudiera derivarse del acceso o uso de este sitio web, las partes, con renuncia
          expresa a cualquier otro fuero que pudiera corresponderles, se someten a la jurisdicción de los Juzgados y Tribunales de Cuenca,
          salvo que la normativa de protección de consumidores y usuarios establezca un fuero imperativo distinto.
        </p>

        <p className="text-sm text-gray-500 text-right mt-10" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
          Última actualización: mayo de 2026
        </p>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
}
