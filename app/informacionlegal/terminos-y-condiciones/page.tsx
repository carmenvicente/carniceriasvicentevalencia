'use client';

import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import Link from 'next/link';

export default function TerminosCondiciones() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="h-22 w-full bg-black" />

      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">TÉRMINOS Y CONDICIONES</h1>
          <div className="mt-1 text-black text-sm">
            <Link href="/" className="hover:text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Home
            </Link>
            <span className="mx-1">/</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Términos y Condiciones</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-10 text-black text-justify" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>

        <p className="mb-6">
          Las presentes condiciones generales de uso (en adelante, las «Condiciones») regulan expresamente las relaciones surgidas entre el
          sitio web de <strong>Carnicería Vicente Valencia SL</strong> (en adelante, el «RESPONSABLE») y los usuarios que accedan, naveguen
          o utilicen los servicios e informaciones ofrecidos a través del mismo.
        </p>
        <p className="mb-20">
          El acceso y uso de este sitio web implica la aceptación plena y sin reservas de las presentes Condiciones en la versión publicada
          en el momento en que el usuario acceda al sitio. El RESPONSABLE se reserva el derecho a modificar estas Condiciones en cualquier
          momento, siendo efectivas dichas modificaciones desde el momento de su publicación en el sitio web. Se recomienda al usuario
          revisar periódicamente las presentes Condiciones. El uso continuado del sitio web tras la publicación de cambios constituirá
          la aceptación de los mismos.
        </p>

        <h2 className="text-lg font-semibold mb-4">1. Identificación del titular</h2>
        <p className="mb-20">
          Denominación social: Carnicería Vicente Valencia SL<br />
          CIF: B16188021<br />
          Domicilio: Av. de Castilla-La Mancha, Nº 27, Bajo, 16003 Cuenca (España)<br />
          Correo electrónico de contacto: carniceriavicentevalencia@gmail.com
        </p>

        <h2 className="text-lg font-semibold mb-4">2. Objeto y ámbito de aplicación</h2>
        <p className="mb-6">
          Las presentes Condiciones tienen por objeto regular el acceso y el uso del sitio web titularidad del RESPONSABLE, incluyendo,
          entre otros, la consulta del catálogo de productos, el registro de cuentas de usuario, la utilización de los formularios de
          contacto disponibles y, cuando esté habilitado, la contratación de los productos comercializados a través del mismo.
        </p>
        <p className="mb-20">
          El sitio web está dirigido exclusivamente a personas mayores de edad. El acceso y el uso por parte de menores queda bajo la
          responsabilidad de los progenitores o tutores legales, quienes serán responsables de supervisar dicho acceso y de garantizar
          que el menor comprende y acepta las presentes Condiciones.
        </p>

        <h2 className="text-lg font-semibold mb-4">3. Registro de usuarios y cuenta personal</h2>
        <p className="mb-6">
          El acceso a determinadas funcionalidades del sitio web, como la gestión de favoritos o el historial de actividad, puede requerir
          el registro previo del usuario mediante la creación de una cuenta personal. Para ello, el usuario deberá facilitar una dirección
          de correo electrónico válida y establecer una contraseña de acceso, que será almacenada de forma cifrada mediante técnicas de hash.
        </p>
        <p className="mb-6">
          El usuario es el único responsable del uso de sus credenciales de acceso y se compromete a mantenerlas en secreto, notificando
          de forma inmediata al RESPONSABLE ante cualquier uso no autorizado de su cuenta. El RESPONSABLE no será responsable de los
          daños o perjuicios que pudieran derivarse del uso indebido de las credenciales por parte de terceros.
        </p>
        <p className="mb-20">
          El RESPONSABLE se reserva el derecho a suspender o cancelar la cuenta de cualquier usuario que incumpla las presentes Condiciones,
          haga un uso fraudulento o ilícito del sitio web, o facilite información falsa o inexacta en el proceso de registro.
        </p>

        {/* SECCIONES COMENTADAS — se reactivarán cuando se habilite la tienda online */}
        {/*
        <h2 className="text-lg font-semibold mb-4">4. Proceso de compra</h2>
        <p className="mb-20">
          Para realizar un pedido, el usuario deberá ser mayor de edad, registrarse con sus datos personales,
          seguir el proceso de compra indicado en la tienda online y autorizar el pedido.
          Una vez confirmado, se preparará bajo demanda.
        </p>

        <h2 className="text-lg font-semibold mb-4">5. Recogida en tienda</h2>
        <p className="mb-20">
          Todos los pedidos realizados a través del sitio web se preparan bajo demanda y estarán disponibles
          exclusivamente para recogida en tienda. El cliente será notificado cuando su pedido esté listo y podrá
          pasar a recogerlo en el horario establecido.
        </p>

        <h2 className="text-lg font-semibold mb-4">6. Devoluciones</h2>
        <p className="mb-20">
          No se admiten devoluciones de productos perecederos salvo en casos excepcionales de error en el pedido
          o productos en mal estado. Las incidencias deberán comunicarse el mismo día de la recogida.
        </p>

        <h2 className="text-lg font-semibold mb-4">7. Precios y formas de pago</h2>
        <p className="mb-20">
          Todos los precios incluyen el IVA correspondiente. El pago puede realizarse online mediante tarjeta
          bancaria o en tienda al recoger el pedido.
        </p>

        <h2 className="text-lg font-semibold mb-4">8. Disponibilidad de productos</h2>
        <p className="mb-20">
          En caso de falta de disponibilidad de algún producto solicitado, se informará al cliente y se ofrecerá
          una alternativa o la posibilidad de modificar el pedido.
        </p>
        */}

        <h2 className="text-lg font-semibold mb-4">4. Uso adecuado del sitio web</h2>
        <p className="mb-6">
          El usuario se compromete a utilizar el sitio web de conformidad con la ley, las presentes Condiciones, la moral y el orden
          público, y a abstenerse de utilizarlo con fines o efectos ilícitos, lesivos para los derechos e intereses de terceros, o que
          puedan dañar, inutilizar, sobrecargar o deteriorar el sitio web o impedir su normal disfrute por parte de otros usuarios.
        </p>
        <p className="mb-20">
          Queda expresamente prohibido el uso del sitio web para la transmisión, difusión o almacenamiento de contenidos que sean
          contrarios a la ley, que vulneren derechos de terceros, que sean ofensivos, difamatorios, obscenos o que puedan constituir
          publicidad ilícita. El RESPONSABLE se reserva el derecho a adoptar las medidas técnicas y legales necesarias para impedir
          el acceso al sitio a aquellos usuarios que incumplan estas obligaciones.
        </p>

        <h2 className="text-lg font-semibold mb-4">5. Propiedad intelectual e industrial</h2>
        <p className="mb-6">
          El presente sitio web —incluyendo su diseño, estructura, programación, interfaz visual, textos, logotipos, imágenes,
          fotografías, gráficos, iconos y cualquier otro elemento que lo componga— ha sido íntegramente creado y desarrollado por
          <strong> Carmen Vicente Crespo</strong>, quien ostenta los derechos de autoría sobre el conjunto de la obra en virtud
          de lo dispuesto en el Real Decreto Legislativo 1/1996, de 12 de abril, por el que se aprueba el Texto Refundido de la
          Ley de Propiedad Intelectual (TRLPI). El RESPONSABLE cuenta con la correspondiente cesión de derechos de explotación
          por parte de la autora.
        </p>
        <p className="mb-6">
          Tanto la autora como el RESPONSABLE se reservan expresamente todos los derechos sobre la totalidad de los contenidos
          publicados en este sitio web. Ningún contenido podrá ser reproducido, distribuido, comunicado públicamente, transformado,
          almacenado, cedido, sublicenciado ni utilizado de ninguna forma —con o sin ánimo de lucro— sin la autorización previa
          y por escrito de <strong>Carmen Vicente Crespo</strong> y del RESPONSABLE.
        </p>
        <p className="mb-6">
          <strong>Fotografías:</strong> Las fotografías publicadas en este sitio web han sido realizadas por{' '}
          <strong>Carmen Vicente Crespo</strong> y son de su exclusiva propiedad intelectual, con todos los derechos reservados.
          Queda expresamente prohibida su reproducción, distribución, comunicación pública, transformación, descarga, uso en redes
          sociales, publicaciones digitales o impresas, o cualquier otra forma de explotación, ya sea con o sin ánimo de lucro,
          sin la autorización previa y por escrito de su autora. Las solicitudes de autorización de uso deberán dirigirse al
          correo electrónico: carniceriavicentevalencia@gmail.com, indicando el propósito, el medio de difusión y el período
          de uso previsto. El uso no autorizado de cualquier fotografía podrá ser perseguido por la vía que corresponda en derecho.
        </p>
        <p className="mb-20">
          Los nombres comerciales, marcas y signos distintivos que pudieran aparecer en este sitio web son titularidad del
          RESPONSABLE o de terceros que han autorizado su uso, y no podrán ser objeto de reproducción o uso sin la
          correspondiente autorización.
        </p>

        <h2 className="text-lg font-semibold mb-4">6. Protección de datos personales</h2>
        <p className="mb-20">
          El tratamiento de los datos personales de los usuarios se rige por lo establecido en la{' '}
          <Link href="/informacionlegal/politica-de-privacidad" className="text-blue-600 hover:underline font-semibold">
            Política de Privacidad
          </Link>{' '}
          del sitio web, de conformidad con el Reglamento (UE) 2016/679 (GDPR) y la Ley Orgánica 3/2018, de 5 de diciembre,
          de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD). El usuario puede ejercer sus
          derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición en cualquier momento,
          escribiendo al correo electrónico: carniceriavicentevalencia@gmail.com.
        </p>

        <h2 className="text-lg font-semibold mb-4">7. Exención de responsabilidad</h2>
        <p className="mb-6">
          El RESPONSABLE no garantiza la disponibilidad, continuidad ni infalibilidad del funcionamiento del sitio web y,
          en consecuencia, no será responsable por los daños o perjuicios de cualquier tipo que pudieran derivarse de la
          falta de disponibilidad o de la interrupción del servicio, ya sea por causas técnicas, de mantenimiento o por
          motivos ajenos al control del RESPONSABLE.
        </p>
        <p className="mb-20">
          Asimismo, el RESPONSABLE no se hace responsable de los contenidos, productos o servicios ofrecidos en sitios
          web de terceros a los que pudiera enlazar este sitio, ni de los posibles daños que su consulta pudiera ocasionar
          al usuario. La inclusión de un enlace externo no implica ningún tipo de relación, recomendación ni acuerdo
          comercial con el sitio enlazado.
        </p>

        <h2 className="text-lg font-semibold mb-4">8. Legislación aplicable y jurisdicción</h2>
        <p className="mb-20">
          Las presentes Condiciones se rigen e interpretan de conformidad con la legislación española vigente, y en
          particular con lo dispuesto en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información
          y de Comercio Electrónico (LSSICE), el Real Decreto Legislativo 1/1996 (TRLPI) y el Reglamento (UE) 2016/679
          (GDPR). Para la resolución de cualquier controversia o conflicto que pudiera derivarse del acceso o uso de este
          sitio web, las partes, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, se someten a
          la jurisdicción de los Juzgados y Tribunales de Cuenca, salvo que la normativa de protección de consumidores
          y usuarios establezca un fuero imperativo distinto.
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
