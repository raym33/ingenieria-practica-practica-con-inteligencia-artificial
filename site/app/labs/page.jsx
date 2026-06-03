import Link from "next/link";

export const metadata = {
  title: "Labs | De preguntar a construir"
};

const labs = [
  {
    title: "Meta-evaluación de jueces LLM",
    path: "labs/meta-evaluation/",
    chapter: "Capítulo 31",
    href: "/leer/32-capitulo-31-evaluacion-de-sistemas-ia/",
    command: "python3 labs/meta-evaluation/meta_eval_judge.py",
    summary: "Comprueba si un juez detecta degradaciones controladas antes de confiar en sus notas."
  },
  {
    title: "Evaluación de retrieval RAG",
    path: "labs/rag-retrieval-eval/",
    chapter: "Capítulos 18-19",
    href: "/leer/20-capitulo-19-rag-avanzado/",
    command: "python3 labs/rag-retrieval-eval/retrieval_eval.py",
    summary: "Mide Recall@K, MRR y fugas de permisos antes de culpar al modelo generador."
  },
  {
    title: "Benchmark local con Ollama",
    path: "labs/local-model-benchmark/",
    chapter: "Capítulos 7-8",
    href: "/leer/09-capitulo-8-hardware-real-para-ia-local/",
    command: "python3 labs/local-model-benchmark/benchmark_ollama.py --model llama3.2",
    summary: "Crea fichas reproducibles de modelo, runtime, latencia, tokens/s y límites de tu hardware."
  },
  {
    title: "Simulador de costes LLM",
    path: "labs/llm-cost-profiler/",
    chapter: "Capítulo 34",
    href: "/leer/35-capitulo-34-costes-latencia-y-rendimiento/",
    command: "python3 labs/llm-cost-profiler/cost_profiler.py",
    summary: "Simula call depth, contexto inflado, retries, caché y routing para entender la factura real."
  }
];

const nextLabs = [
  "trace-dashboard",
  "cost-latency-router",
  "tool-call-eval",
  "prompt-regression",
  "release-manifest",
  "code-agent-governance"
];

export default function LabsPage() {
  return (
    <main>
      <section className="section shell">
        <div className="section-header">
          <div>
            <div className="eyebrow">Banco de pruebas</div>
            <h1>Labs ejecutables para aprender midiendo</h1>
            <p className="section-lead">
              Cada lab aísla una decisión de ingeniería: retrieval, evaluación, coste, latencia, modelos locales o gobernanza.
              La regla es sencilla: si una técnica importa, debe poder probarse.
            </p>
          </div>
          <Link className="button primary" href="/leer/31-capitulo-30-laboratorio-de-implementacion/">Leer capítulo laboratorio</Link>
        </div>

        <div className="lab-grid">
          {labs.map((lab) => (
            <article className="lab-card" key={lab.path}>
              <div>
                <span className="lab-path">{lab.path}</span>
                <h2>{lab.title}</h2>
                <p>{lab.summary}</p>
              </div>
              <pre><code>{lab.command}</code></pre>
              <div className="meta-row">
                <Link href={lab.href}>{lab.chapter}</Link>
                <span>Ejecutable local</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Siguientes pruebas</div>
            <h2>Labs que harán el proyecto más útil</h2>
          </div>
          <Link className="text-link" href="/radar/">Ver señales que los alimentan</Link>
        </div>
        <div className="topic-cloud">
          {nextLabs.map((lab) => <span key={lab}>{lab}</span>)}
        </div>
      </section>
    </main>
  );
}
