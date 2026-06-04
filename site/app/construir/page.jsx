import Link from "next/link";
import { articles } from "../../lib/articles";

export const metadata = {
  title: "Construir | De preguntar a construir",
  description: "Ideas, herramientas, labs y stacks locales para convertir IA en producto."
};

const buildLinks = [
  ["Ideas", "Ideas construibles", "Proyectos concretos para empezar este finde: problema, a quién sirve, stack y MVP.", "/ideas/"],
  ["SaaS", "Patrones de SaaS IA", "Los moldes de negocio que se repiten y qué herramienta usar para construir algo vendible.", "/saas-ia/"],
  ["Herramientas", "Herramientas IA", "Codex, Claude Code, Cursor, Lovable, OpenRouter y runtimes para programar.", "/herramientas-ia/"],
  ["Pruebas", "Banco de pruebas", "Labs ejecutables para medir retrieval, costes, jueces LLM y modelos locales.", "/labs/"],
  ["Local", "Stack local", "Ollama, MLX, llama.cpp, Open WebUI, RAG privado, red y seguridad.", "/stack-ia-local/"]
];

export default function ConstruirPage() {
  const starterArticles = articles
    .filter((article) => (article.tags || []).some((tag) => ["Agentes", "SaaS"].includes(tag)))
    .slice(0, 3);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Construir</div>
            <h1>De la idea al producto</h1>
            <p className="section-lead">Herramientas, ideas y laboratorios para pasar de una demo de IA a sistemas que se pueden probar, operar y vender.</p>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Para empezar</div>
            <h2>Lecturas para construir</h2>
          </div>
        </div>
        <div className="article-grid">
          {starterArticles.map((article) => (
            <Link className="editorial-card" href={`/articulos/${article.slug}/`} key={article.slug}>
              <span>{article.section}</span>
              <h3>{article.title}</h3>
              <p>{article.deck}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="cover-teasers">
          {buildLinks.map(([kicker, title, text, href]) => (
            <Link className="shelf-card" href={href} key={href}>
              <span>{kicker}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
