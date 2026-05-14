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

      <div className="max-w-screen-xl mx-auto px-4 py-10 text-black text-justify" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>

        <p className="mb-6">
          <strong>Carnicería Vicente Valencia SL</strong>, en adelante el RESPONSABLE, con domicilio en Av. de Castilla-La Mancha, Nº 27, Bajo,
          16003 Cuenca, y correo electrónico de contacto carniceriavicentevalencia@gmail.com, es el Responsable del tratamiento de los datos
          personales del Usuario en los términos del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016,
          relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales (GDPR), y de la
          Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
        </p>
        <p className="mb-20">
          El RESPONSABLE se compromete a tratar los datos personales de los usuarios con plenas garantías de seguridad, confidencialidad
          y respeto a los derechos que la normativa vigente reconoce a los interesados. La presente Política de Privacidad tiene por objeto
          informar al usuario de manera clara y transparente sobre qué datos se recogen, con qué finalidad, durante cuánto tiempo se conservan
          y cuáles son sus derechos al respecto.
        </p>

        <h2 className="text-lg font-semibold mb-4">1. Responsable del tratamiento</h2>
        <p className="mb-20">
          Denominación social: Carnicería Vicente Valencia SL<br />
          CIF: B16188021<br />
          Domicilio: Av. de Castilla-La Mancha, Nº 27, Bajo, 16003 Cuenca (España)<br />
          Correo electrónico: carniceriavicentevalencia@gmail.com
        </p>

        <h2 className="text-lg font-semibold mb-4">2. Datos personales recogidos</h2>
        <p className="mb-6">
          Con carácter general, el RESPONSABLE únicamente recopila los datos personales que el usuario facilita voluntariamente
          a través de los formularios disponibles en el sitio web. Estos datos pueden incluir:
        </p>
        <ul className="list-disc pl-5 mb-20 space-y-1">
          <li>Datos identificativos: nombre, apellidos y tratamiento.</li>
          <li>Datos de contacto: dirección de correo electrónico.</li>
          <li>Datos de acceso: credenciales de la cuenta personal del usuario (email y contraseña almacenada de forma cifrada mediante hash).</li>
          <li>Datos técnicos de navegación: dirección IP, tipo de navegador y páginas visitadas, tratados de forma anónima con fines estadísticos.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-4">3. Finalidad del tratamiento</h2>
        <p className="mb-6">
          Los datos personales facilitados por el usuario serán tratados con las siguientes finalidades:
        </p>
        <ul className="list-disc pl-5 mb-20 space-y-1">
          <li>Gestión del registro y acceso a la cuenta personal del usuario en el sitio web.</li>
          <li>Atención de consultas, solicitudes o cualquier petición remitida por el usuario a través de los medios de contacto disponibles.</li>
          <li>Realización de estudios estadísticos anónimos sobre el uso del sitio web con el fin de mejorar la experiencia de navegación.</li>
          <li>Envío de comunicaciones relacionadas con el estado o la gestión de la cuenta del usuario, cuando resulte necesario.</li>
          <li>Cumplimiento de las obligaciones legales que resulten de aplicación al RESPONSABLE.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-4">4. Base jurídica del tratamiento</h2>
        <p className="mb-6">
          El tratamiento de los datos personales del usuario se fundamenta en las siguientes bases jurídicas, de acuerdo con el artículo 6 del GDPR:
        </p>
        <ul className="list-disc pl-5 mb-20 space-y-1">
          <li><strong>Consentimiento del interesado</strong> (art. 6.1.a GDPR): aplicable cuando el usuario facilita sus datos de manera voluntaria al registrarse o al contactar con el RESPONSABLE.</li>
          <li><strong>Interés legítimo del responsable</strong> (art. 6.1.f GDPR): aplicable al tratamiento anónimo de datos de navegación con fines estadísticos internos.</li>
          <li><strong>Cumplimiento de una obligación legal</strong> (art. 6.1.c GDPR): cuando el tratamiento sea necesario para dar cumplimiento a una obligación legal aplicable al RESPONSABLE.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-4">5. Conservación de datos</h2>
        <p className="mb-20">
          Los datos personales del usuario se conservarán durante el tiempo estrictamente necesario para cumplir con la finalidad para la que
          fueron recogidos y, en todo caso, durante los plazos legalmente establecidos. Una vez que el usuario solicite la supresión de sus datos
          o la eliminación de su cuenta, los datos serán eliminados de forma segura, salvo que exista obligación legal de conservarlos durante
          un período determinado. En ningún caso se conservarán datos personales más tiempo del necesario.
        </p>

        <h2 className="text-lg font-semibold mb-4">6. Comunicación de los datos a terceros</h2>
        <p className="mb-20">
          El RESPONSABLE no cederá ni comunicará los datos personales del usuario a terceros, salvo en los casos en que exista una obligación
          legal que así lo exija, o cuando sea estrictamente imprescindible para la prestación del servicio contratado, informando al usuario en
          tal caso. No se realizarán transferencias internacionales de datos a países fuera del Espacio Económico Europeo sin garantías adecuadas.
        </p>

        <h2 className="text-lg font-semibold mb-4">7. Derechos del usuario</h2>
        <p className="mb-6">
          El usuario puede ejercer en cualquier momento, de forma gratuita y mediante solicitud dirigida al correo electrónico
          carniceriavicentevalencia@gmail.com, los siguientes derechos reconocidos por el GDPR y la LOPDGDD:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-1">
          <li><strong>Derecho de acceso:</strong> obtener confirmación de si se están tratando datos personales que le conciernen y, en tal caso, acceder a ellos.</li>
          <li><strong>Derecho de rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
          <li><strong>Derecho de supresión («derecho al olvido»):</strong> solicitar la eliminación de sus datos cuando, entre otros motivos, ya no sean necesarios para la finalidad para la que fueron recogidos.</li>
          <li><strong>Derecho a la limitación del tratamiento:</strong> solicitar que se restrinja el tratamiento de sus datos en determinadas circunstancias.</li>
          <li><strong>Derecho a la portabilidad:</strong> recibir los datos personales facilitados en un formato estructurado y de uso común.</li>
          <li><strong>Derecho de oposición:</strong> oponerse al tratamiento de sus datos por motivos relacionados con su situación particular.</li>
          <li><strong>Derecho a retirar el consentimiento:</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.</li>
        </ul>
        <p className="mb-20">
          En caso de considerar que el tratamiento de sus datos no se ajusta a la normativa vigente, el usuario tiene derecho a presentar
          una reclamación ante la Agencia Española de Protección de Datos (AEPD), autoridad de control competente en España,
          a través de su sede web: <strong>www.aepd.es</strong>.
        </p>

        <h2 className="text-lg font-semibold mb-4">8. Seguridad de los datos</h2>
        <p className="mb-20">
          El RESPONSABLE aplica las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo
          que presenta el tratamiento, de conformidad con el artículo 32 del GDPR. Entre otras, se emplean técnicas de cifrado de contraseñas
          mediante hash, conexiones seguras HTTPS y control de acceso restringido a los datos. No obstante, el RESPONSABLE no puede garantizar
          la seguridad absoluta de la información transmitida por internet, por lo que el usuario reconoce que la transmisión de información
          a través de la red es inherentemente insegura.
        </p>

        <h2 className="text-lg font-semibold mb-4">9. Uso de cookies</h2>
        <p className="mb-20">
          Este sitio web utiliza únicamente cookies técnicas necesarias para su correcto funcionamiento, como la gestión de sesiones de usuario
          autenticado. No se utilizan cookies de seguimiento, publicitarias ni de perfiles sin el consentimiento expreso del usuario.
          El usuario puede consultar y gestionar sus preferencias en cualquier momento desde la sección{' '}
          <Link href="/micuenta" className="text-blue-600 hover:underline font-semibold">Mi Cuenta</Link>.
        </p>

        <h2 className="text-lg font-semibold mb-4">10. Modificaciones de la política de privacidad</h2>
        <p className="mb-20">
          El RESPONSABLE se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas,
          jurisprudenciales o de práctica empresarial. Los cambios serán publicados en esta misma página, indicando la fecha de la última
          actualización. Se recomienda al usuario revisar periódicamente esta política. El uso continuado del sitio web tras la publicación
          de cambios implicará la aceptación de los mismos.
        </p>

        <h2 className="text-lg font-semibold mb-4">11. Información sobre formularios</h2>
        <p className="mb-20">
          Todos los campos marcados con asterisco (*) en los formularios del sitio web son obligatorios para la correcta prestación del servicio
          solicitado. El usuario garantiza la veracidad, exactitud y actualidad de los datos facilitados, y se compromete a comunicar cualquier
          modificación que afecte a dicha exactitud. El RESPONSABLE no se hace responsable de los perjuicios que pudieran derivarse de la
          facilitación de datos falsos, inexactos o incompletos.
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
