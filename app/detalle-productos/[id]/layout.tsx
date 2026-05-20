import type { Metadata } from "next";
import { neon } from "@neondatabase/serverless";

const BASE_URL = "https://carniceriasvicentevalencia.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const sql = neon(process.env.DATABASE_URL as string);
    const resultado = await sql`
      SELECT p.nombre, p.descripcion, p.imagen, s.nombre AS subcategoria
      FROM productos p
      JOIN subcategorias s ON p.subcategoria_id = s.id
      WHERE p.id = ${id}
    `;

    if (resultado.length === 0) {
      return { title: "Producto | Carnicería Vicente Valencia" };
    }

    const producto = resultado[0];
    const titulo = `${producto.nombre} – Carnicería Vicente Valencia Cuenca`;
    const descripcion = producto.descripcion
      ? `${producto.descripcion} – ${producto.subcategoria} en Carnicería Vicente Valencia, Cuenca.`
      : `${producto.nombre} de ${producto.subcategoria} en Carnicería Vicente Valencia, Cuenca.`;

    return {
      title: titulo,
      description: descripcion,
      openGraph: {
        title: titulo,
        description: descripcion,
        images: producto.imagen
          ? [{ url: producto.imagen, alt: producto.nombre }]
          : [],
      },
      alternates: {
        canonical: `${BASE_URL}/detalle-productos/${id}`,
      },
    };
  } catch {
    return { title: "Producto | Carnicería Vicente Valencia" };
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
