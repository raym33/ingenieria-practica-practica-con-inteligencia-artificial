export const metadata = {
  title: "Stack IA local | De preguntar a construir"
};

const layers = [
  ["Hardware", "Mac, RTX, AMD, mini PC o servidor. Decide por RAM/VRAM, consumo, ruido, soporte y caso de uso."],
  ["Runtime", "Ollama para empezar, llama.cpp para control, MLX para Apple Silicon, vLLM/SGLang para serving."],
  ["Interfaz", "Open WebUI, LM Studio, Jan o UI propia. La interfaz decide adopción interna más que el modelo."],
  ["RAG", "Embeddings, chunking, búsqueda híbrida, permisos y evaluación. No lo resuelve solo el LLM."],
  ["Red privada", "Tailscale/VPN, reverse proxy y firewall. Ollama y dashboards no deben quedar abiertos sin control."],
  ["Observabilidad", "TTFT, tokens/s, RAM/VRAM, errores, prompts, coste humano y calidad por tarea."]
];

const stacks = [
  {
    title: "Laboratorio personal Mac",
    hardware: "MacBook/Mac mini/Mac Studio con memoria unificada suficiente",
    software: "MLX, llama.cpp, Ollama, Open WebUI",
    use: "Probar modelos, RAG pequeño, agentes personales, coding local",
    limit: "Serving multiusuario y CUDA no son su terreno natural"
  },
  {
    title: "PC RTX builder",
    hardware: "RTX 3060/4060 Ti/4090/RTX PRO según presupuesto",
    software: "Ollama, llama.cpp CUDA, LM Studio, vLLM si hay VRAM",
    use: "Modelos locales, benchmarks, imagen, desarrollo IA",
    limit: "VRAM manda; contexto largo y modelos grandes se comen memoria"
  },
  {
    title: "AMD value lab",
    hardware: "RX 6800/7800/7900, eGPU o workstation Linux",
    software: "ROCm, Vulkan, llama.cpp, Open WebUI",
    use: "Inferencia local coste/rendimiento si aceptas ajustar drivers",
    limit: "Más fricción que NVIDIA/Apple; probar backend es obligatorio"
  },
  {
    title: "PYME privada",
    hardware: "Mini servidor, NAS o workstation dedicada",
    software: "Ollama/llama.cpp, pgvector/Qdrant, Open WebUI, Tailscale",
    use: "RAG de documentos, soporte interno, automatizaciones",
    limit: "Permisos, backups, logs y seguridad pesan más que tokens/s"
  }
];

export default function StackLocalPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Stack IA local</div>
            <h1>Cómo montar IA local sin comprar piezas al azar</h1>
            <p className="section-lead">
              Una guía editorial para pasar de “tengo Ollama instalado” a un sistema local útil: hardware, runtime, interfaz, RAG, red privada y métricas.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="metric-strip">
          {layers.map(([name, text]) => (
            <article key={name}>
              <strong>{name}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="article-grid">
          {stacks.map((stack) => (
            <article className="editorial-card" key={stack.title}>
              <span>{stack.hardware}</span>
              <h2>{stack.title}</h2>
              <p><strong>Software:</strong> {stack.software}</p>
              <p><strong>Uso:</strong> {stack.use}</p>
              <strong>{stack.limit}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
