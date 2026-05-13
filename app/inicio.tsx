"use client";
import Navbar from "@/app/componentes/navbar";
import Footer from "@/app/componentes/footer";
import Link from "next/link";
import Image from "next/image";

export default function Inicio() {
  return (
    <div className="bg-white w-full min-h-screen overflow-y-auto">
      {/* Navbar: barra de navegación superior */}
      <Navbar />

      {/* Imagen de fondo a pantalla completa con posicionamiento relativo */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen">
        <Image
          src="/imagenes/otros/fondo33.JPG"
          alt="Imagen de fondo Carnicería J Vicente Valencia"
          fill
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          className="object-cover"
        />

        {/* Contenedor del texto con animación y posicionamiento absoluto */}
        <div
          className="
            absolute top-1/2 left-4 sm:left-8 md:left-10
            max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-4rem)]
            transform -translate-y-1/2
            text-white text-left
            fade-in-right
          "
        >
          {/* Título principal, tamaño responsivo y negrita */}
          <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            TRADICIÓN Y CALIDAD
          </h1>
          <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            EN CADA CORTE
          </h1>

          {/* Botón que redirige a la sección de productos frescos */}
          <div className="mt-4 md:mt-6">
            <Link
              href="/productos-frescos/ternera"
              className="bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base md:text-lg font-semibold hover:bg-red-800 transition"
              color="#990000"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido extra: sección "Quiénes Somos" y productos */}
      <div className="w-full py-10 bg-white text-center">
        {/* Contenedor principal con flex para organizar texto e imagen lado a lado */}
        <div className="max-w-screen-xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center gap-8">
          {/* Columna izquierda: texto descriptivo */}
          <div className="md:w-1/2 text-left">
            <p className="text-red-600 uppercase font-semibold mb-2">
              quiénes somos
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Carnicería Vicente Valencia
            </h2>
            <p
              className="text-gray-700 mb-4 mt-9"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Carnicería Vicente Valencia es tu carnicería de confianza, ahora
              también disponible online.
            </p>
            <p
              className="text-gray-700 mb-4"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Seleccionamos cuidadosamente productos frescos y de primera
              calidad para que disfrutes del auténtico sabor de la carne
              tradicional. Haz tu pedido de forma rápida y sencilla, y ven a
              recogerlo cómodamente cuando esté listo. Calidad, cercanía y buen
              servicio, como siempre.
            </p>
            <p
              className="text-gray-700 mb-4"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Descubre nuestra variedad de cortes frescos, embutidos caseros y
              otros productos gourmet. ¡Bienvenido a nuestra carnicería online
              de sabor superior!
            </p>
          </div>

          {/* Columna derecha: imagen representativa con figura y leyenda */}
          <div className="md:w-1/2 flex flex-col items-center justify-center">
            <figure>
              <Image
                src="/imagenes/otros/dueno2.webp"
                alt="Imagen Carnicería J Vicente Valencia"
                width={580}
                height={450}
                className="rounded-md object-cover"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  objectPosition: "center top",
                }}
              />
            </figure>
          </div>
        </div>

        {/* Sección de Productos Frescos con grid responsivo */}
        <div className="bg-white mt-16 md:mt-30 max-w-screen-xl mx-auto px-4">
          <h5
            className="text-xl font-semibold mb-6"
            style={{ color: "#990000" }}
          >
            Nuestros Productos Frescos
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center items-center">
            {/* Producto Ternera */}
            <Link
              href="/productos-frescos/ternera"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/terneradibujo.png"
                alt="Imagen dibujo de Ternera"
                width={220}
                height={220}
                className="mb-3 transition-transform duration-300 hover:scale-105"
              />
              <span className="text-center font-semibold">TERNERA</span>
            </Link>
            {/* Producto Cerdo */}
            <Link
              href="/productos-frescos/cerdo"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/cerdodibujo.png"
                alt="Imagen dibujo de Cerdo"
                width={220}
                height={220}
                className="mb-3 transition-transform duration-300 hover:scale-105"
              />
              <span className="text-center font-semibold">CERDO</span>
            </Link>
            {/* Producto Cordero */}
            <Link
              href="/productos-frescos/cordero"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/corderodibujo.png"
                alt="Imagen dibujo de Cordero"
                width={220}
                height={220}
                className="mb-3 transition-transform duration-300 hover:scale-105"
              />
              <span className="text-center font-semibold">CORDERO</span>
            </Link>
            {/* Producto Aves y Conejo */}
            <Link
              href="/productos-frescos/avesyconejos"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/avesyconejosdibujo.png"
                alt="Imagen dibujo de Aves y Conejos"
                width={220}
                height={220}
                className="mb-3 transition-transform duration-300 hover:scale-105"
              />
              <span className="text-center font-semibold">AVES Y CONEJO</span>
            </Link>
          </div>
        </div>

        {/* Sección de Productos Elaborados con grid responsivo */}
        <div className="bg-white mt-12 md:mt-30">
          <h5 className="text-xl font-semibold" style={{ color: "#990000" }}>
            Nuestros Productos Elaborados
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 mt-4 justify-items-center justify-center max-w-[600px] mx-auto">
            {/* Producto Embutidos Caseros */}
            <Link
              href="/productos-elaborados/embutidoscaseros"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/embutidoscaserosdibujo.png"
                alt="Imagen dibujo de Embutidos caseros"
                width={220}
                height={220}
                className="mb-2 transition-transform duration-300 hover:scale-105"
              />
              <span>Embutidos caseros</span>
            </Link>
            {/* Producto Elaborados */}
            <Link
              href="/productos-elaborados/elaborados"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/elaboradosdibujo.png"
                alt="Imagen dibujo de Elaborados"
                width={220}
                height={220}
                className="mb-2 transition-transform duration-300 hover:scale-105"
              />
              <span>elaborados</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bloque informativo en fondo negro con iconos y texto */}
      <div className="w-full flex justify-center px-4 mt-12 md:mt-30">
        <div className="bg-black text-white rounded-2xl px-8 py-10 max-w-screen-xl w-full shadow-lg">
          <div className="grid gap-9 grid-cols-1 md:grid-cols-3 text-center">
            {/* Pago Seguro */}
            <div className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/imagenes/iconos/tarjeta-de-credito.png"
                alt="Imagen icono de Pago Seguro"
                width={32}
                height={32}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                className="mx-auto mb-2"
              />
              <h6 className="text-base font-semibold">Pago 100% Seguro</h6>
              <p
                className="text-sm mt-2"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Compra segura con certificado SSL
              </p>
            </div>
            {/* Pedidos Rápidos */}
            <div className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/imagenes/iconos/avion-de-papel.png"
                alt="Imagen icono de Pedidos Rápidos"
                width={32}
                height={32}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                className="mx-auto mb-2"
              />
              <h6 className="text-base font-semibold">Pedidos Rápidos</h6>
              <p
                className="text-sm mt-2"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Preparación rápida de tu pedido
              </p>
            </div>
            {/* Atención al Cliente */}
            <div className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/imagenes/iconos/apreton-de-manos.png"
                alt="Imagen icono de Atención al Cliente"
                width={32}
                height={32}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                className="mx-auto mb-2"
              />
              <h6 className="text-base font-semibold">Atención al Cliente</h6>
              <p
                className="text-sm mt-2"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Resolvemos tus dudas vía{" "}
                <Link href="/contacto" className="text-white hover:underline">
                  WhatsApp o llamada
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Nuestros Valores con fondo de imagen y overlay oscuro */}
      <div className="relative w-full mt-12 md:mt-30 bg-white overflow-visible">
        {/* Fondo de la sección */}
        <div
          className="w-full h-[180px] sm:h-[240px] md:h-[400px] bg-cover bg-center"
          style={{ backgroundImage: "url('/imagenes/otros/valores.JPG')" }}
        />
        {/* Overlay negro semitransparente para mejorar contraste */}
        <div className="absolute inset-0 bg-black opacity-65" />

        {/* Contenedor centralizado con flexbox para iconos */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="flex justify-center space-x-8 sm:space-x-10 md:space-x-12 max-w-2xl w-full">
            {/* Iconos representativos de valores */}
            {[
              { src: "/imagenes/iconos/cuchillo.png", label: "Comida Casera" },
              { src: "/imagenes/iconos/toro.png", label: "Orígenes" },
              { src: "/imagenes/iconos/calidad.png", label: "Calidad" },
            ].map((val, i) => (
              <div
                key={i}
                className="flex flex-col items-center transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={val.src}
                  alt={val.label}
                  width={40}
                  height={40}
                  className="mb-2 md:mb-4 md:w-[60px] md:h-[60px]"
                />
                <span className="text-white text-xs sm:text-sm md:text-lg font-medium">
                  {val.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tarjeta roja con estadísticas, centrada y debajo de la sección valores */}
      <div className="mt-2 bg-[#990000] rounded-lg shadow-lg overflow-hidden w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto">
        <div className="flex flex-row">
          <div className="flex-1 p-4 border-r border-red-500">
            <h2 className="text-2xl md:text-3xl font-bold text-white">+1000</h2>
            <p className="text-xs md:text-sm text-red-200">clientes al mes</p>
          </div>
          <div className="flex-1 p-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">+100</h2>
            <p className="text-xs md:text-sm text-red-200">productos</p>
          </div>
        </div>
      </div>

      {/* Sección noticia destacada con imágenes superpuestas y texto */}
      <div className="relative w-full mt-12 md:mt-20 lg:mt-40 bg-white overflow-visible">
        {/* Contenedor central que limita el ancho máximo */}
        <div className="relative z-10 mx-auto max-w-screen-xl flex flex-col md:flex-row items-start">
          {/* Columna izquierda con imagen principal y superpuesta */}
          <div className="w-full md:w-1/2 relative p-4 md:p-6 flex justify-center">
            <Image
              src="/imagenes/otros/jesuschorizos.JPG"
              alt="Imagen chorizos Carnicería J Vicente Valencia"
              width={800}
              height={400}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              className="w-full sm:w-80 md:w-96 lg:w-[500px] h-auto rounded-lg shadow-md object-cover ml-0 md:ml-8 lg:ml-12"
            />
            <Image
              src="/imagenes/otros/noticia.png"
              alt="Imagen noticia Carnicería J Vicente Valencia"
              width={140}
              height={60}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              className="absolute top-[-20px] left-[+10px] rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-4 border-white object-cover"
            />
          </div>

          {/* Línea roja divisoria visible solo en escritorio */}
          <div className="hidden md:block w-1 bg-[#990000] h-80" />

          {/* Columna derecha con texto descriptivo y enlace */}
          <div className="w-full md:w-1/2 p-6">
            <h1 className="text-3xl font-extrabold mb-4 text-gray-800 relative">
              De Toda la Vida
            </h1>
            <p
              className="text-gray-700 mb-6 relative"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              En su día a día, Jesús lleva por bandera el negocio familiar que
              su padre, Vicente, comenzó a fraguar hace ya más de 70 años. Una
              carnicería especial y con sello propio.
            </p>
            <Link
              href="https://www.latribunadecuenca.es/noticia/zbd62b45d-e0ac-fd0f-55e264a9a616780d/202109/de-toda-la-vida"
              target="_blank"
              className="inline-block px-6 py-3 bg-[#990000] text-white font-semibold rounded-lg shadow-lg hover:bg-[#aa0000] transition relative"
            >
              Leer Noticia Completa
            </Link>
          </div>
        </div>
      </div>

      {/* Sección de Reseñas con diseño tipo Google */}
      <section className="bg-white py-20 px-4 text-center">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-xl text-black font-bold uppercase mb-2">
            Reseñas
          </h2>
          <h3
            className="text-4xl font-extrabold text-[#a13a3a] mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Los clientes hablan por nosotros
          </h3>

          {/* Grid responsivo para tarjetas de reseñas */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {/* Reseña 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start text-left border border-gray-200">
              <Image
                src="/imagenes/iconos/google.webp"
                alt="Google"
                width={40}
                height={40}
                className="mb-4"
              />
              <p
                className="text-gray-700 mb-4"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Es el lugar que nos recomendaron —con todo acierto— para
                adquirir productos típicos de la tierra. Compramos
                principalmente morteruelo y unas deliciosas hamburguesas de
                ciervo.
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-[#a13a3a] text-2xl">“</span>
                <div>
                  <p
                    className="font-semibold text-black"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    oZe Fera
                  </p>
                  <p
                    className="text-sm text-gray-500"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Reseña de Google
                  </p>
                </div>
              </div>
            </div>

            {/* Reseña 2 */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start text-left border border-gray-200">
              <Image
                src="/imagenes/iconos/google.webp"
                alt="Google"
                width={40}
                height={40}
                className="mb-4"
              />
              <p
                className="text-gray-700 mb-4"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Para mí, la mejor carnicería de Cuenca. Conservan todo el sabor
                de los productos tradicionales de la ciudad. El lomo adobado es
                insuperable, y los cortes que hacen del cerdo y del cordero son
                inmejorables. Recomiendo sus platos de cocina diaria, que son
                como comer en casa, pero teniendo en casa a un chef. Si tenéis
                posibilidad, y ese día hay, recomiendo comprar croquetas y
                cachopos, porque los elaboran ellos mismos y son de lo mejor que
                podéis probar.
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-[#a13a3a] text-2xl">“</span>
                <div>
                  <p
                    className="font-semibold text-black"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Jose Luis Millán de las Heras
                  </p>
                  <p
                    className="text-sm text-gray-500"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Reseña de Google
                  </p>
                </div>
              </div>
            </div>

            {/* Reseña 3 */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start text-left border border-gray-200">
              <Image
                src="/imagenes/iconos/google.webp"
                alt="Google"
                width={40}
                height={40}
                className="mb-4"
              />
              <p
                className="text-gray-700 mb-4"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Siempre que necesito buen género acudo a esta carnicería. No
                solo el trato es inmejorable, sino que el producto también lo
                es. Se ha convertido en mi carnicería de confianza.
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-[#a13a3a] text-2xl">“</span>
                <div>
                  <p
                    className="font-semibold text-black"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Alvaro Barrero Lucena
                  </p>
                  <p
                    className="text-sm text-gray-500"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Reseña de Google
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Valoración global y enlace externo */}
          <p
            className="mt-10 text-black text-base font-semibold"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            La evaluación general en Google es{" "}
            <span className="font-bold">4.6 de 5</span>, en base a{" "}
            <span className="font-bold">11 reseñas</span>.
          </p>
          <a
            href="https://www.google.com/search?sa=X&sca_esv=137b759269c363f4&tbm=lcl&q=Carnicer%C3%ADa+Vicente+Valencia+Rese%C3%B1as&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNLUwNDY1MTA1NzU1NTczMTIyNdjAyPiKUdU5sSgvMzm16PDaRIUwICOvJFUhLDEnNS85M1EhKLU49fDGxOJFrMSpAwBmN3JzawAAAA&rldimm=15813540575557642250&hl=es-ES&ved=2ahUKEwjfx-uB4K2OAxXSfKQEHWVeA9QQ9fQKegQILhAF&biw=1707&bih=825&dpr=2.25#lkt=LocalPoiReviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-red-700 hover:text-red-900 font-semibold underline transition"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ver todas las reseñas en Google
          </a>
        </div>
      </section>

      {/* Footer: pie de página */}
      <Footer />
    </div>
  );
}
