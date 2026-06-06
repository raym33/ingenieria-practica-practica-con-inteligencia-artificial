import Link from "next/link";

export const metadata = {
  title: "Empieza aquí | De preguntar a construir",
  description: "Cuatro rutas guiadas para no perderte: aprender IA aplicada, comprar hardware, crear un SaaS con IA o montar IA local en tu pyme."
};

const paths = [
  {
    eyebrow: "Ruta 01",
    title: "Quiero aprender IA aplicada",
    lead: "Del modelo a producción, sin saltarte los cimientos.",
    steps: [
      ["LLMs para ingenieros ocupados", "/leer/05-capitulo-4-llms-para-ingenieros-ocupados/"],
      ["Cómo elegir un modelo", "/leer/06-capitulo-5-como-elegir-un-modelo/"],
      ["Qué problema resuelve RAG", "/leer/17-capitulo-16-que-problema-resuelve-rag/"],
      ["Arquitecturas agénticas", "/leer/28-capitulo-27-arquitecturas-agenticas/"],
      ["Evaluación de sistemas IA", "/leer/32-capitulo-31-evaluacion-de-sistemas-ia/"]
    ],
    more: ["Seguir en Aprender", "/aprender/"]
  },
  {
    eyebrow: "Ruta 02",
    title: "Quiero comprar hardware",
    lead: "Decidir por memoria, runtime y coste real, no por la etiqueta.",
    steps: [
      ["Hardware real para IA local", "/leer/09-capitulo-8-hardware-real-para-ia-local/"],
      ["Apple Silicon vs NVIDIA", "/articulos/apple-silicon-vs-nvidia-inferencia-local/"],
      ["Copilot+ PC no es una workstation LLM", "/articulos/copilot-pc-no-es-workstation-llm/"],
      ["Gemma 4 12B: cuánto rinde en cada hardware", "/articulos/gemma-4-12b-cuanto-rinde-en-cada-hardware/"],
      ["El Comparador", "/comparar/"]
    ],
    more: ["Seguir en Decidir", "/decidir/"]
  },
  {
    eyebrow: "Ruta 03",
    title: "Quiero crear un SaaS con IA",
    lead: "De la idea al producto, midiendo coste por respuesta válida.",
    steps: [
      ["De idea a SaaS con IA", "/articulos/de-idea-a-saas-ia-con-agentes/"],
      ["Benchmarks: qué medir para no engañarte", "/articulos/benchmarks-llm-que-medir/"],
      ["RAG en producción: tres fugas de coste", "/articulos/rag-produccion-tres-fugas-coste-reales/"],
      ["Patrones de SaaS con IA", "/saas-ia/"],
      ["Herramientas para construir", "/herramientas-ia/"]
    ],
    more: ["Seguir en Construir", "/construir/"]
  },
  {
    eyebrow: "Ruta 04",
    title: "Quiero montar IA local en mi pyme",
    lead: "Automatizar con modelos open-source y datos en casa.",
    steps: [
      ["IA local para pymes: qué medir antes de automatizar", "/articulos/ia-local-pymes-que-medir-antes-de-automatizar/"],
      ["¿Servidor propio, alquilado o nube?", "/articulos/servidor-propio-alquilado-nube-ia-local-pyme/"],
      ["Arquitectura híbrida local + nube", "/articulos/arquitectura-hibrida-local-nube-ia-empresa/"],
      ["Gemma 4 12B por hardware (mediciones)", "/articulos/gemma-4-12b-cuanto-rinde-en-cada-hardware/"],
      ["Seguridad de agentes en Claude Code", "/articulos/claude-code-seguridad-guia-anthropic-agentes/"]
    ],
    more: ["Seguir en Empresa", "/empresa/"]
  }
];

export default function EmpiezaAquiPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Empieza aquí</div>
            <h1>¿Por dónde entras?</h1>
            <p className="section-lead">
              Hay mucho aquí dentro —guía de conceptos, radar, guías, mediciones—. Elige tu objetivo y te damos
              una ruta ordenada para no perderte. Cada paso es contenido real que puedes leer hoy.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="article-grid">
          {paths.map((path) => (
            <article className="editorial-card start-path" key={path.title}>
              <span>{path.eyebrow}</span>
              <h2>{path.title}</h2>
              <p>{path.lead}</p>
              <ol className="start-steps">
                {path.steps.map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ol>
              <Link className="text-link" href={path.more[1]}>{path.more[0]} →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
