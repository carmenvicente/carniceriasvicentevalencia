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

export const metadata: Metadata = {
  title: "Carnicería Vicente Valencia",
  description: "Compra productos cárnicos frescos y elaborados online",
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
