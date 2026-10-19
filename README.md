# Portafolio de Analista de Datos

Sitio estático (HTML + CSS + JS), sin backend ni compilación.

## Estructura
- `index.html`: estructura semántica y metadatos SEO.
- `css/styles.css`: estilos (paleta #2D3036, #FFFFFF, #D8CFC4, #A6A6A6, #252525; Poppins).
- `js/config.js`: **todos tus datos** (perfil, estudios, experiencias, herramientas, proyectos).
- `js/main.js`: construye la interfaz (filtros, carrusel, visor de imágenes, visor PDF, barras).
- `assets/`: imágenes, documentos e iconos (el favicon se cambia en `assets/icons/favicon.svg`).

## Ejecutar en VS Code
1. Abre la carpeta `portfolio` en VS Code.
2. Instala la extensión **Live Server** y pulsa "Go Live" (o `python -m http.server` en la carpeta).
3. Ábrelo desde `http://localhost`; el visor PDF no funciona bien con `file://`.

## Editar contenido
- **Datos personales**: `CONFIG.perfil`. LinkedIn/GitHub vacíos = botones ocultos.
- **Foto**: `assets/images/profile/foto.jpg`. **CV**: `assets/documents/cv/cv.pdf`.
- **Logos de empresas/instituciones**: `assets/images/companies/` y `education/`, y pon la ruta en `logo`. Sin logo se muestran las iniciales.
- **Herramientas**: guarda los logos en `assets/images/tools/` con los nombres de `config.js`; cambia `nivel` y `porcentaje` y pon `herramientasDemo: false`.
- **Proyectos**: copia un objeto de `CONFIG.proyectos`. `tecnologia` debe coincidir con un filtro. Imágenes en `assets/images/projects/<tecnologia>/`. PDF en `assets/documents/python/` o `sql/`. Activa/desactiva `botones.demo`, `documentacion`, `repositorio`.
- Usa solo capturas con datos ficticios o anonimizados.

## Publicar
- **GitHub Pages**: sube el contenido de `portfolio` a tu repositorio `usuario.github.io` (en la raíz) y activa Pages. Límites: archivos de hasta 100 MB (recomendado menos de 25 MB), sitio de hasta 1 GB, rutas sensibles a mayúsculas.
- **Netlify**: arrastra la carpeta en app.netlify.com/drop.
- Revisa que los nombres de archivo coincidan exactamente con los de `config.js`.
