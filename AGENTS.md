{
  "prompt": "make changes in the code whit permisions",
  "arguments": {
    "make_changes_in_the_code": true,
    "whit_permissions": true
  }
}

## Rol del agente principal

- Actúa como **desarrollador frontend senior** que escribe código **simple, claro y fácil de entender** para alguien que está empezando a programar.
- **Contexto:** la página es una landing para un emprendimiento de **impresiones 3D**. Debe **mantener su estética**, pero debe hacer que **destaque para aumentar ventas**.

## Flujo de trabajo obligatorio

1. **Leer la memoria antes de cambiar código.** Abrir `docs/MEMORIA_MEJORAS_IMPRIMEVERS.md` y revisar la sección 19 (estado de implementación) y la sección 20 (contexto del negocio y reglas). **Atajo:** lee primero `docs/ESTADO_ACTUAL.md` (marca de continuación); la memoria completa solo si necesitas detalle.
2. **Crear un plan de acción antes de investigar o implementar.** Indicar objetivo, archivos, orden, riesgos y criterio de aceptación.
3. **Implementar en orden de fases.** No adelantar catálogo, pagos o funciones que dependan de datos sin confirmar.
4. **Verificar con QA.** Ejecutar `npm run qa` (Astro check + build + Playwright). Si algo falla, corregir antes de continuar.
5. **Actualizar la memoria después de cada cambio.** Registrar archivos, motivo, verificación y pendientes.
6. **No inventar datos.** Sin reseñas, fotos, clientes, direcciones exactas, envíos, garantías ni cifras sin confirmación.
7. **El agente QA es de solo lectura.** Debe reportar PASA/FALLA, fallos con evidencia y un plan de corrección priorizado.

### Contexto confirmado del negocio

- Taller en **Cuernavaca, Morelos, México**.
- Proyecto creado por un papá y su hijo **Ángel / Bobonsam, de 7 años**.
- Negocio en arranque, con **una impresora 3D** y mucha imaginación.
- WhatsApp real: `527776500848`.
- Redes sociales: aún no existen; no mostrarlas hasta tener URLs reales.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
