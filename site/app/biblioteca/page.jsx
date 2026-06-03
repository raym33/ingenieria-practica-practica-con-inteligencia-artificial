import Link from "next/link";
import { getChapters } from "../../lib/content";
import { ChapterSearch } from "../../components/ChapterSearch";

export const metadata = {
  title: "Biblioteca | De preguntar a construir"
};

export default function BibliotecaPage() {
  const chapters = getChapters();
  const sections = [
    ["Fundamentos", "modelos, prompts, contexto", "/leer/05-capitulo-4-llms-para-ingenieros-ocupados/"],
    ["Modelos y hardware", "APIs, local, Apple Silicon, GPU", "/leer/09-capitulo-8-hardware-real-para-ia-local/"],
    ["RAG", "retrieval, reranking, permisos", "/leer/20-capitulo-19-rag-avanzado/"],
    ["Agentes", "tools, MCP, memoria, voz", "/leer/28-capitulo-27-arquitecturas-agenticas/"],
    ["Producción", "evals, trazas, seguridad, costes", "/leer/37-capitulo-36-despliegue-y-operacion/"],
    ["Producto", "workflows, integraciones, UX, venta", "/leer/38-capitulo-37-automatizaciones-y-workflows/"]
  ];

  return (
    <main className="section shell">
      <h1>Biblioteca</h1>
      <p className="section-lead">
        Capítulos del libro en formato web. Usa el buscador para saltar a temas como RAG, modelos locales, agentes, prompts o hardware.
      </p>
      <div className="topic-grid">
        {sections.map(([title, description, href]) => (
          <Link className="topic-card" href={href} key={title}>
            <strong>{title}</strong>
            <span>{description}</span>
          </Link>
        ))}
      </div>
      <ChapterSearch chapters={chapters} />
      <div className="chapter-grid">
        {chapters.map((chapter) => (
          <Link className="chapter-card" href={`/leer/${chapter.slug}/`} key={chapter.slug}>
            <div>
              <h3>{chapter.title}</h3>
              <p>{chapter.excerpt}</p>
            </div>
            <div className="meta-row"><span>{chapter.readingTime} min</span><span>{chapter.sectionCount} secciones</span></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
