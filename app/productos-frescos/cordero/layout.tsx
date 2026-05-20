import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cordero Fresco en Cuenca",
  description:
    "Cordero fresco de primera calidad en Cuenca. Pierna, paletilla, chuletas de cordero y más en Carnicería Vicente Valencia. Visítanos en Av. de Castilla-La Mancha, 27.",
  keywords: ["cordero fresco Cuenca", "pierna cordero Cuenca", "paletilla cordero Cuenca", "carne cordero Cuenca"],
  alternates: {
    canonical: "https://carniceriasvicentevalencia.vercel.app/productos-frescos/cordero",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
