import Link from "next/link";
import { BenchmarkChart } from "../../components/BenchmarkChart";
import { articles } from "../../lib/articles";
import { mediciones } from "../../lib/mediciones";

export const metadata = {
  title: "Empresa | De preguntar a construir",
  description:
    "IA local para empresas y pymes: mediciones reproducibles, automatización con modelos open-source y decisiones de hardware propio o alquilado."
};

const measuredTopics = [
  ["Coste por respuesta válida", "Cuánto cuesta resolver una tarea real incluyendo reintentos, herramientas y revisión."],
  ["Latencia (TTFT)", "Cuánto tarda el sistema en empezar a responder cuando una persona espera delante."],
  ["Tasa de revisión humana", "Qué parte del flujo sigue necesitando criterio humano antes de llegar al cliente."],
  ["Memoria (qué cabe)", "Modelo, contexto y concurrencia que entran en hardware propio o alquilado sin degradarse."]
];

const decisionLinks = [
  ["Comparador", "El Comparador", "Cruza opciones por coste, memoria, ecosistema y caso de uso.", "/comparar/"],
  ["Fichas", "Fichas", "Consulta productos, runtimes y piezas de stack con criterio práctico.", "/fichas/"],
  ["Benchmarks", "Benchmarks", "Lee métricas reproducibles antes de decidir runtime, modelo o máquina.", "/benchmarks/"],
  ["Compra", "Guías de compra", "Decide cuándo comprar hardware propio y cuándo alquilar capacidad.", "/guias-compra/"]
];

export default function EmpresaPage() {
  const empresaArticles = articles.filter((article) => (article.tags || []).includes("Empresa"));

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Empresa</div>
            <h1>IA en local para automatizar tu empresa</h1>
            <p className="section-lead">
              Mediciones reales, modelos open-source y decisiones de hardware propio o alquilado para pymes que quieren automatizar sin humo.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Qué medimos</div>
            <h2>Señales que cambian una decisión</h2>
          </div>
        </div>
        <div className="cover-teasers">
          {measuredTopics.map(([title, text]) => (
            <article key={title}>
              <span>Medición</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Mediciones</div>
            <h2>Números, con su fuente y su nivel de confianza</h2>
          </div>
        </div>
        <div className="bench-grid">
          {mediciones.map((medicion) => (
            <BenchmarkChart medicion={medicion} key={medicion.id} />
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Análisis</div>
            <h2>Análisis para decidir</h2>
          </div>
        </div>
        <div className="article-grid">
          {empresaArticles.map((article) => (
            <Link className="editorial-card" href={`/articulos/${article.slug}/`} key={article.slug}>
              <span>{article.section}</span>
              <h2>{article.title}</h2>
              <p>{article.deck}</p>
              <strong>{article.verdict}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="cover-teasers">
          {decisionLinks.map(([kicker, title, text, href]) => (
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
