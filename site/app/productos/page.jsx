import Link from "next/link";

export const metadata = {
  title: "Productos IA | De preguntar a construir"
};

const articles = [
  {
    label: "Guía de compra",
    title: "Qué portátiles sirven realmente para IA local en 2026",
    summary: "Un portátil Copilot+ con NPU sirve para funciones del sistema, privacidad y batería. Para inferencia LLM seria, el lector debe mirar RAM, VRAM, GPU, memoria unificada y runtime, no solo el sello AI PC.",
    verdict: "Compra por workload: NPU para funciones locales ligeras, RTX o Apple Silicon para modelos, workstation para usuarios concurrentes.",
    sources: ["Microsoft Copilot+ PCs", "Lenovo ThinkPad X9", "Dell Pro Precision"]
  },
  {
    label: "Hardware",
    title: "Apple Silicon vs NVIDIA para modelos locales",
    summary: "Apple gana cuando necesitas mucha memoria unificada, silencio y laboratorio local. NVIDIA gana cuando necesitas ecosistema CUDA, serving, vLLM/SGLang, compatibilidad y máximo throughput.",
    verdict: "Mac Studio es laboratorio compacto; RTX workstation es plataforma de producción técnica.",
    sources: ["Apple Mac Studio", "NVIDIA DGX Spark", "NVIDIA RTX Workstations"]
  },
  {
    label: "Workstations",
    title: "Dell, Lenovo y Corsair: PCs de escritorio para IA práctica",
    summary: "Las workstations con NVIDIA RTX PRO y los equipos de escritorio preparados para NIM/DGX Spark tienen sentido cuando el objetivo no es chatear con un modelo, sino probar agentes, RAG, fine-tuning pequeño, serving local y despliegue edge-to-cloud.",
    verdict: "Merecen la pena si vas a medir, servir o automatizar. Para aprender, un Mac/PC local puede bastar.",
    sources: ["Dell Pro Precision", "Lenovo ThinkPad P1", "Corsair + Origin PC"]
  },
  {
    label: "Dispositivos",
    title: "Samsung, Xiaomi y la IA integrada en móviles",
    summary: "La IA en móviles aporta traducción, edición, resumen, búsqueda visual y asistencia contextual. Es útil para productividad personal, pero no reemplaza una máquina de inferencia ni un stack local de desarrollo.",
    verdict: "Evalúa privacidad, disponibilidad por región y si el flujo puede exportar datos hacia tus herramientas.",
    sources: ["Samsung Galaxy AI", "Samsung on-device AI"]
  },
  {
    label: "Seguridad",
    title: "Ollama no debe exponerse como si fuera una API SaaS cualquiera",
    summary: "CVE-2026-7482 recuerda que un servidor local de modelos también es infraestructura sensible. Si Ollama queda expuesto, una vulnerabilidad en la carga GGUF puede acabar filtrando memoria de proceso: prompts, variables de entorno, claves o contexto.",
    verdict: "Actualiza a 0.17.1 o posterior, no expongas endpoints de gestión sin autenticación y pon firewall/reverse proxy.",
    sources: ["NVD CVE-2026-7482", "SentinelOne", "IONIX"]
  },
  {
    label: "Caso de negocio",
    title: "Clusters Apple: prometedores, pero hay que separar señal de prueba auditada",
    summary: "X trae casos llamativos de Mac Studio y Mac mini usados como clusters de inferencia rentable. Son útiles como radar, pero antes de recomendarlos hay que pedir factura, modelo, concurrencia, consumo, latencia, software de clustering y coste de operación.",
    verdict: "Publicable como tendencia; no como recomendación de compra hasta tener benchmark reproducible.",
    sources: ["Posts de X curados", "Reddit Lab pendiente"]
  }
];

const products = [
  ["Microsoft Copilot+ PC", "NPU 40+ TOPS", "IA local de sistema, traducción, imagen, SLMs pequeños", "No es lo mismo que correr LLMs grandes."],
  ["NVIDIA DGX Spark", "128 GB memoria unificada", "Prototipo, fine-tuning y despliegue local de modelos grandes", "Precio, disponibilidad y stack más técnico."],
  ["Dell Pro Precision + RTX PRO", "GPU NVIDIA RTX PRO", "AI development, inferencia local, edge-to-cloud", "Configurar bien VRAM, drivers y workloads."],
  ["Lenovo ThinkPad AI PC", "NPU hasta 45-48 TOPS según gama", "Movilidad, Copilot+, tareas locales ligeras", "Para LLMs manda RAM/GPU más que etiqueta AI."],
  ["Apple Mac Studio", "Memoria unificada alta", "MLX, llama.cpp, RAG local, laboratorio silencioso", "No es servidor CUDA multiusuario."],
  ["Samsung Galaxy AI", "IA integrada en dispositivo/ecosistema", "Productividad, traducción, notas, cámara", "Funciones varían por región, modelo y versión."]
];

const sources = [
  ["Microsoft Copilot+ PCs", "https://learn.microsoft.com/en-us/windows/ai/npu-devices/"],
  ["NVIDIA DGX Spark", "https://docs.nvidia.com/dgx/dgx-spark/hardware.html"],
  ["Dell Pro Precision con NVIDIA RTX PRO", "https://www.dell.com/en-us/lp/nvidia-dell-pro-precision"],
  ["Lenovo ThinkPad X9 Aura Edition", "https://www.lenovo.com/us/en/p/len101t0111"],
  ["Apple Mac Studio", "https://www.apple.com/shop/buy-mac/mac-studio/m3-ultra-chip-32-core-cpu-80-core-gpu-96gb-memory-8tb-storage"],
  ["Samsung Galaxy AI", "https://www.samsung.com/galaxy-ai/"],
  ["Corsair/Origin PC + NVIDIA NIM", "https://ir.corsair.com/node/10466/pdf"],
  ["NVD CVE-2026-7482", "https://nvd.nist.gov/vuln/detail/CVE-2026-7482"],
  ["SentinelOne CVE-2026-7482", "https://www.sentinelone.com/vulnerability-database/cve-2026-7482/"],
  ["IONIX CVE-2026-7482", "https://www.ionix.io/threat-center/cve-2026-7482/"]
];

export default function ProductosPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Productos IA</div>
            <h1>Hardware y dispositivos que sí importan para builders</h1>
            <p className="section-lead">
              Análisis editorial de productos relacionados con IA: no por marketing, sino por inferencia, memoria, runtimes, privacidad, coste y casos de uso reales.
            </p>
          </div>
          <Link className="button primary" href="/inferencia/">Ver inferencia</Link>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="article-grid">
          {articles.map((article) => (
            <article className="editorial-card" key={article.title}>
              <span>{article.label}</span>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <strong>{article.verdict}</strong>
              <small>{article.sources.join(" · ")}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Matriz editorial</div>
            <h2>Qué mirar antes de comprar</h2>
          </div>
        </div>
        <div className="decision-table product-table" role="table" aria-label="Matriz de productos IA">
          <div role="row"><strong>Producto</strong><strong>Señal IA</strong><strong>Uso real</strong><strong>Límite</strong></div>
          {products.map(([name, signal, use, limit]) => (
            <div role="row" key={name}>
              <span>{name}</span>
              <span>{signal}</span>
              <span>{use}</span>
              <span>{limit}</span>
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
