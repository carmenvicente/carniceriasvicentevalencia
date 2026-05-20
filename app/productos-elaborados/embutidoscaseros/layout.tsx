import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embutidos Caseros en Cuenca",
  description:
    "Embutidos caseros artesanales en Cuenca: chorizo, salchichón, morcilla y más. Elaborados con recetas tradicionales en Carnicería Vicente Valencia. Visítanos en Av. de Castilla-La Mancha, 27.",
  keywords: [
    "embutidos caseros Cuenca",
    "chorizo artesanal Cuenca",
    "embutidos artesanales Cuenca",
    "embutidos tradicionales Cuenca",
    "morcilla Cuenca",
  ],
  alternates: {
    canonical: "https://carniceriasvicentevalencia.vercel.app/productos-elaborados/embutidoscaseros",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
