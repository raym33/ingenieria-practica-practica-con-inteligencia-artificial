export const metadata = {
  title: "SaaS con IA | De preguntar a construir"
};

const patterns = [
  {
    title: "Copiloto vertical",
    problem: "Un profesional repite búsquedas, resúmenes y borradores en un dominio concreto.",
    mvp: "Login, subida/contexto, chat con citas, exportación y revisión humana.",
    stack: "Next.js, OpenRouter/OpenAI/Claude, RAG, Stripe, PostHog.",
    risk: "Si no hay datos propietarios o workflow real, parece un wrapper."
  },
  {
    title: "Automatización de backoffice",
    problem: "Una pyme procesa emails, documentos, tickets o formularios manualmente.",
    mvp: "Inbox, clasificación, extracción estructurada, aprobación y acción final.",
    stack: "n8n/Temporal, LLM, validación JSON, dashboard, logs.",
    risk: "El coste humano de revisar puede comerse el ahorro."
  },
  {
    title: "Benchmark como producto",
    problem: "Builders no saben qué modelo/runtime/hardware elegir.",
    mvp: "Suite de prompts, runner local/cloud, tabla TTFT/tokens/s/calidad.",
    stack: "CLI, SQLite, Next.js, Ollama/llama.cpp/OpenRouter.",
    risk: "Sin metodología reproducible, se convierte en ranking vacío."
  },
  {
    title: "Agente de investigación",
    problem: "Equipos necesitan seguir papers, GitHub, X, Reddit y productos.",
    mvp: "Ingesta, clasificación, resumen, impacto, fuente y acción sugerida.",
    stack: "RSS, GitHub API, Grok/X manual, Reddit, LLM judge, newsletter.",
    risk: "Demasiadas señales sin curación editorial cansan al lector."
  }
];

const builderTools = [
  ["Codex", "Bueno para trabajar sobre repos, crear apps, editar archivos, correr pruebas y convertir ideas en entregables revisables."],
  ["Claude Code", "Muy fuerte como agente terminal: entiende codebases, usa comandos, MCP y flujos iterativos."],
  ["OpenRouter", "Útil para probar muchos modelos con una API y comparar coste/calidad sin casarte con un proveedor."],
  ["Lovable", "Adecuado para prototipos visuales rápidos si el problema y el flujo están muy bien definidos."],
  ["Cursor/Replit", "Buen entorno diario para iterar producto, UI y features con asistencia integrada."]
];

const sources = [
  ["OpenAI Codex", "https://openai.com/index/introducing-codex/"],
  ["Codex for every role", "https://openai.com/index/codex-for-every-role-tool-workflow/"],
  ["Claude Code docs", "https://docs.anthropic.com/en/docs/claude-code/getting-started"],
  ["Claude Code product", "https://www.anthropic.com/product/claude-code"],
  ["OpenRouter Models API", "https://openrouter.ai/docs/models"]
];

export default function SaasIaPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">SaaS con IA</div>
            <h1>Ideas vendibles, patrones de producto y herramientas para construir</h1>
            <p className="section-lead">
              Una sección para transformar señales técnicas en productos: MVP, stack, riesgo, monetización y prompts iniciales para agentes de código.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="article-grid">
          {patterns.map((pattern) => (
            <article className="idea-card" key={pattern.title}>
              <span>{pattern.problem}</span>
              <h2>{pattern.title}</h2>
              <p><strong>MVP:</strong> {pattern.mvp}</p>
              <p><strong>Stack:</strong> {pattern.stack}</p>
              <p><strong>Riesgo:</strong> {pattern.risk}</p>
              <pre>{`Diseña un MVP para "${pattern.title}". Define usuario, problema, flujo, datos, pantallas, eventos de medición, criterios de aceptación y un primer plan de implementación en 5 pasos.`}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Herramientas builder</div>
            <h2>Qué usar según la fase del producto</h2>
          </div>
        </div>
        <div className="decision-table" role="table" aria-label="Herramientas para construir SaaS IA">
          <div role="row"><strong>Herramienta</strong><strong>Uso editorial</strong></div>
          {builderTools.map(([tool, use]) => (
            <div role="row" key={tool}>
              <span>{tool}</span>
              <span>{use}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="source-box">
          <h2>Fuentes consultadas</h2>
          {sources.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </div>
      </section>
    </main>
  );
}
