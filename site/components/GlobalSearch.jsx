"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const clean = (value) => String(value || "").toLowerCase();

export function GlobalSearch({ items }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const topTags = useMemo(() => {
    const counts = new Map();
    for (const item of items) {
      for (const tag of item.tags || []) {
        const cleanTag = String(tag).replace(/-/g, " ");
        if (cleanTag.length < 2 || cleanTag.length > 28) continue;
        counts.set(cleanTag, (counts.get(cleanTag) || 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 18)
      .map(([tag]) => tag);
  }, [items]);

  const results = useMemo(() => {
    const q = clean(query.trim());
    const tag = clean(activeTag);
    if (!q && !tag) return items.slice(0, 18);

    return items
      .map((item) => {
        const haystack = clean(`${item.title} ${item.summary} ${item.text} ${(item.tags || []).join(" ")}`);
        const tagMatch = !tag || clean((item.tags || []).join(" ")).includes(tag.replace(/\s+/g, "-")) || clean((item.tags || []).join(" ")).includes(tag);
        if (!tagMatch) return null;
        if (!q) return { item, score: 1 };
        const titleHit = clean(item.title).includes(q) ? 8 : 0;
        const summaryHit = clean(item.summary).includes(q) ? 4 : 0;
        const tagHit = clean((item.tags || []).join(" ")).includes(q) ? 5 : 0;
        const textHit = haystack.includes(q) ? 1 : 0;
        const score = titleHit + summaryHit + tagHit + textHit;
        return score ? { item, score } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30)
      .map(({ item }) => item);
  }, [activeTag, items, query]);

  return (
    <div className="search-panel global-search">
      <div className="search-box">
        <input
          className="search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar RTX, MLX, Ollama, RAG, Codex, Strix Halo..."
          aria-label="Buscar en la web"
        />
        {(query || activeTag) ? <button type="button" onClick={() => { setQuery(""); setActiveTag(""); }}>Limpiar</button> : null}
      </div>
      <div className="topic-cloud">
        {topTags.map((tag) => (
          <button
            className={activeTag === tag ? "active-chip" : ""}
            type="button"
            onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
            key={tag}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="search-results">
        {results.map((item) => (
          <Link className="search-result-card" href={item.href} key={`${item.type}-${item.href}-${item.title}`}>
            <span>{item.type}</span>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div>{(item.tags || []).slice(0, 6).map((tag) => <small key={tag}>{String(tag).replace(/-/g, " ")}</small>)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
