export const metadata = {
  title: "Ideas para construir | De preguntar a construir"
};

const ideas = [
  {
    title: "RAG privado para despachos pequeños",
    user: "abogados, gestorías, consultores",
    stack: "Next.js, pgvector/Qdrant, OpenRouter, modelo local opcional, Codex o Claude Code",
    mvp: "Subida de documentos, búsqueda semántica, citas, panel de revisión humana.",
    monetization: "Setup inicial + cuota mensual por mantenimiento y hosting."
  },
  {
    title: "Analizador de tickets de soporte",
    user: "SaaS B2B y ecommerce",
    stack: "Helpdesk API, embeddings, clasificador LLM, dashboard, alertas Slack.",
    mvp: "Agrupar tickets, detectar bugs recurrentes, sugerir respuestas y medir SLA.",
    monetization: "SaaS mensual por volumen de tickets."
  },
  {
    title: "Comparador local de modelos",
    user: "builders que prueban Ollama, LM Studio, MLX y llama.cpp",
    stack: "Node/SQLite, runners locales, prompts fijos, export CSV, UI simple.",
    mvp: "Medir TTFT, prefill, decode, RAM/VRAM y calidad subjetiva por tarea.",
    monetization: "Open core + plantillas pro para equipos."
  },
  {
    title: "Agente de preparación de reuniones",
    user: "ventas, consultores, founders",
    stack: "Calendar, CRM, buscador web, RAG privado, Claude/Codex para integración.",
    mvp: "Resumen de cliente, riesgos, preguntas, historial y próxima acción.",
    monetization: "Producto vertical por rol o servicio de implantación."
  },
  {
    title: "Generador de informes para pymes",
    user: "asesorías, inmobiliarias, clínicas, formación",
    stack: "Lovable o Next.js, plantillas DOCX/PDF, OpenRouter, validación humana.",
    mvp: "Formulario + datos + borrador editable + exportación.",
    monetization: "Pago por informe o licencia mensual."
  },
  {
    title: "Monitor de novedades IA para equipos",
    user: "CTOs, consultoras, equipos de producto",
    stack: "RSS, GitHub, Reddit, X vía Grok, clasificador, newsletter.",
    mvp: "Radar por temas, resúmenes, impacto y acciones sugeridas.",
    monetization: "Newsletter premium + dashboard privado."
  },
  {
    title: "Probador de hardware IA para compradores",
    user: "consultores, tiendas técnicas, departamentos IT",
    stack: "Next.js, runner local, Ollama/LM Studio/llama.cpp, export JSON, tabla comparativa.",
    mvp: "Suite de prompts, medición TTFT/decode/RAM, ficha por máquina y recomendación editorial.",
    monetization: "Informes de compra, afiliación responsable o licencia para consultoras."
  },
  {
    title: "Asistente local para compliance documental",
    user: "pymes reguladas, clínicas, academias, asesorías",
    stack: "Foundry Local u Ollama, RAG privado, permisos, auditoría, export DOCX/PDF.",
    mvp: "Responder preguntas con citas, marcar documentos desactualizados y generar checklist.",
    monetization: "Setup + mantenimiento mensual por sector."
  },
  {
    title: "Copiloto de presupuestos técnicos",
    user: "freelancers, estudios web, integradores IA",
    stack: "CRM simple, plantillas, OpenRouter, base de costes, export PDF.",
    mvp: "Convertir notas de cliente en alcance, fases, riesgos, precio y propuesta editable.",
    monetization: "SaaS vertical para consultores o pack de plantillas premium."
  },
  {
    title: "Radar de repos GitHub para equipos IA",
    user: "builders que necesitan seguir frameworks y agentes",
    stack: "GitHub API, estrellas/commits/releases, clasificador LLM, newsletter.",
    mvp: "Detectar repos con tracción, resumir cambios y proponer prueba de 30 minutos.",
    monetization: "Newsletter pro + alertas por stack."
  }
];

export default function IdeasPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Ideas para construir</div>
            <h1>Proyectos implementables con IDEs y agentes de IA</h1>
            <p className="section-lead">
              Ideas pensadas para lectores que usan Codex, Claude Code, Lovable, Cursor, Replit, OpenRouter o herramientas similares. Cada idea busca un problema real, un MVP y una vía de monetización.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="ideas-grid">
          {ideas.map((idea) => (
            <article className="idea-card" key={idea.title}>
              <span>{idea.user}</span>
              <h2>{idea.title}</h2>
              <p><strong>Stack:</strong> {idea.stack}</p>
              <p><strong>MVP:</strong> {idea.mvp}</p>
              <p><strong>Monetización:</strong> {idea.monetization}</p>
              <pre>{`Construye un MVP de "${idea.title}". Primero define usuarios, flujo principal, datos, pantallas y criterios de aceptación. Después implementa una versión simple, medible y lista para probar con usuarios reales.`}</pre>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
