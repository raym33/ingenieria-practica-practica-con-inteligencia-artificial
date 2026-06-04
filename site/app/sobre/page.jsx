import Link from "next/link";

export const metadata = {
  title: "Sobre la revista | De preguntar a construir"
};

const principles = [
  ["Criterio antes que hype", "Una novedad no entra por sonar grande: entra si ayuda a comprar, probar, construir o evitar un error."],
  ["Fuentes visibles", "Los artículos editoriales incluyen fuentes al final y separan señales, opinión, guía y verificación."],
  ["Pruebas cuando importan", "Hardware, modelos y runtimes deben medirse con TTFT, contexto, memoria, calidad y límites, no solo tokens/s."],
  ["Independencia editorial", "Las recomendaciones deben poder cambiar cuando aparezcan datos mejores. Si hay afiliación o patrocinio, debe declararse."],
  ["Lenguaje práctico", "La revista está escrita para builders, programadores, consultores IA y pymes técnicas que necesitan decidir."],
  ["Memoria histórica", "Las ediciones conservan el estado editorial de cada número para que lo antiguo no se pierda."]
];

const covers = [
  "Modelos locales, GGUF, MLX, Ollama, LM Studio, llama.cpp, vLLM y SGLang.",
  "Hardware para inferencia: Apple Silicon, NVIDIA RTX, AMD Strix Halo, Copilot+ PC, workstations y mini PCs.",
  "RAG, agentes, tool calling, observabilidad, evaluación, costes y despliegue.",
  "Herramientas para construir: Codex, Claude Code, Cursor, Lovable, OpenRouter y stacks SaaS.",
  "Señales de Hugging Face, GitHub, Reddit, X via Grok, papers, fabricantes y documentación oficial."
];

const avoids = [
  "Rankings sin metodología.",
  "Prometer que una NPU convierte un portátil en servidor LLM.",
  "Copiar enlaces sin redactar contexto útil.",
  "Publicar benchmarks sin modelo, runtime, hardware y parámetros.",
  "Confundir una demo bonita con un producto operable."
];

export default function SobrePage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Sobre la revista</div>
            <h1>IA aplicada, hardware real y productos que se pueden construir</h1>
            <p className="section-lead">
              De preguntar a construir es una revista viva y un libro en evolución sobre ingeniería práctica con inteligencia artificial.
              Un magazine independiente con foco en builders que quieren criterio técnico sin humo.
            </p>
          </div>
          <Link className="button primary" href="/ediciones/">Ver ediciones</Link>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="front-grid">
          <div>
            <div className="section-header">
              <div>
                <div className="eyebrow">Promesa editorial</div>
                <h2>Comprar, probar y construir IA con más claridad</h2>
              </div>
            </div>
            <div className="article-grid">
              {principles.map(([title, text]) => (
                <article className="editorial-card" key={title}>
                  <span>Criterio</span>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="side-rail">
            <div className="panel-heading"><span>Contacto</span></div>
            <p className="check-row">Edición: Redacción</p>
            <p className="check-row">Email: learntouseai@gmail.com</p>
            <Link className="button primary full-button" href="/newsletter/">Recibir newsletter</Link>
          </aside>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Cobertura</div>
            <h2>Qué cubrimos y qué evitamos</h2>
          </div>
        </div>
        <div className="decision-table" role="table" aria-label="Cobertura editorial">
          <div role="row"><strong>Cubrimos</strong><strong>Evitamos</strong></div>
          {covers.map((cover, index) => (
            <div role="row" key={cover}>
              <span>{cover}</span>
              <span>{avoids[index] || "Contenido sin utilidad práctica para el lector."}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
