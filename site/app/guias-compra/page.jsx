import Link from "next/link";
import { articles } from "../../lib/articles";

export const metadata = {
  title: "Guías de compra IA | De preguntar a construir"
};

const guides = [
  {
    title: "Portátil para IA local",
    buyer: "developer móvil, consultor, estudiante avanzado",
    buy: "MacBook con memoria suficiente o portátil RTX con 8-16 GB VRAM.",
    avoid: "Comprar solo por la etiqueta AI PC sin mirar RAM, VRAM, cooling y runtime.",
    test: "Gemma/Qwen 7B-14B, contexto 8K-32K, TTFT, temperatura y batería."
  },
  {
    title: "Mac para laboratorio IA",
    buyer: "maker, pyme pequeña, builder local-first",
    buy: "Mac mini/Studio con tanta memoria unificada como puedas justificar.",
    avoid: "Esperar rendimiento CUDA o serving pesado multiusuario sin medir.",
    test: "MLX vs llama.cpp, RAG local, modelo 14B/32B cuantizado y memoria libre con Docker."
  },
  {
    title: "GPU NVIDIA para inferencia",
    buyer: "builder que quiere compatibilidad, CUDA, vLLM o SGLang",
    buy: "Prioriza VRAM y soporte antes que solo TFLOPS. RTX PRO si necesitas memoria y estabilidad.",
    avoid: "12 GB VRAM para modelos/contextos que claramente necesitan más.",
    test: "Prefill, decode, p95, KV cache y concurrencia con tu prompt real."
  },
  {
    title: "AMD para value lab",
    buyer: "usuario técnico dispuesto a ajustar Linux, ROCm o Vulkan",
    buy: "RX 7000 con buena memoria si aceptas probar backends.",
    avoid: "Prometer plug-and-play a clientes sin validar drivers y runtime.",
    test: "ROCm vs Vulkan en mismo modelo, estabilidad y consumo sostenido."
  },
  {
    title: "Workstation para pyme técnica",
    buyer: "consultora, equipo de producto, laboratorio interno",
    buy: "Dell/Lenovo/HP/Corsair con RTX PRO, soporte, garantía y camino de despliegue.",
    avoid: "Comprar servidor caro antes de saber qué usuarios, latencia y datos tienes.",
    test: "RAG privado, Open WebUI, cola de requests, backups, seguridad y logs."
  },
  {
    title: "Móvil o dispositivo con IA",
    buyer: "productividad personal, ventas, creadores de contenido",
    buy: "Si el flujo real es traducción, notas, cámara, búsqueda visual o resumen.",
    avoid: "Confundir IA integrada con capacidad de inferencia LLM local seria.",
    test: "Privacidad, región, idioma, exportación y compatibilidad con tu stack."
  }
];

export default function GuiasCompraPage() {
  const buyingArticles = articles
    .filter((article) => (article.tags || []).includes("Compra"))
    .slice(-8)
    .reverse();

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Guías de compra</div>
            <h1>Comprar hardware IA sin dejarse llevar por la etiqueta</h1>
            <p className="section-lead">
              Recomendaciones editoriales para elegir portátiles, Macs, GPUs, workstations y dispositivos con IA según workloads reales.
            </p>
          </div>
          <Link className="button primary" href="/benchmarks/">Ver benchmarks</Link>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="article-grid">
          {guides.map((guide) => (
            <article className="editorial-card" key={guide.title}>
              <span>{guide.buyer}</span>
              <h2>{guide.title}</h2>
              <p><strong>Compra:</strong> {guide.buy}</p>
              <p><strong>Evita:</strong> {guide.avoid}</p>
              <strong>Prueba mínima: {guide.test}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Lecturas de compra</div>
            <h2>Análisis para decidir hardware y plataforma</h2>
          </div>
          <Link className="text-link" href="/articulos/">Todos los artículos</Link>
        </div>
        <div className="article-grid">
          {buyingArticles.map((article) => (
            <Link className="editorial-card" href={`/articulos/${article.slug}/`} key={article.slug}>
              <span>{article.section}</span>
              <h2>{article.title}</h2>
              <p>{article.deck}</p>
              <strong>{article.verdict}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
