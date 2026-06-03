import Link from "next/link";
import { getModelItems, getRadarItems } from "../../lib/content";

export const metadata = {
  title: "Inferencia IA | De preguntar a construir"
};

const runtimes = [
  {
    name: "Ollama",
    bestFor: "Prototipos, apps internas y pruebas rápidas",
    watch: "Plantilla del modelo, contexto, servidor expuesto y concurrencia.",
    link: "/leer/08-capitulo-7-modelos-locales/"
  },
  {
    name: "LM Studio",
    bestFor: "Exploración visual de modelos y demos locales",
    watch: "Formato descargado, cuantización y API local para integraciones.",
    link: "/leer/08-capitulo-7-modelos-locales/"
  },
  {
    name: "llama.cpp / GGUF",
    bestFor: "Control fino, CPU/GPU local, cuantización y reproducibilidad",
    watch: "Capas offload, batch, contexto y versión exacta del binario.",
    link: "/leer/09-capitulo-8-hardware-real-para-ia-local/"
  },
  {
    name: "MLX",
    bestFor: "Apple Silicon, memoria unificada y laboratorio Mac",
    watch: "Conversión del modelo, memoria disponible y soporte del runtime.",
    link: "/leer/09-capitulo-8-hardware-real-para-ia-local/"
  },
  {
    name: "vLLM / TGI / SGLang",
    bestFor: "Serving, colas, batching y usuarios concurrentes",
    watch: "VRAM, KV cache, scheduler, p95/p99 y coste por request.",
    link: "/leer/35-capitulo-34-costes-latencia-y-rendimiento/"
  }
];

const hardware = [
  ["Mac 24 GB", "Laboratorio personal", "7B/13B cuantizados, RAG pequeño, demos y coding asistido."],
  ["Mac 64 GB+", "Local serio", "Modelos medianos, contexto largo prudente y servicios privados pequeños."],
  ["GPU 12-16 GB", "PC builder", "Modelos 7B/14B cómodos, pruebas de cuantización y generación ligera."],
  ["GPU 24 GB+", "Laboratorio potente", "30B cuantizados, batch moderado y comparativas locales más realistas."],
  ["Servidor NVIDIA", "Producción", "vLLM/TGI/SGLang, concurrencia, observabilidad y control de coste."],
  ["CPU / mini PC", "Edge auxiliar", "Embeddings, automatizaciones, modelos pequeños y servicios de apoyo."]
];

const metrics = [
  ["TTFT", "Tiempo hasta el primer token. Decide si el producto se siente vivo."],
  ["Prefill", "Velocidad procesando prompt y contexto. Sufre cuando metes documentos largos."],
  ["Decode", "Tokens por segundo generados. Importa en respuestas largas y agentes."],
  ["KV cache", "Memoria por contexto y concurrencia. Limita usuarios antes que el peso del modelo."],
  ["p95/p99", "Latencia real para usuarios difíciles, no solo media bonita."],
  ["Coste/request", "Hardware, energía, proveedor, retries y tiempo humano de operación."]
];

export default function InferenciaPage() {
  const radar = getRadarItems();
  const models = getModelItems();
  const inferenceSignals = radar
    .filter((item) => hasAny(item, ["inferencia", "hardware", "modelos-locales", "gguf", "mlx", "cuantizacion"]))
    .slice(0, 8);
  const localModels = models
    .filter((item) => hasAny(item, ["gguf", "mlx", "modelos-locales", "cuantizacion", "inferencia"]))
    .slice(0, 8);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Hardware y software de inferencia</div>
            <h1>Qué ejecutar, dónde ejecutarlo y cómo saber si merece la pena</h1>
            <p className="section-lead">
              Una sección viva para seguir runtimes, modelos locales, cuantización, Apple Silicon, GPUs, servidores de inferencia y métricas reales.
              La pregunta no es qué modelo gana un ranking: es qué stack resuelve tu caso con buena latencia, coste aceptable y límites conocidos.
            </p>
          </div>
          <Link className="button primary" href="/labs/">Ejecutar labs</Link>
        </div>
        <div className="stats">
          <div className="stat"><strong>{localModels.length}</strong><span>modelos locales vigilados</span></div>
          <div className="stat"><strong>{inferenceSignals.length}</strong><span>señales de inferencia</span></div>
          <div className="stat"><strong>6</strong><span>métricas mínimas</span></div>
          <div className="stat"><strong>5</strong><span>familias de runtime</span></div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Decisión rápida</div>
            <h2>Elige runtime por trabajo, no por moda</h2>
          </div>
          <Link className="text-link" href="/leer/08-capitulo-7-modelos-locales/">Leer modelos locales</Link>
        </div>
        <div className="runtime-grid">
          {runtimes.map((runtime) => (
            <Link className="runtime-card" href={runtime.link} key={runtime.name}>
              <span>{runtime.bestFor}</span>
              <h2>{runtime.name}</h2>
              <p>{runtime.watch}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Hardware práctico</div>
            <h2>Qué máquina encaja con cada tipo de inferencia</h2>
          </div>
          <Link className="text-link" href="/leer/09-capitulo-8-hardware-real-para-ia-local/">Guía de hardware</Link>
        </div>
        <div className="decision-table" role="table" aria-label="Matriz de hardware de inferencia">
          <div role="row"><strong>Equipo</strong><strong>Mejor uso</strong><strong>Límite a mirar</strong></div>
          {hardware.map(([machine, use, limit]) => (
            <div role="row" key={machine}>
              <span>{machine}</span>
              <span>{use}</span>
              <span>{limit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Banco de pruebas</div>
            <h2>Mide como producto, no como demo</h2>
          </div>
          <Link className="text-link" href="/leer/35-capitulo-34-costes-latencia-y-rendimiento/">Costes y latencia</Link>
        </div>
        <div className="metric-strip">
          {metrics.map(([name, text]) => (
            <article key={name}>
              <strong>{name}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="front-grid">
          <div>
            <div className="panel-heading"><span>Novedades para probar</span><Link href="/modelos/">Radar de modelos</Link></div>
            <div className="model-grid two-col">
              {localModels.map((item) => <SignalCard item={item} key={item.id || item.url || item.title} />)}
            </div>
          </div>
          <aside className="side-rail">
            <div className="panel-heading"><span>Checklist</span></div>
            {[
              "Anota modelo, formato, cuantización y commit del runtime.",
              "Mide TTFT, tokens/s, p95, RAM/VRAM y consumo con el mismo prompt.",
              "Prueba contexto corto y largo: muchos stacks fallan al crecer el KV cache.",
              "Separa exploración local de serving multiusuario.",
              "Publica una ficha reproducible antes de recomendar hardware."
            ].map((item) => <p className="check-row" key={item}>{item}</p>)}
          </aside>
        </div>
      </section>

      {inferenceSignals.length ? (
        <section className="section shell compact-section">
          <div className="panel-heading"><span>Señales recientes de inferencia</span><Link href="/radar/">Ver radar</Link></div>
          <div className="headline-list split-list">
            {inferenceSignals.map((item) => (
              <a className="headline-item" href={item.url || "/radar/"} key={item.id || item.title}>
                <strong>{item.title}</strong>
                <span>{(item.tags || []).slice(0, 4).join(" · ") || item.sourceName || "Radar"}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function SignalCard({ item }) {
  return (
    <article className="model-card">
      <div className="radar-meta">
        <span>{item.sourceType === "huggingface-model" ? "Hugging Face" : item.sourceName || "Radar"}</span>
        <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("es-ES") : "reciente"}</span>
      </div>
      <h2>{item.title}</h2>
      <p>{formatSummary(item)}</p>
      <div>{(item.tags || []).slice(0, 6).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="meta-row">
        {item.url ? <a href={item.url}>Abrir</a> : <span>Sin URL</span>}
        <span>{item.relevance || "vigilar"}</span>
      </div>
    </article>
  );
}

function hasAny(item, tags) {
  return tags.some((tag) => (item.tags || []).includes(tag));
}

function formatSummary(item) {
  const text = String(item.summary || item.rawSummary || "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[#*_`>~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 220) return text;
  return `${text.slice(0, 220).replace(/\s+\S*$/, "")}...`;
}
