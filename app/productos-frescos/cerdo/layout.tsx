import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cerdo Fresco en Cuenca",
  description:
    "Cerdo fresco de calidad en Cuenca. Lomo adobado, chuletas, costillas y toda la variedad de carne de cerdo en Carnicería Vicente Valencia. Visítanos en Av. de Castilla-La Mancha, 27.",
  keywords: ["cerdo fresco Cuenca", "lomo adobado Cuenca", "carne cerdo Cuenca", "chuletas cerdo Cuenca"],
  alternates: {
    canonical: "https://carniceriasvicentevalencia.vercel.app/productos-frescos/cerdo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
