import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ternera Fresca en Cuenca",
  description:
    "Ternera fresca de primera calidad en Cuenca. Filetes, chuletas, chuletón y más cortes de ternera en Carnicería Vicente Valencia. Visítanos en Av. de Castilla-La Mancha, 27.",
  keywords: ["ternera fresca Cuenca", "carne de ternera Cuenca", "filetes ternera Cuenca", "carnicería ternera Cuenca"],
  alternates: {
    canonical: "https://carniceriasvicentevalencia.vercel.app/productos-frescos/ternera",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
