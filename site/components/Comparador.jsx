"use client";

import { useMemo, useState } from "react";

export function Comparador({ comparativa }) {
  const initial = comparativa.opciones.slice(0, 2).map((opcion) => opcion.nombre);
  const [activeNames, setActiveNames] = useState(initial);

  const activeOptions = useMemo(
    () => comparativa.opciones.filter((opcion) => activeNames.includes(opcion.nombre)),
    [activeNames, comparativa.opciones]
  );

  function toggleOption(nombre) {
    setActiveNames((current) => {
      if (current.includes(nombre)) {
        return current.length <= 2 ? current : current.filter((item) => item !== nombre);
      }
      return [...current, nombre];
    });
  }

  return (
    <article className="comparador-panel">
      <div className="comparador-header">
        <div className="eyebrow">{comparativa.eyebrow}</div>
        <h2>{comparativa.title}</h2>
        <p>{comparativa.deck}</p>
      </div>

      <div className="topic-cloud comparador-options" aria-label={`Opciones para ${comparativa.title}`}>
        {comparativa.opciones.map((opcion) => {
          const active = activeNames.includes(opcion.nombre);
          return (
            <button
              className={active ? "active-chip" : ""}
              type="button"
              aria-pressed={active}
              onClick={() => toggleOption(opcion.nombre)}
              key={opcion.nombre}
            >
              {opcion.nombre}
            </button>
          );
        })}
      </div>

      <div className="comparador-table" style={{ "--comparador-cols": activeOptions.length }}>
        <div className="comparador-row comparador-row-head">
          <strong>Criterio</strong>
          {activeOptions.map((opcion) => (
            <strong key={opcion.nombre}>
              {opcion.nombre}
              <span>{opcion.etiqueta}</span>
            </strong>
          ))}
        </div>
        {comparativa.ejes.map((eje) => {
          const values = activeOptions.map((opcion) => opcion.valores[eje.key] || "No especificado");
          const isDifferent = new Set(values).size > 1;
          return (
            <div className={`comparador-row ${isDifferent ? "comparador-row-diff" : ""}`} key={eje.key}>
              <span>{eje.label}</span>
              {activeOptions.map((opcion) => (
                <p key={opcion.nombre}>{opcion.valores[eje.key] || "No especificado"}</p>
              ))}
            </div>
          );
        })}
      </div>

      <div className="comparador-fit-grid">
        {activeOptions.map((opcion) => (
          <section className="editorial-card comparador-fit" key={opcion.nombre}>
            <span>{opcion.etiqueta}</span>
            <h3>{opcion.nombre}</h3>
            <strong>Ideal para</strong>
            <p>{opcion.ideal}</p>
            <strong>Evita si</strong>
            <p>{opcion.evitar}</p>
          </section>
        ))}
      </div>

      <div className="article-verdict">{comparativa.veredicto}</div>

      <section className="comparador-decision">
        <h3>Cómo decidir</h3>
        <ul>
          {comparativa.comoDecidir.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="source-box comparador-sources">
        <h3>Fuentes</h3>
        {comparativa.fuentes.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </section>
    </article>
  );
}
