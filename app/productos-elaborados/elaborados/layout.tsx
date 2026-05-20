import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elaborados Caseros en Cuenca",
  description:
    "Croquetas caseras, cachopos, hamburguesas artesanales y platos elaborados en Cuenca. Carnicería Vicente Valencia, sabor de siempre. Visítanos en Av. de Castilla-La Mancha, 27.",
  keywords: [
    "elaborados caseros Cuenca",
    "croquetas caseras Cuenca",
    "cachopos Cuenca",
    "hamburguesas artesanales Cuenca",
    "platos preparados Cuenca",
  ],
  alternates: {
    canonical: "https://carniceriasvicentevalencia.vercel.app/productos-elaborados/elaborados",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
