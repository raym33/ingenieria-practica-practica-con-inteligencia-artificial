import searchItems from "../../public/data/search.json";
import { GlobalSearch } from "../../components/GlobalSearch";

export const metadata = {
  title: "Buscar | De preguntar a construir"
};

export default function BuscarPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Buscar</div>
            <h1>Encuentra artículos, capítulos, modelos y señales</h1>
            <p className="section-lead">
              Busca por hardware, modelo, runtime, herramienta o problema: RTX, MLX, Ollama, RAG,
              Codex, Claude Code, Strix Halo, vLLM, benchmarks o SaaS.
            </p>
          </div>
        </div>
        <GlobalSearch items={searchItems} />
      </section>
    </main>
  );
}
