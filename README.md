 # KUMI CMS

<p align="left">
  <img src="https://img.shields.io/github/license/sosaheri/kumi-cms" alt="License">
  <img src="https://img.shields.io/github/stars/sosaheri/kumi-cms?style=flat&color=yellow" alt="Stars">
  <img src="https://img.shields.io/github/issues/sosaheri/kumi-cms" alt="Issues">
  <img src="https://img.shields.io/github/last-commit/sosaheri/kumi-cms" alt="Last Commit">
</p>

---

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/sosaheri/kumi-cms)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsosaheri%2Fkumi-cms)

**KUMI Version:** v0.2.0 — use the `kumi` CLI to compose sites.

Quick wizard usage (interactive):

```bash
# from the project root
node ../kumi-cli/bin/kumi.js wizard
# or, if installed globally
kumi wizard
```

# mini-CMS (file-based)

Este repositorio contiene una landing desacoplada que actúa como un mini-CMS usando archivos JSON/Markdown como fuente de verdad.

Quick start

1. Instalar dependencias (node 18+):

```bash
npm install
```

2. Desarrollo con Vite (hot reload):

```bash
npm run dev
# abre http://localhost:5173
```

Qué incluye por defecto

- `index.html` - plantilla pública que carga el motor y el theme.
- `css/theme.css` - estilos del theme por defecto.
- `lib/framework/` - motor modular:
  - `core.js` - orquestador principal (ES module)
  - `data.js` - capa de acceso a datos (fetch/save)
  - `templates.js` - wrapper de plantillas
  - `email.js` - wrapper para EmailJS
- `js/config.js` - configuración del sitio y definición de colecciones (templates inline)
- `data/*.json` - archivos de contenido (proyectos, talleres, etc.)

Themes y plantillas

- Para crear un nuevo theme, crea `themes/<mi-theme>/theme.css` y opcionalmente `themes/<mi-theme>/partials/` con fragmentos HTML.
- El motor expone una función `render(templateFn, data)` en `lib/framework/templates.js` — los autores de themes pueden sustituir el render por partials/strings.

Themes

Sección rápida sobre themes:

- Estructura recomendada: `themes/<name>/` contiene `theme.css`, `partials/manifest.json` y `partials/*.html`.
- Puedes crear un preview estático (index) ensamblando partials con el script:

```bash
# generar index.html para 'detectalab' u otro theme
npm run assemble-theme detectalab
```

- Para desarrollo dinámico el CMS leerá `js/config.js` → `theme: '<name>'` y cargará el theme activo en `#theme-root`. Consulta `themes/README.md` para más detalles.

Assemble theme: crear un `index.html` estático

Usa este comando cuando quieras generar un `index.html` listo para previsualizar o para entregar el theme como una página estática.

Comandos:

```bash
# generar index.html para 'detectalab'
npm run assemble-theme -- detectalab

# generar para 'default' (sin argumento usa 'default')
npm run assemble-theme
```

Qué produce:
- Escribe `themes/<name>/index.html` concatenando los partials en el orden de `partials/manifest.json`.
- `index.html` referenciará `theme.css` (local al theme), `../../lib/framework/core.css` y `./theme.js` (si existe).

Qué significa "standalone" (entrega sin CMS):
- Un `index.html` standalone es una página estática que se puede abrir en un navegador sin ejecutar el motor del CMS.
- Para que sea realmente standalone debes incluir en el paquete:
  - `index.html` (generado), `theme.css`, `theme.js` (si lo necesita), y la carpeta `assets/` con imágenes.
  - Incluir `lib/framework/core.css` si el tema lo necesita, o adaptar `theme.css` para ser autosuficiente.
  - Prerenderizar contenido dinámico (por ejemplo llenar `#projects-container`) porque `Core.loadCollections()` no se ejecutará en el entorno standalone.
  - Asegurarte de que `theme.js` no dependa de APIs del CMS (por ejemplo, no llamar a `Core.*`), o mover la lógica necesaria dentro de `theme.js` para ejecutar independientemente.

Uso típico:
- Desarrollo: no necesitas `assemble-theme` para ver el theme en acción (usa `Core.setTheme()` o ajusta `js/config.js`).
- QA/entrega: ejecutar `npm run assemble-theme <name>` para generar `index.html` y empaquetar `theme.css`, `assets/`, `theme.js`.

Persistencia y edición

- Actualmente el frontend lee `data/*.json` via `fetch`. Para editar desde la UI necesitarás exponer un pequeño servidor (archivo-based) que ofrezca endpoints CRUD en `/api/collections/:name`.
- El diseño soporta guardar a través de `lib/framework/data.js` usando `saveCollection(name, items)` que intenta llamar a `/api/collections/:name`.

Validación

- Añade un script de validación (por ejemplo usando `ajv`) que verifique `data/*.json` contra un esquema antes de hacer deploy.

Siguientes pasos recomendados

- Implementar servidor Express ligero que lea/escriba `data/*.json` (opcionalmente con autenticación básica).
- Crear UI de administración (`/admin`) que use la API para editar colecciones.
- Añadir validación JSON con `ajv` y un `npm run lint:data`.

Validación de datos

1. Instala dependencias si no lo has hecho:

```bash
npm install
```

2. Ejecuta el validador de datos:

```bash
npm run lint:data
```

El comando valida los archivos en `data/` usando los esquemas en `schemas/`. Si devuelve estado distinto de 0, corrige los errores mostrados.

Si quieres, empiezo por:
- crear el servidor Express file-based + endpoint `/api/collections/:name`, o
- avanzar con la Admin UI que edite colecciones en modo dev.

Dime con cuál prefieres que continúe.



Proyecto KUMI 🐦

Bienvenido a tu nuevo proyecto generado con el KUMI CLI. Este es un sitio web estático de alto rendimiento diseñado para ser ligero, modular y fácil de mantener.

🚀 Inicio Rápido

Para ver tu sitio funcionando inmediatamente:

Instala las herramientas (si no lo has hecho):

npm install


Levanta el servidor de desarrollo:
Puedes usar el comando de Node para servir archivos estáticos:

npx serve .


O simplemente usa la extensión Live Server de VS Code sobre el archivo index.html.

📁 Estructura del Proyecto

/data: Aquí residen tus contenidos en formato JSON. Editando estos archivos cambias el contenido del sitio sin tocar el código.

/themes: Contiene el CSS y las plantillas visuales. El tema actual es default.

/lib/framework: El núcleo (core.js) que hace que todo funcione. No se recomienda editarlo a menos que seas experto.

/scripts: Herramientas de utilidad para validar datos o crear nuevos temas.

🛠 Comandos Disponibles

node scripts/validate-data.js: Verifica que tus archivos JSON no tengan errores.

node scripts/assemble-theme.js: Reconstruye el index.html basándose en el manifiesto del tema.

node scripts/build-standalone.js: Genera una versión del sitio en un solo archivo HTML, ideal para compartir rápidamente.

🎨 Personalización

Para cambiar el aspecto del sitio, dirígete a themes/default/theme.css. KUMI utiliza variables CSS en el :root para que puedas cambiar colores y fuentes de forma global y sencilla.

KUMI: Vuela rápido, vuela ligero.

---

Más recursos y flujo de trabajo
------------------------------

- Uso del `standalone`: útil para entregar previews o subir a hosting estático. El standalone es una versión prerenderizada sin JavaScript que debe incluir `theme.css` y la carpeta `assets/` si tu theme la necesita.

- Reiniciar un proyecto: si quieres borrar todos los contenidos generados y volver a empezar, borra `data/*.json` (o restaura desde control de versiones) y limpia `themes/*/index-standalone.html`.

Comandos útiles
----------------

```bash
# Ejecutar el Wizard interactivo
node ../kumi-cli/bin/kumi.js wizard

# Limpiar temas generados (borra index-standalone.html y assets de cada theme)
node ../kumi-cli/bin/kumi.js clean-themes
```

Mini tutorial: crear una web con todas las secciones disponibles
-------------------------------------------------------------

1. Ejecuta el Wizard:

```bash
node ../kumi-cli/bin/kumi.js wizard
```

2. Añade las siguientes secciones cuando el Wizard lo pregunte (en este orden de ejemplo):
- `hero-standard`
- `features-grid`
- `pricing-base`
- `testimonials-base`
- `faq-base`
- `contact-base`

3. Para `Features`, `Pricing`, `Testimonials` y `FAQ` el Wizard te pedirá repetidamente elementos ("¿Quieres añadir otra característica? (S/N)"). Añade 2–3 ítems por sección para ver el layout.

4. Al finalizar acepta "construir ahora" para ejecutar el ensamblador. Se generará `themes/default/index-standalone.html`.

5. Abre `themes/default/index-standalone.html` en tu navegador para revisar la página estática.

Consejos de mantenimiento
------------------------
- Para actualizar la librería de secciones, añade nuevas plantillas en `library/sections/base/` y registra sus metadatos en `library/catalog.json`.
- Si usas secciones `premium`, el Wizard mostrará una advertencia; la lógica de validación/descarga está planificada en la Fase 4.

¿Listo para seguir? Revisa el `kumi-cli` para comandos útiles (`wizard`, `clean-themes`, `build`).
