"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export function ChapterSearch({ chapters }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return chapters
      .map((chapter) => {
        const haystack = `${chapter.title} ${chapter.excerpt} ${chapter.searchText}`.toLowerCase();
        const index = haystack.indexOf(q);
        return index >= 0 ? { chapter, index } : null;
      })
      .filter(Boolean)
      .slice(0, 8);
  }, [chapters, query]);

  return (
    <div className="search-panel">
      <input
        className="search-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar en el libro"
        aria-label="Buscar en el libro"
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.map(({ chapter }) => (
            <Link className="radar-item" href={`/leer/${chapter.slug}/`} key={chapter.slug}>
              <h3>{chapter.title}</h3>
              <p>{chapter.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

