import { articles } from "../lib/articles";
import { getChapters } from "../lib/content";
import { SITE_URL } from "../lib/site-config";
import { getAllTags } from "../lib/tags";

const staticRoutes = [
  "/",
  "/hoy/",
  "/empieza-aqui/",
  "/actualidad/",
  "/decidir/",
  "/construir/",
  "/empresa/",
  "/aprender/",
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
  "/tags/",
  "/newsletter/"
];

export default function sitemap() {
  const routes = [
    ...staticRoutes,
    ...articles.map((article) => `/articulos/${article.slug}/`),
    ...getAllTags().map((tag) => `/tags/${tag.slug}/`),
    ...getChapters().map((chapter) => `/leer/${chapter.slug}/`)
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date()
  }));
}
