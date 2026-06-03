import Link from "next/link";

export const metadata = {
  title: "Rutas de estudio | De preguntar a construir"
};

const routes = [
  {
    title: "Mapa completo",
    description: "Para entender cómo pasar de usar IA a construir sistemas con IA.",
    chapters: [
      ["Prefacio", "/leer/00-prefacio-de-preguntar-a-construir/"],
      ["Introducción", "/leer/01-introduccion-la-nueva-ingenieria-con-ia/"],
      ["Capítulo 1", "/leer/02-capitulo-1-el-camino-real-de-chatgpt-a-sistemas-ia/"],
      ["Capítulo 2", "/leer/03-capitulo-2-que-se-puede-crear-hoy-con-ia/"],
      ["Capítulo 3", "/leer/04-capitulo-3-la-diferencia-entre-jugar-con-ia-y-construir-con-ia/"]
    ]
  },
  {
    title: "Modelos y hardware",
    description: "Para decidir entre APIs, modelos locales, hardware propio y arquitecturas híbridas.",
    chapters: [
      ["Capítulo 4", "/leer/05-capitulo-4-llms-para-ingenieros-ocupados/"],
      ["Capítulo 5", "/leer/06-capitulo-5-como-elegir-un-modelo/"],
      ["Capítulo 6", "/leer/07-capitulo-6-modelos-propietarios/"],
      ["Capítulo 7", "/leer/08-capitulo-7-modelos-locales/"],
      ["Capítulo 8", "/leer/09-capitulo-8-hardware-real-para-ia-local/"]
    ]
  },
  {
    title: "RAG y conocimiento",
    description: "Para crear sistemas que recuperan documentos, citan fuentes y responden con contexto.",
    chapters: [
      ["Capítulo 16", "/leer/17-capitulo-16-que-problema-resuelve-rag/"],
      ["Capítulo 17", "/leer/18-capitulo-17-arquitectura-rag-basica/"],
      ["Capítulo 18", "/leer/19-capitulo-18-problemas-reales-en-rag/"],
      ["Capítulo 19", "/leer/20-capitulo-19-rag-avanzado/"],
      ["Capítulo 20", "/leer/21-capitulo-20-herramientas-rag/"]
    ]
  },
  {
    title: "Chatbots, copilotos y agentes",
    description: "Para distinguir interfaces conversacionales, copilotos, agentes, memoria, voz, tools, function calling y MCP.",
    chapters: [
      ["Capítulo 21", "/leer/22-capitulo-21-chatbots-modernos/"],
      ["Capítulo 22", "/leer/23-capitulo-22-chatbots-para-soporte/"],
      ["Capítulo 23", "/leer/24-capitulo-23-diferencia-entre-chatbot-copiloto-y-agente/"],
      ["Capítulo 24", "/leer/25-capitulo-24-que-es-un-agente-de-ia/"],
      ["Capítulo 25", "/leer/26-capitulo-25-function-calling/"],
      ["Capítulo 26", "/leer/27-capitulo-26-mcp/"],
      ["Capítulo 27", "/leer/28-capitulo-27-arquitecturas-agenticas/"],
      ["Capítulo 28", "/leer/29-capitulo-28-memoria/"],
      ["Capítulo 29", "/leer/30-capitulo-29-agentes-de-voz/"],
      ["Capítulo 30", "/leer/31-capitulo-30-laboratorio-de-implementacion/"]
    ]
  },
  {
    title: "Aplicación práctica",
    description: "Para convertir lectura en proyectos, criterios y checklists de producción.",
    chapters: [
      ["Capítulo 30", "/leer/31-capitulo-30-laboratorio-de-implementacion/"],
      ["Capítulo 31", "/leer/32-capitulo-31-evaluacion-de-sistemas-ia/"],
      ["Capítulo 32", "/leer/33-capitulo-32-observabilidad-y-trazas/"],
      ["Capítulo 33", "/leer/34-capitulo-33-seguridad-prompt-injection-y-abuso/"],
      ["Capítulo 34", "/leer/35-capitulo-34-costes-latencia-y-rendimiento/"],
      ["Capítulo 35", "/leer/36-capitulo-35-datos-privacidad-y-gobernanza/"],
      ["Capítulo 36", "/leer/37-capitulo-36-despliegue-y-operacion/"],
      ["Apéndice A", "/leer/90-apendice-a-rutas-de-lectura/"],
      ["Apéndice B", "/leer/91-apendice-b-proyectos-guiados/"],
      ["Apéndice C", "/leer/92-apendice-c-checklists-de-produccion/"],
      ["Apéndice D", "/leer/93-apendice-d-glosario-operativo/"]
    ]
  },
  {
    title: "Producto, empresa y adopción",
    description: "Para llevar sistemas IA a procesos reales, equipos, clientes y usuarios.",
    chapters: [
      ["Capítulo 37", "/leer/38-capitulo-37-automatizaciones-y-workflows/"],
      ["Capítulo 38", "/leer/39-capitulo-38-integraciones-empresariales/"],
      ["Capítulo 39", "/leer/40-capitulo-39-ui-ux-para-productos-con-ia/"],
      ["Capítulo 40", "/leer/41-capitulo-40-testing-y-calidad/"],
      ["Capítulo 41", "/leer/42-capitulo-41-equipos-roles-y-proceso/"],
      ["Capítulo 42", "/leer/43-capitulo-42-venta-consultoria-e-implantacion/"]
    ]
  },
  {
    title: "Libro vivo y cierre",
    description: "Para mantener el libro actualizado, estudiar con ruta y cerrar el paso de usuario a constructor.",
    chapters: [
      ["Capítulo 43", "/leer/44-capitulo-43-libro-vivo-automatizacion-editorial/"],
      ["Capítulo 44", "/leer/45-capitulo-44-roadmap-de-aprendizaje/"],
      ["Capítulo 45", "/leer/46-capitulo-45-conclusion-de-usuario-a-constructor/"],
      ["Apéndice A", "/leer/90-apendice-a-rutas-de-lectura/"],
      ["Apéndice B", "/leer/91-apendice-b-proyectos-guiados/"],
      ["Apéndice C", "/leer/92-apendice-c-checklists-de-produccion/"]
    ]
  }
];

export default function RutasPage() {
  return (
    <main className="section shell">
      <h1>Rutas de estudio</h1>
      <p className="section-lead">
        El libro puede leerse completo, pero estas rutas ayudan a estudiar según tu objetivo: entender el mapa, elegir modelos, construir RAG, diseñar chatbots o pasar a producción.
      </p>
      <div className="route-grid">
        {routes.map((route) => (
          <section className="route-card" key={route.title}>
            <h2>{route.title}</h2>
            <p>{route.description}</p>
            <ol>
              {route.chapters.map(([label, href]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </main>
  );
}
