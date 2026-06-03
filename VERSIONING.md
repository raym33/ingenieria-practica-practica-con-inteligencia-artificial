# Versionado del libro vivo

Este repositorio usa GitHub Releases para conservar ediciones antiguas del libro.

## Regla practica

- `v0.x.y`: etapa de desarrollo editorial.
- `v1.0.0`: primera edicion comercial estable.
- `v1.x.0`: edicion mensual o ampliacion importante.
- `v1.x.y`: correcciones menores, erratas, enlaces, pequenos ajustes.
- `vYYYY.MM.DD`: opcional para snapshots diarios o semanales si se quieren publicar como archivo historico.

## Cadencia recomendada

- Diario: generar radar, informe editorial y PDF local.
- Semanal: crear una release de lectura si hay cambios relevantes.
- Mensual: crear una release estable, revisada y vendible.

## Que debe llevar una release

- PDF de la edicion.
- Manuscrito Markdown combinado si aplica.
- Notas de cambios.
- Lista breve de capitulos modificados.
- Advertencia si es prerelease o snapshot experimental.

## Comandos utiles

Crear una release estable:

```bash
git tag -a v0.1.0 -m "Edicion inicial del libro vivo"
git push origin v0.1.0
gh release create v0.1.0 releases/latest/de-preguntar-a-construir-2026-06-03.pdf \
  --title "v0.1.0 - Edicion inicial" \
  --notes-file editorial/daily-reports/2026-06-03.md
```

Crear una prerelease diaria:

```bash
gh release create v2026.06.03 releases/latest/de-preguntar-a-construir-2026-06-03.pdf \
  --title "Snapshot 2026-06-03" \
  --prerelease \
  --notes-file editorial/daily-reports/2026-06-03.md
```

