import Link from "next/link";
import { getAllTags } from "../../lib/tags";

export const metadata = {
  title: "Temas | De preguntar a construir"
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Temas</div>
            <h1>Explora la revista por etiquetas</h1>
            <p className="section-lead">Un vocabulario controlado para encontrar artículos por hardware, runtimes, compra, seguridad y construcción.</p>
          </div>
        </div>
      </section>
      <section className="section shell compact-section">
        <div className="topic-cloud tags-cloud">
          {tags.map((tag) => (
            <Link className="tag-topic" href={`/tags/${tag.slug}/`} key={tag.slug}>
              <span>{tag.name}</span>
              <strong>{tag.count}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
