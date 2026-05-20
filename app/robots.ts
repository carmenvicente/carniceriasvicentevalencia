import { MetadataRoute } from "next";

const BASE_URL = "https://carniceriasvicentevalencia.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/micuenta/", "/realizar-pedido/", "/pedido-confirmado/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
