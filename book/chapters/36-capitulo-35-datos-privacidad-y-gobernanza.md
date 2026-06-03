---
title: "Capítulo 35 — Datos, privacidad y gobernanza"
chapter: "36"
part: "Parte VIII — Producción, seguridad y operación"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "avanzado"
estimated_reading_time: "46 minutos"
---

# Capítulo 35 — Datos, privacidad y gobernanza

Los productos IA no fallan solo por malos modelos; fallan por datos mal clasificados, permisos ambiguos y memoria sin gobierno.

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


## 35.1 El problema

Cuando conectas IA a documentos, CRM, tickets, emails, voz o bases internas, el problema deja de ser solo técnico. Aparecen sensibilidad, acceso, retención, borrado, auditoría y responsabilidad.


## 35.2 Principios prácticos

- Clasifica datos antes de indexarlos.
- Define qué puede salir del sistema.
- Separa datos de usuario, organización, proyecto y memoria.
- Versiona fuentes y políticas.
- Diseña borrado desde el inicio.


## 35.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. catálogo de fuentes
2. clasificación de sensibilidad
3. política de retención
4. control de acceso
5. registro de uso
6. proceso de borrado
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 35.4 Implementación práctica

Antes de ingestar, cada fuente debe tener propietario, tipo de dato, sensibilidad, permisos, frecuencia de actualización y política de retención. Si no sabes quién responde por una fuente, no la metas en producción.

Una forma útil de trabajar es escribir primero la ficha técnica del sistema. Esa ficha debe ser corta, revisable y concreta:

```text
Objetivo:
Usuario:
Datos usados:
Acciones permitidas:
Riesgos principales:
Métricas:
Criterio para publicar:
Criterio para apagar o revertir:
```

Cuando no puedes completar esta ficha, el proyecto todavía está demasiado borroso.


## 35.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **fuentes clasificadas**
- **documentos sin propietario**
- **memorias caducadas**
- **solicitudes de borrado**
- **accesos denegados**
- **incidentes de datos**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 35.6 Checklist

- Cada fuente tiene propietario.
- Cada fuente tiene sensibilidad definida.
- Hay permisos por usuario o grupo.
- Hay política de retención.
- Hay proceso de borrado.
- Hay auditoría de accesos.
- La memoria no guarda datos sensibles por defecto.


## 35.7 Antipatrones

### indexar todo porque es fácil

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### mezclar datos de clientes

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no separar entornos

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### guardar conversaciones para siempre

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no saber qué fuentes usa una respuesta

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


## 35.8 Proyecto guiado

Crea una ficha de gobernanza para diez fuentes de datos: propósito, propietario, sensibilidad, permisos, actualización, retención, riesgos y decisión de ingesta.


## 35.9 Qué puede cambiar en el futuro

La gobernanza se volverá más importante con agentes que actúan, modelos multimodales y memoria persistente. Las empresas comprarán sistemas que puedan explicar qué datos usaron y por qué.


## 35.10 Ideas clave del capítulo

- Los productos IA no fallan solo por malos modelos; fallan por datos mal clasificados, permisos ambiguos y memoria sin gobierno.
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
