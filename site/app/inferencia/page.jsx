import Link from "next/link";
import { articles } from "../../lib/articles";
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

const editorialLeads = [
  {
    label: "Prueba local",
    title: "Gemma 4 12B aterriza como modelo de laboratorio multimodal",
    text: "Las señales de X apuntan a ejecuciones reproducibles en RTX 4060, Mac con Metal y M4 Max. La noticia no es solo el modelo: es que los builders ya publican comandos, memoria, tokens/s y límites de contexto."
  },
  {
    label: "AMD",
    title: "Vulkan y ROCm vuelven a ser una decisión práctica",
    text: "Los posts recientes muestran RX 7800 XT, RX 7900 XTX y RX 7700 con números distintos según backend. En AMD, el runtime puede cambiar más la experiencia que la ficha técnica."
  },
  {
    label: "Serving",
    title: "TTFT y goodput entran en portada",
    text: "Señales alrededor de SGLang, vLLM y allocators como mooncake recuerdan que producción no va de tokens/s aislados: va de colas, KV cache, p95 y throughput útil."
  },
  {
    label: "Seguridad",
    title: "Ollama expuesto deja de ser laboratorio y pasa a ser superficie de ataque",
    text: "CVE-2026-7482 confirma que la inferencia local también necesita hardening: versión actualizada, localhost por defecto, autenticación, firewall y cuidado con endpoints de creación/push de modelos."
  }
];

const trends = [
  ["Gemma 4 12B multimodal", "Noticia + guía", "Calidad real de visión/audio, estabilidad GGUF/MLX y TTFT en contexto largo."],
  ["AMD Strix Halo", "Radar + guía", "Soporte mainline, NPU utilizable y particionado de memoria."],
  ["MLX + mlx-vlm", "Guía + comparativa", "Paridad de calidad frente a GGUF y escalabilidad de contexto."],
  ["vLLM / SGLang", "Guía de despliegue", "Ganancias reales con el hardware objetivo y compatibilidad con quants recientes."],
  ["MTP y speculative decoding", "Guía de flags", "Impacto en calidad, contexto largo y backends no CUDA."],
  ["KV cache quant/compress", "Guía práctica", "Pérdida de calidad, estabilidad y efecto en TTFT."],
  ["llama-server", "Comparativa", "Versiones recientes, diferencias por backend y facilidad de integración."],
  ["AMD RX 7000", "Comparativa", "ROCm frente a Vulkan, drivers y rendimiento sostenido."],
  ["Apple vs AMD vs NVIDIA", "Especial hardware", "Benchmarks con mismo modelo, formato, contexto y tarea."],
  ["TurboQuant", "Radar", "Madurez fuera de QVAC e impacto en calidad/velocidad."]
];

const caveats = [
  ["LM Studio + Gemma 4", "El `mmproj` puede romper la carga; por ahora conviene distinguir texto de multimodal."],
  ["Contexto anunciado", "256K nativo no significa 256K cómodo en GGUF/llama.cpp; pide prueba con memoria y TTFT."],
  ["Tokens/s aislado", "21 t/s puede verse bien mientras el TTFT en prompts reales resulta doloroso."],
  ["Qwen frente a Gemma", "En JSON, F1 o tareas estructuradas un modelo menor puede ganar por mucho."],
  ["Mac 16 GB", "10 GB RSS deja poco margen si también hay IDE, navegador, Docker y servicios locales."],
  ["Strix Halo", "TOPS y memoria unificada no bastan si el runtime no usa NPU o exige particionar memoria."],
  ["MLX long-context", "Los 256K impresionan, pero muchas pruebas viven en Macs de muchísima RAM."],
  ["MTP avanzado", "Puede ser rápido y estable con una receta exacta; otras variantes especulativas fallan."]
];

const fieldNotes = [
  ["RTX 4060 laptop", "Gemma 4 12B puede entrar en 8 GB VRAM con LM Studio, pero 8 t/s es laboratorio móvil, no serving."],
  ["Mac + Metal", "36 tok/s en Gemma 4 12B refuerza Apple Silicon como plataforma cómoda, aunque hay que saber cuantización y memoria real."],
  ["llama.cpp multi-GPU", "La colaboración NVIDIA/llama.cpp alrededor de tensor parallelism apunta a PCs RTX más serios para inferencia local."],
  ["Clusters Apple", "Mac Studio/Mac mini como negocio de inferencia es una señal interesante; falta auditoría de workload, latencia y clientes."],
  ["Ollama CVE", "Actualizar y cerrar exposición externa no es opcional si Ollama toca documentos internos o agentes con credenciales."]
];

export default function InferenciaPage() {
  const radar = getRadarItems();
  const models = getModelItems();
  const inferenceArticles = articles
    .filter((article) => (article.tags || []).includes("Inferencia local"))
    .slice(-6)
    .reverse();
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
            <div className="eyebrow">Briefing editorial</div>
            <h2>Qué merece noticia ahora mismo</h2>
          </div>
          <Link className="text-link" href="/radar/">Ver todas las señales</Link>
        </div>
        <div className="cover-teasers">
          {editorialLeads.map((lead) => (
            <article key={lead.title}>
              <span>{lead.label}</span>
              <h3>{lead.title}</h3>
              <p>{lead.text}</p>
            </article>
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
            <div className="eyebrow">Tendencias con tracción</div>
            <h2>Lo que conviene seguir antes de comprar, migrar o publicar una guía</h2>
          </div>
        </div>
        <div className="trend-grid">
          {trends.map(([title, action, verify]) => (
            <article className="trend-card" key={title}>
              <span>{action}</span>
              <h3>{title}</h3>
              <p>{verify}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Análisis de revista</div>
            <h2>Lecturas para decidir stack de inferencia</h2>
          </div>
          <Link className="text-link" href="/articulos/">Todos los artículos</Link>
        </div>
        <div className="article-grid">
          {inferenceArticles.map((article) => (
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
        <div className="section-header">
          <div>
            <div className="eyebrow">Verificaciones</div>
            <h2>Lo que matiza los benchmarks antes de convertirlos en recomendación</h2>
          </div>
        </div>
        <div className="caveat-grid">
          {caveats.map(([title, text]) => (
            <article className="caveat-card" key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Notas de campo</div>
            <h2>Nuevas señales que merecen prueba o artículo propio</h2>
          </div>
        </div>
        <div className="caveat-grid">
          {fieldNotes.map(([title, text]) => (
            <article className="caveat-card" key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
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
