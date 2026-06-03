---
title: "Capítulo 30 — Laboratorio de implementación"
chapter: "31"
part: "Parte VII — Agentes, tools y automatización"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "avanzado"
estimated_reading_time: "55 minutos"
---

# Capítulo 30 — Laboratorio de implementación

Este capítulo existe por una razón sencilla: entender RAG, function calling, MCP, memoria o agentes de voz no basta para construir un producto.

La diferencia aparece cuando tienes que decidir:

- qué guardar;
- qué no guardar;
- qué medir;
- qué exponer al modelo;
- qué validar fuera del modelo;
- qué hacer cuando una herramienta falla;
- cuándo pedir confirmación humana;
- cómo saber si el sistema mejora o empeora.

La teoría ayuda a pensar.

La implementación obliga a concretar.

Este capítulo no intenta sustituir la documentación de cada framework. Intenta darte una arquitectura mínima, portable y suficientemente seria para empezar un proyecto real sin quedar atrapado en una demo bonita pero frágil.

La idea es construir cinco piezas:

1. un RAG mínimo evaluable;
2. un sistema de tools con validación y permisos;
3. una memoria explícita y borrable;
4. un agente pequeño con límites;
5. una capa de voz que no rompa la seguridad.

No importa si usas OpenAI, Anthropic, modelos locales, Ollama, LM Studio, LlamaIndex, LangChain, Vercel, FastAPI o una pila propia. Las decisiones importantes son las mismas.

## 30.1 Arquitectura base

Una arquitectura práctica para sistemas IA no empieza con el modelo.

Empieza con el contrato.

```text
Usuario
  |
  v
API de aplicación
  |
  +--> Política de permisos
  +--> Recuperación de contexto
  +--> Memoria
  +--> Selección de tools
  +--> Llamada al modelo
  +--> Validación de salida
  +--> Ejecución de acciones
  +--> Logs, métricas y auditoría
```

El modelo es una pieza dentro del sistema.

No es el sistema.

La regla práctica:

> Todo lo que sea seguridad, permisos, validación, coste, auditoría o confirmación debe vivir fuera del prompt.

El prompt puede explicar reglas.

El sistema debe hacerlas cumplir.

## 30.2 Estructura de proyecto mínima

Para un proyecto pequeño, una estructura suficiente sería:

```text
ai-product/
  app/
    api.py
    settings.py
  ai/
    model.py
    prompts.py
    rag.py
    tools.py
    memory.py
    agent.py
    guardrails.py
    evals.py
    tracing.py
  data/
    documents/
    index/
    evals/
  tests/
    test_rag.py
    test_tools.py
    test_memory.py
    test_agent.py
```

Esta estructura separa responsabilidades:

- `rag.py` recupera contexto;
- `tools.py` define acciones;
- `memory.py` guarda preferencias o hechos persistentes;
- `agent.py` decide pasos;
- `guardrails.py` valida entradas, salidas y acciones;
- `evals.py` mide calidad;
- `tracing.py` deja evidencia.

Cuando todo vive en un solo archivo, el prototipo avanza rápido.

Cuando todo vive mezclado en producción, cada cambio da miedo.

## 30.3 Contrato de respuesta

Antes de escribir el prompt, define cómo debe salir la respuesta.

Ejemplo:

```json
{
  "answer": "Texto para el usuario",
  "citations": [
    {
      "source_id": "manual-ventas-2026",
      "chunk_id": "manual-ventas-2026:15",
      "quote": "Fragmento exacto usado como evidencia"
    }
  ],
  "confidence": "high",
  "missing_information": [],
  "actions": []
}
```

Este contrato permite evaluar.

Sin contrato, evalúas impresiones.

Con contrato, puedes medir:

- si la respuesta cita fuentes;
- si las fuentes existen;
- si la respuesta declara incertidumbre;
- si pidió una acción;
- si la acción estaba permitida;
- si faltaba información.

## 30.4 RAG mínimo evaluable

Un RAG vendible no es el que responde bonito.

Es el que puedes auditar.

El flujo mínimo:

```text
pregunta -> filtros de permisos -> retrieval -> contexto -> respuesta -> citas -> log -> evaluación
```

Un esqueleto en Python:

```python
from dataclasses import dataclass

@dataclass
class Chunk:
    id: str
    source_id: str
    text: str
    metadata: dict

@dataclass
class RetrievedChunk:
    chunk: Chunk
    score: float

def retrieve(question: str, user: dict, top_k: int = 6) -> list[RetrievedChunk]:
    allowed_sources = get_allowed_sources(user)
    candidates = vector_search(question, top_k=top_k * 3)
    filtered = [
        item for item in candidates
        if item.chunk.metadata.get("source_id") in allowed_sources
    ]
    return filtered[:top_k]

def build_context(items: list[RetrievedChunk]) -> str:
    blocks = []
    for item in items:
        blocks.append(
            f"[{item.chunk.id} | score={item.score:.3f}]\n{item.chunk.text}"
        )
    return "\n\n---\n\n".join(blocks)

def answer_with_rag(question: str, user: dict) -> dict:
    retrieved = retrieve(question, user)
    context = build_context(retrieved)
    response = call_model(
        system=RAG_SYSTEM_PROMPT,
        user=f"Contexto:\n{context}\n\nPregunta:\n{question}"
    )
    result = validate_response_contract(response)
    log_rag_event(question, user, retrieved, result)
    return result
```

Lo importante no es este código exacto.

Lo importante es la frontera:

- los permisos se aplican antes de construir contexto;
- el contexto tiene identificadores;
- la respuesta se valida;
- el evento queda registrado;
- la evaluación puede repetir preguntas.

## 30.5 Métricas mínimas de RAG

Para cada pregunta de evaluación, guarda:

```json
{
  "question": "¿Cuál es la política de devoluciones?",
  "expected_sources": ["politica-devoluciones-2026"],
  "forbidden_sources": ["borrador-interno-legal"],
  "expected_answer_points": [
    "plazo de devolución",
    "condiciones del producto",
    "canal de solicitud"
  ]
}
```

Y mide:

- **retrieval_hit_rate**: si aparece al menos una fuente esperada;
- **source_precision**: cuántas fuentes recuperadas eran relevantes;
- **citation_validity**: si las citas existen y pertenecen al contexto;
- **answer_coverage**: si cubre los puntos esperados;
- **abstention_rate**: cuántas veces dice “no tengo información suficiente”;
- **unsafe_leak_rate**: si usa fuentes prohibidas.

Un RAG puede parecer mejor porque responde con más seguridad.

Pero si cita peor, filtra permisos peor o inventa con más elegancia, no es mejor.

## 30.6 Chunking práctico

El chunking no se decide por moda.

Se decide por tarea.

Para FAQ corta: chunk inicial de 200-400 tokens, overlap de 20-50 y pregunta/respuesta juntas.

Para manual técnico: chunk inicial de 500-900 tokens, overlap de 80-150 y respeto por títulos y subsecciones.

Para legal o contratos: chunk inicial de 300-700 tokens, overlap de 100-200 y cláusulas completas.

Para código: chunk por función o clase, overlap bajo, path y firma incluidos.

Para un libro vivo: chunk por sección, overlap medio, título, capítulo y fecha siempre presentes.

Regla práctica:

> Si el chunk no puede responder nada por sí mismo, es demasiado pequeño o está mal cortado.

Otra regla:

> Si el chunk contiene tres temas distintos, es demasiado grande.

## 30.7 Tool calling mínimo

Una tool de producción debe tener:

- nombre específico;
- descripción corta;
- esquema estricto;
- validación fuera del modelo;
- permisos;
- modo dry-run cuando sea posible;
- errores estructurados;
- logs.

Ejemplo:

```python
from pydantic import BaseModel, Field

class CreateTicketInput(BaseModel):
    customer_id: str = Field(min_length=3)
    title: str = Field(min_length=5, max_length=120)
    priority: str = Field(pattern="^(low|medium|high)$")
    summary: str = Field(min_length=10, max_length=2000)

def create_support_ticket(raw_args: dict, user: dict) -> dict:
    args = CreateTicketInput.model_validate(raw_args)

    if "ticket:create" not in user["permissions"]:
        return {
            "ok": False,
            "error": "permission_denied",
            "message": "El usuario no puede crear tickets."
        }

    ticket = insert_ticket(
        customer_id=args.customer_id,
        title=args.title,
        priority=args.priority,
        summary=args.summary,
        created_by=user["id"]
    )

    return {
        "ok": True,
        "ticket_id": ticket.id,
        "status": ticket.status
    }
```

La parte crítica:

```python
args = CreateTicketInput.model_validate(raw_args)
```

El modelo propone.

El sistema valida.

## 30.8 Confirmación antes de acciones sensibles

No todas las tools deben ejecutarse igual.

Tools de lectura, como buscar un documento, normalmente no requieren confirmación.

Tools de cálculo, como estimar un coste, normalmente no requieren confirmación.

Tools de borrador, como redactar un email, normalmente no requieren confirmación.

Tools de escritura reversible, como crear un ticket, pueden requerir confirmación según el contexto.

Tools de escritura externa, como enviar un email, deben requerir confirmación.

Tools económicas, como emitir una factura, deben requerir confirmación.

Tools destructivas, como borrar un usuario, deben requerir confirmación y doble control.

Patrón práctico:

```python
def requires_confirmation(tool_name: str, args: dict) -> bool:
    sensitive_tools = {
        "send_email",
        "create_invoice",
        "delete_record",
        "change_permissions"
    }
    return tool_name in sensitive_tools
```

Y en el agente:

```python
if requires_confirmation(tool_name, args):
    return {
        "type": "confirmation_required",
        "tool": tool_name,
        "args": redact_sensitive_args(args),
        "message": "Voy a ejecutar esta acción. ¿Confirmas?"
    }
```

La confirmación no debe ser solo una frase en el prompt.

Debe estar en el flujo de aplicación.

## 30.9 Memoria mínima

La memoria no debe ser un cajón.

Debe ser una tabla con política.

Ejemplo:

```sql
CREATE TABLE ai_memory (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  project_id TEXT,
  memory_type TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  confidence REAL NOT NULL,
  created_at TIMESTAMP NOT NULL,
  expires_at TIMESTAMP,
  deleted_at TIMESTAMP
);
```

Tipos de memoria útiles:

- `preference`: “prefiere respuestas cortas”;
- `project_fact`: “el proyecto usa Next.js”;
- `constraint`: “no usar servicios cloud para datos médicos”;
- `decision`: “se eligió pgvector por integración con Postgres”;
- `open_issue`: “pendiente medir latencia de reranker”.

Memoria peligrosa:

- datos médicos sin necesidad;
- credenciales;
- opiniones inferidas;
- información de terceros;
- instrucciones persistentes no verificadas;
- contenido que pueda ser prompt injection.

## 30.10 Guardar memoria con confirmación

Un patrón sano:

```python
def propose_memory(message: str) -> dict | None:
    candidate = extract_memory_candidate(message)
    if not candidate:
        return None

    if candidate["type"] in {"credential", "sensitive_personal_data"}:
        return None

    return {
        "type": "memory_proposal",
        "memory": candidate,
        "message": "Puedo recordar esto para futuras sesiones. ¿Quieres que lo guarde?"
    }
```

Y solo guardas tras confirmación:

```python
def save_confirmed_memory(candidate: dict, user: dict) -> dict:
    if not user_can_store_memory(user):
        return {"ok": False, "error": "memory_not_allowed"}

    return insert_memory(
        user_id=user["id"],
        memory_type=candidate["type"],
        content=candidate["content"],
        source="user_confirmed",
        confidence=1.0
    )
```

La memoria buena se siente como continuidad.

La memoria mala se siente como vigilancia.

## 30.11 Agente mínimo con límites

Un agente práctico no necesita veinte agentes.

Necesita:

- objetivo claro;
- tools limitadas;
- presupuesto de pasos;
- presupuesto de coste;
- verificación;
- salida trazable.

Ejemplo:

```python
MAX_STEPS = 5

def run_agent(task: str, user: dict) -> dict:
    state = {
        "task": task,
        "steps": [],
        "cost": 0.0,
        "done": False
    }

    for step_number in range(1, MAX_STEPS + 1):
        plan = call_model(
            system=AGENT_SYSTEM_PROMPT,
            user=render_agent_state(state)
        )

        decision = validate_agent_decision(plan)

        if decision["type"] == "final":
            state["done"] = True
            state["final"] = decision["answer"]
            break

        if decision["type"] == "tool_call":
            result = execute_tool_safely(
                decision["tool"],
                decision["args"],
                user
            )
            state["steps"].append({
                "tool": decision["tool"],
                "args": redact_sensitive_args(decision["args"]),
                "result": result
            })

    if not state["done"]:
        state["final"] = "No he podido completar la tarea con los límites actuales."

    log_agent_trace(state, user)
    return state
```

Este agente es aburrido.

Eso es bueno.

En producción, aburrido suele significar observable, limitado y explicable.

## 30.12 Estado de agente

El estado mínimo:

```json
{
  "task": "Preparar propuesta para cliente",
  "step_count": 3,
  "max_steps": 5,
  "tools_used": ["search_docs", "draft_email"],
  "open_questions": [],
  "blocked_reason": null,
  "requires_human_confirmation": false
}
```

No necesitas guardar todo el razonamiento interno del modelo.

Necesitas guardar la traza operativa:

- qué pidió el usuario;
- qué herramientas se llamaron;
- con qué argumentos;
- qué devolvieron;
- qué decisión visible tomó el sistema;
- cuánto costó;
- cuánto tardó;
- qué errores aparecieron.

## 30.13 Observabilidad mínima

Cada interacción debería producir un evento:

```json
{
  "event": "ai_interaction",
  "request_id": "req_2026_06_03_001",
  "user_id": "usr_123",
  "feature": "support_copilot",
  "model": "provider/model",
  "input_tokens": 1240,
  "output_tokens": 330,
  "latency_ms": 1840,
  "retrieved_chunks": 6,
  "tools_called": ["create_support_ticket"],
  "error": null,
  "user_feedback": null
}
```

Métricas mínimas:

- latencia p50, p95 y p99;
- coste por conversación;
- porcentaje de respuestas sin fuente;
- porcentaje de “no encontrado”;
- tasa de tool calls fallidas;
- tasa de confirmaciones rechazadas;
- satisfacción del usuario;
- bugs reportados por cada 100 conversaciones.

Sin estas métricas, el sistema solo “parece” funcionar.

## 30.14 Evaluación antes de producción

Antes de poner un sistema IA delante de usuarios reales, crea una suite pequeña.

No hace falta empezar con mil casos.

Empieza con treinta:

- 10 preguntas normales;
- 5 preguntas ambiguas;
- 5 preguntas fuera de alcance;
- 5 preguntas con permisos;
- 5 intentos de prompt injection o abuso.

Ejemplo:

```json
{
  "id": "rag_perm_003",
  "input": "Resume el contrato del cliente ACME",
  "user": {
    "id": "usr_sales_01",
    "permissions": ["contracts:read:own_region"]
  },
  "expected": {
    "allowed_sources": ["acme-contract-eu"],
    "forbidden_sources": ["acme-contract-us"],
    "must_not_include": ["datos bancarios", "credenciales"]
  }
}
```

La evaluación no busca perfección.

Busca regresiones.

Cuando cambias modelo, prompt, chunking, embeddings o tool descriptions, corres la suite.

Si baja la calidad, no publicas.

## 30.15 Voz: arquitectura segura

Un agente de voz añade presión.

Todo ocurre más rápido.

Arquitectura mínima:

```text
audio
  -> STT
  -> normalización de turno
  -> clasificador de intención
  -> RAG/tools/memoria
  -> respuesta corta
  -> TTS
  -> log sin audio sensible
```

Reglas prácticas:

- no ejecutes acciones críticas solo porque el STT transcribió algo;
- confirma nombres, importes, fechas y destinatarios;
- permite interrupción;
- permite fallback a texto o humano;
- no guardes audio si no aporta valor claro;
- registra transcripción, decisión y acción, no necesariamente el audio completo.

Ejemplo de confirmación:

```text
Usuario: Cambia la cita de Marta al viernes.
Agente: He encontrado una cita de Marta López el jueves a las 10:00. 
        ¿Quieres moverla al viernes 5 de junio a las 10:00?
Usuario: Sí.
Agente: Confirmado. La he cambiado al viernes 5 de junio a las 10:00.
```

En voz, una confirmación bien diseñada vale más que un modelo más grande.

## 30.16 Coste por arquitectura

Una forma simple de estimar coste:

```text
coste_total =
  coste_stt
  + coste_embeddings
  + coste_retrieval
  + coste_reranking
  + coste_modelo
  + coste_tts
  + coste_infra
  + coste_humano_de_revisión
```

No todos aplican siempre.

Para un chatbot RAG de texto:

```text
coste_total =
  embeddings_de_ingesta
  + vector_db
  + tokens_de_entrada
  + tokens_de_salida
  + observabilidad
```

Para un agente de voz:

```text
coste_total =
  STT
  + tokens
  + tools
  + TTS
  + telefonía
  + fallback humano
```

El coste que mata proyectos no suele ser una respuesta individual.

Suele ser:

- reintentos;
- prompts demasiado largos;
- retrieval excesivo;
- modelos grandes para tareas pequeñas;
- logs inexistentes;
- automatizaciones que fallan en silencio;
- revisión humana improvisada.

## 30.17 Guardrails que sí importan

Los guardrails útiles no son una lista infinita de prohibiciones.

Son controles conectados a riesgos reales.

Para fuga de datos: permisos antes de retrieval.

Para acción incorrecta: confirmación y dry-run.

Para prompt injection: separar datos de instrucciones.

Para tool peligrosa: allowlist por usuario y contexto.

Para respuesta inventada: citas obligatorias y abstención.

Para coste descontrolado: límites por request y por usuario.

Para bucle de agente: máximo de pasos.

Para memoria tóxica: confirmación, caducidad y borrado.

Un buen sistema IA no intenta eliminar todo riesgo.

Lo hace visible, medible y gobernable.

## 30.18 Checklist de salida a producción

Antes de publicar:

- El sistema tiene contrato de entrada y salida.
- Las tools validan argumentos fuera del modelo.
- Las tools sensibles requieren confirmación.
- Los permisos se aplican antes de recuperar contexto.
- Las respuestas RAG pueden citar fuentes.
- Existe comportamiento definido para “no encontrado”.
- Hay logs por interacción.
- Hay métricas de latencia, coste y error.
- Hay suite mínima de evaluación.
- Hay rollback de prompt o modelo.
- Hay límite de pasos para agentes.
- Hay política de memoria.
- Hay borrado de memoria.
- Hay revisión de datos sensibles.
- Hay fallback humano o manual para casos críticos.

Si faltan tres o más puntos, probablemente no estás ante producción.

Estás ante una demo avanzada.

## 30.19 Mini proyecto guiado: copiloto de soporte

Objetivo: construir un copiloto interno para soporte.

Alcance inicial:

- responde preguntas sobre documentación interna;
- crea borradores de ticket;
- no envía emails;
- no modifica clientes;
- cita fuentes;
- registra feedback.

Stack mínimo:

- backend: FastAPI o API route;
- almacenamiento: Postgres;
- vector: pgvector o Qdrant;
- observabilidad: tabla de eventos al principio;
- evaluación: JSON con casos;
- frontend: panel simple con pregunta, respuesta, fuentes y feedback.

Fases:

1. Ingestar 20 documentos reales.
2. Crear 30 preguntas de evaluación.
3. Implementar retrieval con permisos.
4. Exigir citas.
5. Añadir tool `create_ticket_draft`.
6. Añadir logs.
7. Medir coste y latencia.
8. Probar con usuarios internos.
9. Revisar errores semanales.
10. Solo después, añadir más tools.

La tentación será empezar por el agente.

Empieza por el copiloto.

## 30.20 Mini proyecto guiado: memoria de proyecto

Objetivo: que un asistente técnico recuerde decisiones de un proyecto.

Memorias permitidas:

- stack técnico;
- decisiones aprobadas;
- restricciones;
- tareas abiertas;
- preferencias de formato.

Memorias prohibidas:

- claves;
- tokens;
- datos personales innecesarios;
- instrucciones de seguridad;
- contenido no confirmado.

Flujo:

```text
mensaje -> extracción de posible memoria -> clasificación -> propuesta al usuario -> confirmación -> guardado -> recuperación contextual
```

La memoria no debe entrar siempre completa en el prompt.

Debe recuperarse según tarea.

Ejemplo:

```python
def get_relevant_memory(task: str, user: dict, project_id: str) -> list[dict]:
    memories = search_memory(
        query=task,
        user_id=user["id"],
        project_id=project_id,
        limit=5
    )
    return [
        memory for memory in memories
        if memory["deleted_at"] is None and not is_expired(memory)
    ]
```

La memoria útil reduce repetición.

La memoria peligrosa aumenta superficie de ataque.

## 30.21 Mini proyecto guiado: agente de investigación

Objetivo: vigilar novedades y proponer cambios al libro vivo.

Tools:

- `search_news`;
- `fetch_paper`;
- `fetch_repo_release`;
- `summarize_source`;
- `propose_book_change`.

Límites:

- no modifica capítulos directamente;
- no publica releases;
- no usa fuentes sin URL;
- no acepta posts virales sin corroboración;
- máximo 8 fuentes por informe diario;
- separa hechos de inferencias.

Salida:

```json
{
  "date": "2026-06-03",
  "items": [
    {
      "title": "Nueva versión de una herramienta RAG",
      "source_url": "https://example.com",
      "confidence": "medium",
      "affected_chapters": ["20", "21"],
      "proposed_change": "Actualizar tabla de herramientas",
      "requires_human_review": true
    }
  ]
}
```

Este agente no escribe el libro.

Prepara buen material para que el autor decida.

Esa diferencia protege la calidad editorial.

## 30.22 Qué debe mejorar en próximas ediciones

Este laboratorio es un punto de partida.

Las próximas versiones deberían añadir:

- repositorios de ejemplo completos;
- comparativas reales de latencia;
- evaluación con datasets pequeños incluidos;
- integración con modelos locales;
- ejemplos MCP ejecutables;
- plantillas de observabilidad;
- despliegues en Vercel, Docker y servidores locales;
- casos de voz con medición de turnos;
- análisis económico por tipo de producto.

Un libro vivo no debe fingir que ya está terminado.

Debe mostrar una ruta clara de mejora.

## 30.23 Ideas clave del capítulo

- El modelo es una pieza, no el sistema.
- La implementación empieza por contratos, permisos y trazas.
- RAG debe evaluarse por recuperación, citas, permisos y abstención.
- Function calling necesita validación externa al modelo.
- Las tools sensibles requieren confirmación en la aplicación.
- La memoria debe ser explícita, editable y borrable.
- Un agente útil tiene límites de pasos, coste y herramientas.
- Voz exige confirmaciones más cuidadosas que texto.
- Observabilidad y evaluación separan demo de producto.
- La mejora del libro debe avanzar hacia laboratorios ejecutables.

## 30.24 Checklist práctica

- ¿Existe contrato JSON de respuesta?
- ¿Se validan las salidas del modelo?
- ¿Se aplican permisos antes del retrieval?
- ¿Hay identificadores de fuente y chunk?
- ¿Las tools tienen esquemas estrictos?
- ¿Las acciones sensibles requieren confirmación?
- ¿La memoria se puede listar, editar y borrar?
- ¿Hay límite de pasos para agentes?
- ¿Hay logs por interacción?
- ¿Se mide coste?
- ¿Se mide latencia?
- ¿Hay evaluación con casos normales, ambiguos y maliciosos?
- ¿Hay rollback de modelo, prompt o índice?
- ¿Hay fallback humano?
- ¿El sistema puede decir “no sé” sin romper la experiencia?

## Recursos relacionados

- Capítulo 16 — Qué problema resuelve RAG.
- Capítulo 17 — Arquitectura RAG básica.
- Capítulo 19 — RAG avanzado.
- Capítulo 20 — Herramientas RAG.
- Capítulo 25 — Function calling.
- Capítulo 26 — MCP.
- Capítulo 27 — Arquitecturas agenticas.
- Capítulo 28 — Memoria.
- Capítulo 29 — Agentes de voz.
