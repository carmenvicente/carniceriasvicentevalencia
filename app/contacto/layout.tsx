import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto y Horarios | Carnicería en Cuenca",
  description:
    "Encuentra Carnicería Vicente Valencia en Cuenca. Dirección: Av. de Castilla-La Mancha, 27, 16003 Cuenca. Teléfono: 969 221 018. Horario: Lun–Sáb 9:30–15:00.",
  keywords: ["carnicería Cuenca dirección", "carnicería Vicente Valencia contacto", "horario carnicería Cuenca"],
  alternates: {
    canonical: "https://carniceriasvicentevalencia.vercel.app/contacto",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
