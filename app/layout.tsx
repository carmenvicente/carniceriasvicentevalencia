// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AvisoCookies from '@/app/componentes/Cookies/AvisoCookies';
import ScrollToTop from '@/app/componentes/ScrollToTop';
import { Providers } from './providers'; // <-- AÑADIDO

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://carniceriasvicentevalencia.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Carnicería Vicente Valencia | Carnicería en Cuenca",
    template: "%s | Carnicería Vicente Valencia – Cuenca",
  },
  description:
    "Carnicería en Cuenca con más de 70 años de tradición. Carne fresca de ternera, cerdo, cordero y aves, embutidos caseros, morteruelo y elaborados. Visítanos en Av. de Castilla-La Mancha, 27.",
  keywords: [
    "carnicería Cuenca",
    "carnicería en Cuenca",
    "carne fresca Cuenca",
    "carnicería Vicente Valencia",
    "morteruelo Cuenca",
    "embutidos caseros Cuenca",
    "ternera Cuenca",
    "cordero Cuenca",

    "carnicerías de Cuenca",
  ],
  authors: [{ name: "Carnicería Vicente Valencia" }],
  creator: "Carnicería Vicente Valencia",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: BASE_URL,
    siteName: "Carnicería Vicente Valencia",
    title: "Carnicería Vicente Valencia | Carnicería en Cuenca",
    description:
      "Carnicería en Cuenca con más de 70 años de tradición. Carne fresca, embutidos caseros y morteruelo. Visítanos en Av. de Castilla-La Mancha, 27.",
    images: [
      {
        url: "/imagenes/otros/fondo33.JPG",
        width: 1200,
        height: 630,
        alt: "Carnicería Vicente Valencia – Cuenca",
      },
    ],
  },
  verification: {
    google: "googled49623e67267b041",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YEVXFLSP20"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YEVXFLSP20');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ScrollToTop />
          {children}
          <AvisoCookies />
          <div id="contenedor-carrito" />
        </Providers>
      </body>
    </html>
  );
}
