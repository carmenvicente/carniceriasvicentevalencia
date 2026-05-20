import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charcutería en Cuenca",
  description:
    "Charcutería artesanal en Cuenca: jamón, lomo embuchado, quesos y más productos de charcutería. Carnicería Vicente Valencia, tradición familiar desde hace más de 70 años.",
  keywords: [
    "charcutería Cuenca",
    "jamón Cuenca",
    "charcutería artesanal Cuenca",
    "embutidos charcutería Cuenca",
  ],
  alternates: {
    canonical: "https://carniceriasvicentevalencia.vercel.app/charcuteria",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
