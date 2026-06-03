import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.js";

const chaptersDir = path.join(ROOT, "book/chapters");

const chapters = [
  {
    file: "32-capitulo-31-evaluacion-de-sistemas-ia.md",
    title: "Capítulo 31 — Evaluación de sistemas IA",
    chapter: "32",
    part: "Parte VIII — Producción, seguridad y operación",
    level: "avanzado",
    status: "estable",
    minutes: 48,
    thesis: "La evaluación es la diferencia entre creer que un sistema funciona y saber dónde falla.",
    problem: "Los equipos suelen evaluar sistemas IA leyendo diez respuestas a mano. Eso sirve para una demo, pero no sirve para decidir cambios de modelo, prompts, retrieval, tools o memoria. Sin evaluación, cada mejora es una apuesta.",
    core: [
      "Define una suite pequeña de casos reales antes de optimizar.",
      "Separa evaluación de retrieval, respuesta, tools, seguridad y experiencia.",
      "Mide regresiones cada vez que cambie modelo, prompt, índice o esquema.",
      "Combina evaluación automática con revisión humana en casos de alto riesgo.",
      "No uses una única métrica para decidir calidad."
    ],
    architecture: [
      "dataset de casos versionado",
      "runner de evaluación",
      "modelo o sistema candidato",
      "evaluadores automáticos",
      "muestreo humano",
      "informe de regresión"
    ],
    metrics: [
      "exactitud por tarea",
      "cobertura de respuesta",
      "validez de citas",
      "tasa de abstención correcta",
      "tool call accuracy",
      "unsafe action rate",
      "coste por caso"
    ],
    implementation: "Empieza con cincuenta casos. Diez normales, diez difíciles, diez ambiguos, diez fuera de alcance y diez adversariales. Cada caso debe tener entrada, usuario, permisos, salida esperada, fuentes esperadas y criterios de fallo.",
    checklist: [
      "Existe dataset versionado.",
      "Cada caso tiene criterio de aceptación.",
      "Las pruebas cubren permisos y datos sensibles.",
      "Se mide coste y latencia durante la evaluación.",
      "Hay umbrales mínimos para publicar.",
      "Las regresiones bloquean despliegue.",
      "Los cambios de modelo se comparan contra baseline."
    ],
    antipatterns: [
      "evaluar solo con ejemplos felices",
      "cambiar prompt sin suite de regresión",
      "usar al propio modelo como único juez",
      "medir solo satisfacción subjetiva",
      "olvidar casos de permisos"
    ],
    project: "Crea un archivo `evals/support-rag.jsonl` con cincuenta preguntas reales de soporte. Ejecuta la misma suite con dos modelos, dos prompts y dos configuraciones de retrieval. Publica una tabla con calidad, coste y latencia.",
    future: "La evaluación se moverá hacia suites continuas, trazas reales anonimizadas, jueces especializados y benchmarks internos por dominio. Pero la base seguirá siendo la misma: casos claros, criterios claros y comparación contra baseline."
  },
  {
    file: "33-capitulo-32-observabilidad-y-trazas.md",
    title: "Capítulo 32 — Observabilidad y trazas",
    chapter: "33",
    part: "Parte VIII — Producción, seguridad y operación",
    level: "avanzado",
    status: "estable",
    minutes: 42,
    thesis: "Un sistema IA sin trazas no se puede depurar, auditar ni mejorar con seriedad.",
    problem: "Cuando un usuario dice que la IA respondió mal, necesitas reconstruir qué pasó: prompt, modelo, contexto, tools, memoria, permisos, latencia y coste. Si solo guardas la respuesta final, llegas tarde.",
    core: [
      "Registra eventos de principio a fin, no solo errores.",
      "Separa trazas técnicas de datos sensibles.",
      "Guarda identificadores de fuentes, tools y memoria usada.",
      "Convierte logs en métricas de producto.",
      "Diseña observabilidad desde el MVP."
    ],
    architecture: [
      "request id",
      "span de entrada",
      "span de retrieval",
      "span de modelo",
      "span de tools",
      "span de validación",
      "evento final de usuario"
    ],
    metrics: [
      "latencia p50/p95/p99",
      "tokens por request",
      "coste por feature",
      "errores por tool",
      "respuestas sin fuente",
      "feedback negativo",
      "interacciones escaladas a humano"
    ],
    implementation: "Define un evento `ai_trace` con `request_id`, `user_id`, `feature`, `model`, `prompt_version`, `retrieved_chunks`, `tools_called`, `latency_ms`, `cost_usd`, `error` y `feedback`. Ese evento ya permite operar un primer producto.",
    checklist: [
      "Cada request tiene identificador.",
      "Cada prompt tiene versión.",
      "Cada tool call queda registrada.",
      "Cada fuente recuperada queda identificada.",
      "Los datos sensibles se redactan.",
      "Los errores son estructurados.",
      "Hay panel semanal de calidad, coste y latencia."
    ],
    antipatterns: [
      "guardar prompts completos con datos sensibles",
      "no versionar prompts",
      "no saber qué modelo respondió",
      "registrar solo errores",
      "no conectar feedback con trazas"
    ],
    project: "Construye un panel simple con tres tablas: interacciones recientes, tools fallidas y preguntas sin respuesta. No necesitas una plataforma compleja al principio; una tabla Postgres bien diseñada ya cambia el proyecto.",
    future: "La observabilidad IA tenderá a integrarse con trazas estándar, OpenTelemetry, evaluaciones online y alertas de deriva. Lo importante será mantener una cadena auditable entre usuario, contexto, modelo y acción."
  },
  {
    file: "34-capitulo-33-seguridad-prompt-injection-y-abuso.md",
    title: "Capítulo 33 — Seguridad, prompt injection y abuso",
    chapter: "34",
    part: "Parte VIII — Producción, seguridad y operación",
    level: "avanzado",
    status: "muy cambiante",
    minutes: 50,
    thesis: "La seguridad en IA no consiste en escribir mejores instrucciones, sino en limitar lo que el sistema puede hacer aunque el modelo se equivoque.",
    problem: "Los modelos mezclan instrucciones, datos y contexto. Un documento malicioso, un usuario creativo o una tool demasiado poderosa pueden convertir una conversación en una fuga de datos o una acción no deseada.",
    core: [
      "Trata todo contenido externo como datos, nunca como instrucciones.",
      "Aplica permisos fuera del modelo.",
      "Reduce tools disponibles por usuario, tarea y entorno.",
      "Usa confirmaciones para acciones sensibles.",
      "Registra intentos de abuso y respuestas bloqueadas."
    ],
    architecture: [
      "clasificador de riesgo",
      "política de permisos",
      "allowlist de tools",
      "separación de datos e instrucciones",
      "validador de salida",
      "auditoría"
    ],
    metrics: [
      "blocked_injection_attempts",
      "unsafe_tool_requests",
      "permission_denied_rate",
      "sensitive_data_exposure_rate",
      "manual_review_rate",
      "policy_false_positive_rate"
    ],
    implementation: "Crea una política por capas: entrada, retrieval, tool selection, tool execution y salida. Si una capa falla, otra debe limitar el daño. No confíes en un único prompt de seguridad.",
    checklist: [
      "Los documentos externos no pueden cambiar instrucciones del sistema.",
      "Las tools críticas no están siempre disponibles.",
      "Los permisos se verifican antes de retrieval y antes de ejecución.",
      "Las salidas se validan antes de mostrarse.",
      "Hay redacción de secretos en logs.",
      "Hay entorno separado para pruebas.",
      "Las acciones destructivas requieren doble confirmación."
    ],
    antipatterns: [
      "confiar en 'ignora instrucciones maliciosas'",
      "exponer filesystem completo",
      "dar credenciales al modelo",
      "permitir tools genéricas",
      "no probar ataques conocidos"
    ],
    project: "Prepara una suite de diez ataques: exfiltración de prompt, documento con instrucciones maliciosas, petición de credenciales, salto de permisos, tool injection y acción destructiva. El sistema debe bloquear o degradar todos.",
    future: "Los ataques evolucionarán con modelos multimodales, agentes persistentes y memoria. La defensa seguirá girando alrededor de aislamiento, permisos, validación, auditoría y reducción de superficie."
  },
  {
    file: "35-capitulo-34-costes-latencia-y-rendimiento.md",
    title: "Capítulo 34 — Costes, latencia y rendimiento",
    chapter: "35",
    part: "Parte VIII — Producción, seguridad y operación",
    level: "intermedio",
    status: "estable",
    minutes: 44,
    thesis: "Un sistema IA puede ser correcto y aun así inviable si cuesta demasiado o responde demasiado tarde.",
    problem: "La mayoría de prototipos no calculan coste real. Ignoran retries, prompts largos, contexto excesivo, rerankers, STT, TTS, llamadas a tools, infraestructura y revisión humana.",
    core: [
      "Presupuesta por caso de uso, no solo por token.",
      "Mide latencia por etapa.",
      "Usa modelos pequeños donde baste.",
      "Reduce contexto antes de cambiar a un modelo más grande.",
      "Cachea con permisos y caducidad."
    ],
    architecture: [
      "presupuesto por feature",
      "router de modelos",
      "medidor de tokens",
      "caché segura",
      "colas para tareas lentas",
      "alertas de coste"
    ],
    metrics: [
      "coste por conversación",
      "coste por usuario activo",
      "latencia p95",
      "tokens por respuesta",
      "cache hit rate",
      "retry rate",
      "coste de revisión humana"
    ],
    implementation: "Divide cada request en etapas: entrada, retrieval, reranking, modelo, tools, salida y postprocesado. Si no puedes asignar coste a una etapa, no puedes optimizarla.",
    checklist: [
      "Hay presupuesto por feature.",
      "Se mide coste real por request.",
      "Se mide latencia por etapa.",
      "Hay límites por usuario y organización.",
      "Hay modelos alternativos para tareas simples.",
      "La caché respeta permisos.",
      "Las tareas lentas van a cola."
    ],
    antipatterns: [
      "usar siempre el modelo más grande",
      "meter demasiado contexto",
      "hacer reranking sin medir",
      "no contar retries",
      "ignorar coste de humano en el loop"
    ],
    project: "Toma un flujo RAG y genera una tabla con coste y latencia por etapa. Luego optimiza solo una cosa: reducción de contexto, cambio de modelo o caché. Mide antes y después.",
    future: "Los modelos serán más baratos, pero las expectativas subirán. El coste relevante será coste por resultado útil, no coste por token aislado."
  },
  {
    file: "36-capitulo-35-datos-privacidad-y-gobernanza.md",
    title: "Capítulo 35 — Datos, privacidad y gobernanza",
    chapter: "36",
    part: "Parte VIII — Producción, seguridad y operación",
    level: "avanzado",
    status: "estable",
    minutes: 46,
    thesis: "Los productos IA no fallan solo por malos modelos; fallan por datos mal clasificados, permisos ambiguos y memoria sin gobierno.",
    problem: "Cuando conectas IA a documentos, CRM, tickets, emails, voz o bases internas, el problema deja de ser solo técnico. Aparecen sensibilidad, acceso, retención, borrado, auditoría y responsabilidad.",
    core: [
      "Clasifica datos antes de indexarlos.",
      "Define qué puede salir del sistema.",
      "Separa datos de usuario, organización, proyecto y memoria.",
      "Versiona fuentes y políticas.",
      "Diseña borrado desde el inicio."
    ],
    architecture: [
      "catálogo de fuentes",
      "clasificación de sensibilidad",
      "política de retención",
      "control de acceso",
      "registro de uso",
      "proceso de borrado"
    ],
    metrics: [
      "fuentes clasificadas",
      "documentos sin propietario",
      "memorias caducadas",
      "solicitudes de borrado",
      "accesos denegados",
      "incidentes de datos"
    ],
    implementation: "Antes de ingestar, cada fuente debe tener propietario, tipo de dato, sensibilidad, permisos, frecuencia de actualización y política de retención. Si no sabes quién responde por una fuente, no la metas en producción.",
    checklist: [
      "Cada fuente tiene propietario.",
      "Cada fuente tiene sensibilidad definida.",
      "Hay permisos por usuario o grupo.",
      "Hay política de retención.",
      "Hay proceso de borrado.",
      "Hay auditoría de accesos.",
      "La memoria no guarda datos sensibles por defecto."
    ],
    antipatterns: [
      "indexar todo porque es fácil",
      "mezclar datos de clientes",
      "no separar entornos",
      "guardar conversaciones para siempre",
      "no saber qué fuentes usa una respuesta"
    ],
    project: "Crea una ficha de gobernanza para diez fuentes de datos: propósito, propietario, sensibilidad, permisos, actualización, retención, riesgos y decisión de ingesta.",
    future: "La gobernanza se volverá más importante con agentes que actúan, modelos multimodales y memoria persistente. Las empresas comprarán sistemas que puedan explicar qué datos usaron y por qué."
  },
  {
    file: "37-capitulo-36-despliegue-y-operacion.md",
    title: "Capítulo 36 — Despliegue y operación",
    chapter: "37",
    part: "Parte VIII — Producción, seguridad y operación",
    level: "intermedio",
    status: "estable",
    minutes: 43,
    thesis: "Desplegar IA no es subir una API; es operar modelos, datos, prompts, índices, tools y usuarios cambiantes.",
    problem: "Muchos equipos despliegan un prototipo sin rollback de prompt, sin versión de índice, sin límites de coste y sin forma de saber si el modelo nuevo empeoró el producto.",
    core: [
      "Versiona prompts, modelos, índices y tools.",
      "Separa entorno local, staging y producción.",
      "Publica cambios con evaluación previa.",
      "Ten rollback para modelo, prompt e índice.",
      "Monitorea coste, latencia y calidad después del despliegue."
    ],
    architecture: [
      "repositorio",
      "CI con evaluación",
      "staging con datos controlados",
      "producción con límites",
      "observabilidad",
      "rollback"
    ],
    metrics: [
      "deploy frequency",
      "regression rate",
      "rollback rate",
      "errores por versión",
      "coste por deploy",
      "tiempo hasta detectar fallo"
    ],
    implementation: "Cada release debería registrar versión de prompt, modelo, embeddings, índice, tools y política. Si un usuario reporta un fallo, debes poder reconstruir la versión exacta.",
    checklist: [
      "Hay staging.",
      "La evaluación corre antes de publicar.",
      "Los prompts tienen versión.",
      "Los índices tienen versión.",
      "Las tools tienen versión.",
      "Hay rollback.",
      "Hay alertas postdeploy."
    ],
    antipatterns: [
      "cambiar prompts directamente en producción",
      "reindexar sin registrar versión",
      "no guardar configuración de modelo",
      "desplegar sin límites de coste",
      "no tener staging"
    ],
    project: "Añade a un proyecto IA un archivo `release.json` que registre modelo, prompt, embeddings, índice, tools, evaluación y fecha. Genera uno por cada publicación.",
    future: "La operación IA se parecerá cada vez más a MLOps ligero combinado con DevOps y producto. La clave será versionar todo lo que cambia comportamiento."
  },
  {
    file: "38-capitulo-37-automatizaciones-y-workflows.md",
    title: "Capítulo 37 — Automatizaciones y workflows",
    chapter: "38",
    part: "Parte IX — Producto, empresa y adopción",
    level: "intermedio",
    status: "estable",
    minutes: 41,
    thesis: "Muchas soluciones IA no necesitan agentes autónomos; necesitan workflows claros con IA en los puntos correctos.",
    problem: "El hype empuja a crear agentes para todo. Pero la mayoría de procesos empresariales tienen pasos conocidos, permisos claros y puntos donde el modelo debe ayudar, no improvisar.",
    core: [
      "Modela el proceso antes de meter IA.",
      "Usa IA para clasificar, resumir, redactar, extraer o decidir bajo límites.",
      "Mantén pasos críticos como workflow explícito.",
      "Escala a agente solo cuando haya incertidumbre real.",
      "Diseña revisión humana donde el coste del error sea alto."
    ],
    architecture: [
      "trigger",
      "normalización",
      "paso IA",
      "validación",
      "acción",
      "notificación",
      "auditoría"
    ],
    metrics: [
      "tiempo ahorrado",
      "errores reducidos",
      "tasa de revisión humana",
      "automatizaciones completadas",
      "fallos por integración",
      "satisfacción interna"
    ],
    implementation: "Empieza con workflows de bajo riesgo: clasificar tickets, resumir reuniones, preparar borradores, extraer datos o generar informes. Luego conecta tools de escritura con confirmación.",
    checklist: [
      "El proceso está dibujado.",
      "Los pasos IA están acotados.",
      "Hay validación de salida.",
      "Las acciones externas requieren confirmación.",
      "Hay logs por ejecución.",
      "Hay retry o fallback.",
      "Hay responsable del workflow."
    ],
    antipatterns: [
      "agente autónomo para proceso lineal",
      "automatizar sin propietario",
      "no definir fallback",
      "no medir ahorro real",
      "no distinguir borrador de acción"
    ],
    project: "Automatiza el resumen semanal de tickets: recoge tickets cerrados, agrupa temas, genera informe, pide revisión humana y publica en un canal interno.",
    future: "Las plataformas no-code y low-code se mezclarán con agents y MCP. El valor estará en diseñar procesos robustos, no en encadenar herramientas por moda."
  },
  {
    file: "39-capitulo-38-integraciones-empresariales.md",
    title: "Capítulo 38 — Integraciones empresariales",
    chapter: "39",
    part: "Parte IX — Producto, empresa y adopción",
    level: "intermedio",
    status: "estable",
    minutes: 44,
    thesis: "El valor empresarial de la IA aparece cuando se conecta con los sistemas donde vive el trabajo real.",
    problem: "Un chatbot aislado impresiona poco. Un copiloto conectado a CRM, ERP, tickets, documentación, calendario, email y permisos puede cambiar un proceso completo. Pero cada integración aumenta riesgo.",
    core: [
      "Empieza por integraciones de lectura.",
      "Mapea permisos antes de conectar.",
      "No expongas APIs genéricas al modelo.",
      "Crea tools pequeñas y auditables.",
      "Diseña degradación si una integración falla."
    ],
    architecture: [
      "conector",
      "normalizador",
      "capa de permisos",
      "tool específica",
      "auditoría",
      "fallback"
    ],
    metrics: [
      "integraciones activas",
      "fallos por conector",
      "latencia por integración",
      "acciones ejecutadas",
      "acciones rechazadas",
      "tiempo ahorrado por proceso"
    ],
    implementation: "Define para cada integración una ficha: sistema, datos accesibles, acciones permitidas, permisos, credenciales, límites, logs, dueño técnico y dueño de negocio.",
    checklist: [
      "La integración tiene propietario.",
      "Los permisos están mapeados.",
      "Las credenciales no llegan al modelo.",
      "Las tools son específicas.",
      "Hay logs por acción.",
      "Hay fallback si falla.",
      "Hay entorno de pruebas."
    ],
    antipatterns: [
      "conectar producción en la primera demo",
      "exponer API completa",
      "no revisar permisos heredados",
      "no registrar acciones",
      "mezclar clientes o tenants"
    ],
    project: "Crea una integración de solo lectura con un sistema de tickets. La IA puede buscar, resumir y proponer respuesta, pero no cerrar ni modificar tickets.",
    future: "MCP y conectores estándar harán más fácil integrar sistemas, pero no eliminarán la necesidad de permisos, auditoría y diseño de tools."
  },
  {
    file: "40-capitulo-39-ui-ux-para-productos-con-ia.md",
    title: "Capítulo 39 — UI y UX para productos con IA",
    chapter: "40",
    part: "Parte IX — Producto, empresa y adopción",
    level: "intermedio",
    status: "estable",
    minutes: 39,
    thesis: "La interfaz de un producto IA debe hacer visible la incertidumbre, el control y la acción.",
    problem: "Muchos productos IA son una caja de texto. Eso obliga al usuario a saber qué pedir, cómo pedirlo, cuándo confiar y qué hacer con la respuesta. Una buena UX reduce esa carga.",
    core: [
      "Muestra fuentes, estado y acciones.",
      "Distingue respuesta, borrador y acción ejecutada.",
      "Permite editar, confirmar, rechazar y dar feedback.",
      "Diseña estados de carga y error honestos.",
      "No ocultes incertidumbre."
    ],
    architecture: [
      "entrada guiada",
      "respuesta estructurada",
      "panel de fuentes",
      "acciones sugeridas",
      "confirmaciones",
      "feedback"
    ],
    metrics: [
      "tasa de aceptación",
      "tasa de edición",
      "feedback positivo",
      "acciones confirmadas",
      "acciones canceladas",
      "tiempo hasta completar tarea"
    ],
    implementation: "Para cada respuesta, decide si el usuario necesita leer, comparar, editar, confirmar o actuar. La interfaz debe reflejar esa intención, no limitarse a mostrar texto.",
    checklist: [
      "Las fuentes son visibles.",
      "Las acciones están separadas de la respuesta.",
      "Hay confirmación para acciones sensibles.",
      "El usuario puede corregir.",
      "El feedback es fácil.",
      "Los errores son comprensibles.",
      "La interfaz no promete certeza falsa."
    ],
    antipatterns: [
      "caja de texto para todo",
      "ocultar fuentes",
      "botones de acción demasiado agresivos",
      "no mostrar límites",
      "hacer leer respuestas largas en flujos rápidos"
    ],
    project: "Rediseña un chatbot RAG como copiloto: añade fuentes laterales, botones de copiar, feedback, botón de crear ticket como borrador y confirmación antes de guardar.",
    future: "Los productos IA se moverán de chat genérico a interfaces híbridas: formularios, comandos, paneles, timelines, voz, canvas y automatizaciones visibles."
  },
  {
    file: "41-capitulo-40-testing-y-calidad.md",
    title: "Capítulo 40 — Testing y calidad",
    chapter: "41",
    part: "Parte IX — Producto, empresa y adopción",
    level: "avanzado",
    status: "estable",
    minutes: 43,
    thesis: "Testear sistemas IA exige probar código determinista y comportamiento probabilístico sin confundirlos.",
    problem: "Los equipos intentan probar IA como si todo fuera determinista o se rinden porque el modelo varía. Ambas posturas son malas. Hay que testear capas.",
    core: [
      "Prueba funciones deterministas con tests normales.",
      "Prueba prompts y modelos con evaluación por casos.",
      "Prueba tools con entradas válidas, inválidas y maliciosas.",
      "Prueba retrieval con fuentes esperadas.",
      "Prueba producto con usuarios reales."
    ],
    architecture: [
      "unit tests",
      "contract tests",
      "eval tests",
      "security tests",
      "integration tests",
      "user acceptance tests"
    ],
    metrics: [
      "test pass rate",
      "eval pass rate",
      "regresiones por release",
      "bugs por feature",
      "fallos de tool",
      "errores detectados antes de producción"
    ],
    implementation: "No intentes verificar palabra por palabra. Verifica contrato, fuentes, puntos obligatorios, ausencia de datos prohibidos, tool correcta y comportamiento ante incertidumbre.",
    checklist: [
      "Hay tests unitarios para validadores.",
      "Hay tests de contrato JSON.",
      "Hay evals para respuestas.",
      "Hay tests de permisos.",
      "Hay tests de prompt injection.",
      "Hay tests de tools.",
      "Hay pruebas manuales de UX."
    ],
    antipatterns: [
      "snapshot exacto de respuesta completa",
      "no probar errores",
      "no probar permisos",
      "solo evaluar en producción",
      "no separar código de comportamiento IA"
    ],
    project: "Construye una suite mixta: diez unit tests para tools, veinte eval cases para RAG y cinco ataques de seguridad. Haz que corra antes de cada release.",
    future: "El testing IA incorporará más simuladores, jueces especializados y trazas reales. Pero los contratos y casos seguirán siendo la base."
  },
  {
    file: "42-capitulo-41-equipos-roles-y-proceso.md",
    title: "Capítulo 41 — Equipos, roles y proceso",
    chapter: "42",
    part: "Parte IX — Producto, empresa y adopción",
    level: "intermedio",
    status: "estable",
    minutes: 37,
    thesis: "Construir con IA no elimina roles; cambia cómo colaboran producto, ingeniería, datos, negocio y operaciones.",
    problem: "Muchos proyectos IA fallan porque los trata una sola persona como experimento aislado. En producción hacen falta decisiones de producto, datos, seguridad, soporte, coste y adopción.",
    core: [
      "Define propietario de producto.",
      "Define propietario técnico.",
      "Incluye experto de dominio.",
      "Incluye responsable de datos y permisos.",
      "Crea rituales de revisión de calidad."
    ],
    architecture: [
      "product owner",
      "engineer",
      "domain expert",
      "data owner",
      "security reviewer",
      "support owner"
    ],
    metrics: [
      "tiempo hasta MVP",
      "adopción por usuarios",
      "errores reportados",
      "calidad semanal",
      "coste mensual",
      "mejoras publicadas"
    ],
    implementation: "Para un equipo pequeño, bastan tres sombreros: quien entiende el problema, quien construye el sistema y quien valida el riesgo. Lo peligroso es que nadie tenga explícitamente esos sombreros.",
    checklist: [
      "Hay dueño del caso de uso.",
      "Hay dueño técnico.",
      "Hay experto de dominio.",
      "Hay responsable de datos.",
      "Hay cadencia de revisión.",
      "Hay canal de feedback.",
      "Hay criterio para apagar o cambiar el sistema."
    ],
    antipatterns: [
      "proyecto IA sin usuario real",
      "ingeniería sin experto de dominio",
      "negocio sin revisión técnica",
      "nadie mira costes",
      "nadie decide riesgos"
    ],
    project: "Define un RACI simple para un copiloto interno: responsable, aprobador, consultados e informados para datos, prompts, tools, despliegue, soporte y evaluación.",
    future: "Los equipos adoptarán roles híbridos: AI product engineer, responsable de evaluación, diseñador de workflows y especialista en integración de modelos."
  },
  {
    file: "43-capitulo-42-venta-consultoria-e-implantacion.md",
    title: "Capítulo 42 — Venta, consultoría e implantación",
    chapter: "43",
    part: "Parte IX — Producto, empresa y adopción",
    level: "intermedio",
    status: "estable",
    minutes: 45,
    thesis: "Vender IA práctica no consiste en prometer magia; consiste en reducir un problema caro con una solución medible.",
    problem: "Muchas ofertas IA fracasan porque venden tecnología en abstracto. Las empresas compran reducción de tiempos, menos errores, mejor atención, mejor documentación o más capacidad operativa.",
    core: [
      "Empieza por proceso y dolor, no por modelo.",
      "Define métrica de éxito antes de demo.",
      "Vende piloto acotado.",
      "Incluye datos, integración y adopción en el alcance.",
      "No prometas autonomía total al principio."
    ],
    architecture: [
      "descubrimiento",
      "diagnóstico",
      "piloto",
      "evaluación",
      "implantación",
      "operación"
    ],
    metrics: [
      "horas ahorradas",
      "tiempo de respuesta",
      "errores reducidos",
      "tickets desviados",
      "coste operativo",
      "adopción"
    ],
    implementation: "Una propuesta seria debe incluir objetivo, alcance, fuentes de datos, integraciones, riesgos, criterios de aceptación, calendario, precio, mantenimiento y responsabilidades del cliente.",
    checklist: [
      "El problema tiene dueño.",
      "La métrica de éxito es concreta.",
      "El piloto está limitado.",
      "Los datos están disponibles.",
      "Las integraciones están identificadas.",
      "Hay plan de adopción.",
      "Hay mantenimiento posterior."
    ],
    antipatterns: [
      "vender chatbot genérico",
      "prometer ahorro sin medir proceso",
      "ignorar datos del cliente",
      "no incluir soporte",
      "hacer demo que no se puede operar"
    ],
    project: "Prepara una oferta de piloto de cuatro semanas para un chatbot de soporte con RAG: alcance, entregables, exclusiones, métricas, precio y plan de paso a producción.",
    future: "El mercado castigará soluciones genéricas y premiará implantaciones con conocimiento de dominio, integración real, evaluación y mantenimiento."
  },
  {
    file: "44-capitulo-43-libro-vivo-automatizacion-editorial.md",
    title: "Capítulo 43 — Libro vivo y automatización editorial",
    chapter: "44",
    part: "Parte X — Libro vivo y cierre",
    level: "avanzado",
    status: "muy cambiante",
    minutes: 47,
    thesis: "Un libro vivo no se actualiza solo porque haya noticias; se actualiza porque tiene un proceso editorial que separa señal, ruido y criterio.",
    problem: "La IA cambia a diario. Nuevos modelos, papers, repos, hardware y prácticas aparecen sin parar. Si el libro intenta reaccionar a todo, pierde coherencia. Si no reacciona a nada, envejece.",
    core: [
      "Distingue radar, propuesta, revisión y publicación.",
      "Clasifica cada novedad por impacto editorial.",
      "No dejes que un agente reescriba capítulos sin revisión.",
      "Versiona cada edición.",
      "Mantén una memoria editorial del libro."
    ],
    architecture: [
      "ingesta de fuentes",
      "clasificación",
      "resumen con evidencia",
      "propuesta de cambio",
      "revisión humana",
      "build",
      "release"
    ],
    metrics: [
      "fuentes revisadas",
      "propuestas aceptadas",
      "capítulos actualizados",
      "tiempo desde novedad hasta edición",
      "releases publicadas",
      "errores editoriales detectados"
    ],
    implementation: "El agente editorial debe proponer, no publicar. Su salida ideal es una ficha con fuente, fecha, resumen, capítulo afectado, tipo de cambio, nivel de confianza y texto sugerido.",
    checklist: [
      "Las fuentes están definidas.",
      "Cada novedad conserva URL.",
      "Cada propuesta separa hecho e inferencia.",
      "Cada cambio tiene capítulo destino.",
      "Cada release tiene tag.",
      "El PDF y la web se generan juntos.",
      "Las ediciones antiguas quedan disponibles."
    ],
    antipatterns: [
      "actualizar por cada noticia",
      "reescribir sin preservar versiones",
      "mezclar opinión con fuente",
      "publicar sin build",
      "perder el tono del autor"
    ],
    project: "Implementa un informe diario que lea noticias, releases de GitHub y papers; genere propuestas por capítulo; y requiera aprobación humana antes de modificar el manuscrito.",
    future: "Los libros técnicos tenderán a ser productos versionados: texto, web, código, datasets, releases, radar y comunidad. La ventaja no será actualizar mucho, sino actualizar bien."
  },
  {
    file: "45-capitulo-44-roadmap-de-aprendizaje.md",
    title: "Capítulo 44 — Roadmap de aprendizaje",
    chapter: "45",
    part: "Parte X — Libro vivo y cierre",
    level: "intermedio",
    status: "estable",
    minutes: 35,
    thesis: "Aprender IA práctica requiere una ruta: fundamentos, construcción, producción y criterio.",
    problem: "El campo es demasiado amplio para aprenderlo por acumulación de enlaces. Sin ruta, saltas de modelos a agentes, de agentes a RAG, de RAG a hardware, sin construir nada suficientemente real.",
    core: [
      "Aprende construyendo sistemas pequeños.",
      "Domina prompts antes de agentes.",
      "Domina RAG antes de memoria compleja.",
      "Domina tools antes de autonomía.",
      "Domina evaluación antes de escalar."
    ],
    architecture: [
      "fundamentos",
      "prototipo",
      "RAG",
      "tools",
      "agentes",
      "producción",
      "negocio"
    ],
    metrics: [
      "proyectos terminados",
      "tests escritos",
      "evals creadas",
      "sistemas desplegados",
      "errores documentados",
      "usuarios reales"
    ],
    implementation: "Un buen roadmap de seis meses combina lectura, prototipos y revisión. Cada mes debe producir algo ejecutable, no solo apuntes.",
    checklist: [
      "Has construido un chatbot simple.",
      "Has construido un RAG con citas.",
      "Has creado una tool validada.",
      "Has añadido evaluación.",
      "Has desplegado un MVP.",
      "Has medido coste.",
      "Has visto usuarios reales usarlo."
    ],
    antipatterns: [
      "leer sin construir",
      "probar todas las herramientas",
      "saltar a agentes sin tools",
      "ignorar fundamentos de software",
      "no medir nada"
    ],
    project: "Planifica doce semanas: dos de fundamentos, dos de RAG, dos de tools, dos de agentes, dos de producción y dos de producto. Cada bloque termina con demo y evaluación.",
    future: "La ruta cambiará en herramientas, pero no en criterio: problema, datos, modelo, contexto, acción, evaluación, operación y usuario."
  },
  {
    file: "46-capitulo-45-conclusion-de-usuario-a-constructor.md",
    title: "Capítulo 45 — Conclusión: de usuario a constructor",
    chapter: "46",
    part: "Parte X — Libro vivo y cierre",
    level: "fundacional",
    status: "estable",
    minutes: 28,
    thesis: "El salto importante no es aprender a hablar con la IA; es aprender a construir sistemas donde la IA sea una pieza útil, limitada y mantenible.",
    problem: "La IA invita a confundir fluidez con capacidad. Una respuesta brillante puede ocultar falta de datos, permisos, evaluación, seguridad o producto. Construir exige más paciencia.",
    core: [
      "El usuario pregunta.",
      "El constructor diseña contexto.",
      "El usuario espera respuesta.",
      "El constructor define límites.",
      "El usuario se impresiona.",
      "El constructor mide."
    ],
    architecture: [
      "problema",
      "usuario",
      "datos",
      "modelo",
      "herramientas",
      "evaluación",
      "operación"
    ],
    metrics: [
      "valor real entregado",
      "errores conocidos",
      "coste sostenible",
      "usuarios activos",
      "confianza ganada",
      "mejoras acumuladas"
    ],
    implementation: "El cierre práctico del libro es elegir un proyecto pequeño y llevarlo hasta producción interna: con usuarios, datos, evaluación, logs, coste y versión.",
    checklist: [
      "Tienes un problema real.",
      "Tienes usuario real.",
      "Tienes datos controlados.",
      "Tienes una arquitectura mínima.",
      "Tienes evaluación.",
      "Tienes observabilidad.",
      "Tienes una siguiente versión."
    ],
    antipatterns: [
      "quedarse en prompts sueltos",
      "perseguir novedades sin criterio",
      "confundir demo con producto",
      "olvidar al usuario",
      "no versionar el aprendizaje"
    ],
    project: "Elige uno de los proyectos guiados del apéndice y conviértelo en release: README, datos de ejemplo, evaluación mínima, capturas, PDF del diseño y decisión de qué mejorar después.",
    future: "Este libro debe seguir cambiando. Pero su idea central no debería cambiar: la IA más útil no es la que parece mágica, sino la que ayuda a personas reales dentro de sistemas bien diseñados."
  }
];

function renderChapter(chapter) {
  const number = chapter.title.match(/Capítulo (\d+)/)?.[1] || "";
  const section = (suffix, heading, body) => `\n## ${number}.${suffix} ${heading}\n\n${body}\n`;
  const list = (items) => items.map((item) => `- ${item}`).join("\n");
  const flow = chapter.architecture.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const metrics = chapter.metrics.map((item) => `- **${item}**`).join("\n");
  const checklist = chapter.checklist.map((item) => `- ${item}`).join("\n");
  const antipatterns = chapter.antipatterns.map((item) => `### ${item}\n\n${antipatternExplanation(item)}`).join("\n\n");

  return `---
title: "${chapter.title}"
chapter: "${chapter.chapter}"
part: "${chapter.part}"
version: "0.1"
last_updated: "2026-06-03"
status: "${chapter.status}"
level: "${chapter.level}"
estimated_reading_time: "${chapter.minutes} minutos"
---

# ${chapter.title}

${chapter.thesis}

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?

${section("1", "El problema", chapter.problem)}
${section("2", "Principios prácticos", list(chapter.core))}
${section("3", "Arquitectura mínima", `Un diseño razonable puede empezar con este flujo:\n\n\`\`\`text\n${flow}\n\`\`\`\n\nNo todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.`)}
${section("4", "Implementación práctica", `${chapter.implementation}\n\nUna forma útil de trabajar es escribir primero la ficha técnica del sistema. Esa ficha debe ser corta, revisable y concreta:\n\n\`\`\`text\nObjetivo:\nUsuario:\nDatos usados:\nAcciones permitidas:\nRiesgos principales:\nMétricas:\nCriterio para publicar:\nCriterio para apagar o revertir:\n\`\`\`\n\nCuando no puedes completar esta ficha, el proyecto todavía está demasiado borroso.`)}
${section("5", "Métricas", `Las métricas no son decoración. Son el sistema nervioso del producto.\n\n${metrics}\n\nNo hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.`)}
${section("6", "Checklist", checklist)}
${section("7", "Antipatrones", antipatterns)}
${section("8", "Proyecto guiado", chapter.project)}
${section("9", "Qué puede cambiar en el futuro", chapter.future)}

## ${number}.10 Ideas clave del capítulo

- ${chapter.thesis}
- El sistema debe tener límites visibles.
- La calidad debe medirse antes y después de cada cambio.
- La operación importa tanto como la primera demo.
- Los errores deben ser trazables.
- La versión siguiente debe ser una mejora deliberada, no una reacción al ruido.

## Recursos relacionados

- Capítulo 30 — Laboratorio de implementación.
- Apéndice B — Proyectos guiados.
- Apéndice C — Checklists de producción.
- Apéndice D — Glosario operativo.
`;
}

function antipatternExplanation(name) {
  return `Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.`;
}

for (const chapter of chapters) {
  const target = path.join(chaptersDir, chapter.file);
  if (fs.existsSync(target)) {
    console.log(`skip existing ${chapter.file}`);
    continue;
  }
  fs.writeFileSync(target, renderChapter(chapter));
  console.log(`created ${chapter.file}`);
}
