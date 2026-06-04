import { articles } from "../lib/articles";
import { getChapters } from "../lib/content";
import { SITE_URL } from "../lib/site-config";

const staticRoutes = [
  "/",
  "/revista/",
  "/ediciones/",
  "/radar/",
  "/productos/",
  "/fichas/",
  "/comparar/",
  "/benchmarks/",
  "/ideas/",
  "/guias-compra/",
  "/herramientas-ia/",
  "/modelos/",
  "/inferencia/",
  "/labs/",
  "/sobre/",
  "/buscar/",
  "/newsletter/"
];

export default function sitemap() {
  const routes = [
    ...staticRoutes,
    ...articles.map((article) => `/articulos/${article.slug}/`),
    ...getChapters().map((chapter) => `/leer/${chapter.slug}/`)
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date()
  }));
}
