import type { Metadata } from "next";
import Inicio from "./inicio";

export const metadata: Metadata = {
  title: "Carnicería Vicente Valencia | Carnicería en Cuenca",
  description:
    "Carnicería en Cuenca con más de 70 años de tradición familiar. Carne fresca de ternera, cerdo, cordero y aves. Embutidos caseros, morteruelo y elaborados. Visítanos en Av. de Castilla-La Mancha, 27.",
  alternates: {
    canonical: "https://carniceriasvicentevalencia.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MeatEstablishment",
  name: "Carnicería Vicente Valencia",
  description:
    "Carnicería en Cuenca con más de 70 años de tradición familiar. Carne fresca, embutidos caseros, morteruelo y elaborados. Av. de Castilla-La Mancha, 27.",
  url: "https://carniceriasvicentevalencia.vercel.app",
  telephone: "+34969221018",
  email: "carniceriavicentevalencia@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. de Castilla-La Mancha, Nº 27, Bajo",
    addressLocality: "Cuenca",
    postalCode: "16003",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.068213,
    longitude: -2.141811,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:30",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "09:30",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "17:30",
      closes: "20:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:30",
      closes: "15:00",
    },
  ],
  servesCuisine: "Carne fresca y elaborados",
  priceRange: "€€",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "11",
    bestRating: "5",
  },
  image: "https://carniceriasvicentevalencia.vercel.app/imagenes/otros/fondo33.JPG",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Inicio />
    </>
  );
}