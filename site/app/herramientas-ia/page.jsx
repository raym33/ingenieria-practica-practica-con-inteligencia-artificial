import Link from "next/link";
import { articles } from "../../lib/articles";

export const metadata = {
  title: "Herramientas IA | De preguntar a construir"
};

const tools = [
  ["Codex", "Agente de código sobre repos, cambios verificables, pruebas, sitios y flujos de trabajo.", "Ideal cuando ya hay código, tests o una app que evolucionar."],
  ["Claude Code", "Agente terminal fuerte para explorar codebases, planificar, editar, ejecutar comandos y usar MCP.", "Ideal para equipos técnicos que viven en terminal y Git."],
  ["OpenRouter", "Una API para probar muchos modelos, comparar coste/calidad y enrutar según tarea.", "Ideal para prototipos SaaS y productos que no quieren casarse con un proveedor."],
  ["Lovable", "Construcción visual rápida de apps si el flujo está muy bien definido.", "Ideal para validar una interfaz o MVP antes de endurecer arquitectura."],
  ["Cursor / Replit", "IDE con asistencia integrada para iterar producto, UI y features con mucha velocidad.", "Ideal para sesiones diarias de construcción."],
  ["Ollama / LM Studio", "Entrada cómoda a modelos locales y pruebas rápidas.", "Ideal para prototipos, demos y aprendizaje."],
  ["llama.cpp / MLX", "Control de inferencia local, cuantización, Apple Silicon y benchmarking.", "Ideal para medir y entender límites reales."],
  ["vLLM / SGLang", "Serving, batching, KV cache y concurrencia.", "Ideal cuando hay usuarios simultáneos y latencia medible."]
];

const workflows = [
  {
    title: "De idea a MVP",
    steps: "Lovable o Codex para prototipo, OpenRouter para modelos, PostHog para medición, Stripe si hay pago."
  },
  {
    title: "De repo a producto",
    steps: "Codex o Claude Code, tests obligatorios, PRs pequeños, checklist de seguridad y despliegue Vercel."
  },
  {
    title: "De demo local a servicio",
    steps: "Ollama/llama.cpp para laboratorio, benchmarks, vLLM/SGLang si hay concurrencia, observabilidad."
  },
  {
    title: "De contenido a radar",
    steps: "RSS/GitHub/Hugging Face/X/Reddit, clasificación, resumen editorial, fuente y acción sugerida."
  }
];

export default function HerramientasIaPage() {
  const toolArticles = articles.filter((article) => article.section === "Herramientas");
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Herramientas IA</div>
            <h1>Qué usar para construir, medir y vender productos con IA</h1>
            <p className="section-lead">
              Un mapa práctico de IDEs IA, agentes de código, APIs de modelos, runtimes locales y servidores de inferencia.
            </p>
          </div>
          <Link className="button primary" href="/ideas/">Ver ideas</Link>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="decision-table" role="table" aria-label="Herramientas IA">
          <div role="row"><strong>Herramienta</strong><strong>Qué aporta</strong><strong>Cuándo usarla</strong></div>
          {tools.map(([name, value, when]) => (
            <div role="row" key={name}>
              <span>{name}</span>
              <span>{value}</span>
              <span>{when}</span>
            </div>
          ))}
        </div>
      </section>

      {toolArticles.length ? (
        <section className="section shell compact-section">
          <div className="section-header">
            <div>
              <div className="eyebrow">Análisis</div>
              <h2>Elegir herramienta según la fase</h2>
            </div>
          </div>
          <div className="article-grid">
            {toolArticles.map((article) => (
              <Link className="editorial-card" href={`/articulos/${article.slug}/`} key={article.slug}>
                <span>{article.section}</span>
                <h2>{article.title}</h2>
                <p>{article.deck}</p>
                <strong>{article.verdict}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Workflows</div>
            <h2>Combinaciones que sí tienen sentido</h2>
          </div>
        </div>
        <div className="article-grid">
          {workflows.map((workflow) => (
            <article className="editorial-card" key={workflow.title}>
              <span>Workflow</span>
              <h2>{workflow.title}</h2>
              <p>{workflow.steps}</p>
              <strong>Salida esperada: algo probado, medido y fácil de enseñar.</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
