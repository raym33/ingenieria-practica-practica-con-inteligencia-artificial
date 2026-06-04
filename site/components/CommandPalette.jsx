"use client";

import { useEffect, useMemo, useRef, useState } from "react";

let cachedEntries = null;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState(cachedEntries || []);
  const inputRef = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 0);
    if (cachedEntries) return;

    fetch("/data/search.json")
      .then((response) => response.json())
      .then((data) => {
        cachedEntries = Array.isArray(data) ? data : [];
        setEntries(cachedEntries);
      })
      .catch(() => setEntries([]));
  }, [open]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const source = entries || [];
    if (!term) return source.slice(0, 12);
    return source.filter((entry) => {
      const haystack = `${entry.title || ""} ${entry.text || ""} ${(entry.tags || []).join(" ")}`.toLowerCase();
      return haystack.includes(term);
    }).slice(0, 12);
  }, [entries, query]);

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onMouseDown={() => setOpen(false)}>
      <div
        className="cmdk-panel"
        role="dialog"
        aria-label="Buscar en la revista"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="cmdk-input"
          type="search"
          placeholder="Buscar artículos, capítulos, fichas..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="cmdk-results">
          {results.map((entry) => (
            <button type="button" key={`${entry.href}-${entry.title}`} onClick={() => { window.location.href = entry.href; }}>
              <span>{entry.type}</span>
              <strong>{entry.title}</strong>
              <small>{entry.summary}</small>
            </button>
          ))}
          {results.length === 0 ? <p>No hay resultados.</p> : null}
        </div>
      </div>
    </div>
  );
}
