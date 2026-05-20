import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aves y Conejo en Cuenca",
  description:
    "Pollo, pavo, conejo y otras aves frescas en Cuenca. Carnicería Vicente Valencia, más de 70 años de tradición. Visítanos en Av. de Castilla-La Mancha, 27.",
  keywords: ["aves frescas Cuenca", "pollo fresco Cuenca", "conejo Cuenca", "pavo Cuenca", "carnicería aves Cuenca"],
  alternates: {
    canonical: "https://carniceriasvicentevalencia.vercel.app/productos-frescos/avesyconejos",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
