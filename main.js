const $ = (s) => document.querySelector(s);
const esc = (t = "") => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const initials = (n) => n.replace(/[\[\]]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
const demoTag = (d) => (d ? '<span class="demo">Ejemplo</span>' : "");
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const P = CONFIG.perfil;

// Imagen con respaldo: si falta, se muestra un contenedor neutro (nunca rompe el diseño)
function img(src, alt, cls, fallback) {
  if (!src) return fallback;
  return `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.outerHTML=this.dataset.f" data-f="${esc(fallback)}">`;
}
const logo = (src, name) => img(src, "Logo de " + name, "logo", `<div class="logo-ini" aria-hidden="true">${esc(initials(name))}</div>`);

function months(a, b) {
  const [y1, m1] = a.split("-").map(Number);
  const e = b ? b.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
  const t = (e[0] - y1) * 12 + (e[1] - m1) + 1;
  const y = Math.floor(t / 12), m = t % 12;
  return [y ? y + (y > 1 ? " años" : " año") : "", m ? m + (m > 1 ? " meses" : " mes") : ""].filter(Boolean).join(" y ") || "Menos de un mes";
}

function renderProfile() {
  const fotoFb = `<div class="ini" aria-hidden="true">${esc(initials(P.nombre))}</div>`;
  const links = [P.linkedin && `<a class="btn alt" href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`, P.github && `<a class="btn alt" href="${esc(P.github)}" target="_blank" rel="noopener">GitHub</a>`].filter(Boolean).join("");
  $("#profile").innerHTML = `${img(P.foto, "Foto de " + P.nombre, "photo", fotoFb)}<div class="txt"><p class="kicker">Portafolio</p><h1>${esc(P.nombre)}</h1><p class="role">${esc(P.cargo)}</p><p class="loc">${esc(P.ubicacion)}</p><p class="bio">${esc(P.resumen)}</p>
  <a class="btn alt" href="#proyectos">Explorar proyectos</a>${P.cv ? `<a class="btn alt" href="${esc(P.cv)}" download>Descargar CV</a>` : ""}<a class="btn alt" href="#contacto">Contacto</a>${links}</div>`;
  $("#brand").textContent = P.nombre;
  $("#nav").innerHTML = [["sobre-mi", "Sobre mí"], ["formacion", "Formación"], ["experiencia", "Experiencia"], ["herramientas", "Herramientas"], ["proyectos", "Proyectos"], ["contacto", "Contacto"]].map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join("");
  document.title = `${P.nombre} | ${P.cargo}`;
}

function renderStatic() {
  $("#about").innerHTML = CONFIG.sobreMi.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#education").innerHTML = CONFIG.formacion.length ? CONFIG.formacion.map((e) => `<article class="card"><div class="row">${logo(e.logo, e.institucion)}<div><h3>${esc(e.programa)}${demoTag(e.demo)}</h3><p class="meta">${esc(e.institucion)} · ${esc(e.estado)}${e.fechaInicio ? " · " + esc(e.fechaInicio) + (e.fechaFin ? " – " + esc(e.fechaFin) : "") : ""}</p>${e.descripcion ? `<p>${esc(e.descripcion)}</p>` : ""}</div></div></article>`).join("") : '<p class="note">Información de formación pendiente.</p>';
  $("#experience").innerHTML = CONFIG.experiencia.map((x) => `<article class="card"><div class="row">${logo(x.logo, x.empresa)}<div><h3>${esc(x.cargo)}${demoTag(x.demo)}</h3><p class="meta">${esc(x.empresa)} · ${esc(x.inicio)} – ${x.fin ? esc(x.fin) : "Actualmente"} · ${months(x.inicio, x.fin)}</p></div></div><p>${esc(x.descripcion)}</p><ul class="list">${x.responsabilidades.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>${x.logros.length ? `<strong>Logros</strong><ul class="list">${x.logros.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}</article>`).join("");
  $("#skillsNote").textContent = CONFIG.herramientasDemo ? "Los niveles mostrados son valores de ejemplo, pendientes de reemplazar por los reales." : "";
  $("#skills").innerHTML = CONFIG.herramientas.map((h) => `<div class="card skill"><div class="row">${logo(h.logo, h.nombre)}<div><h3>${esc(h.nombre)}</h3><p class="meta">${esc(h.nivel)} · ${h.porcentaje}%</p></div></div><div class="bar" role="progressbar" aria-valuenow="${h.porcentaje}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(h.nombre)}"><i data-w="${h.porcentaje}"></i></div></div>`).join("");
  const mail = P.correo;
  $("#contact").innerHTML = `<p>${esc(P.ubicacion)}</p><p><a href="mailto:${esc(mail)}">${esc(mail)}</a></p>
  <button class="btn" id="copy">Copiar correo</button>${P.cv ? `<a class="btn alt" href="${esc(P.cv)}" download>Descargar CV</a>` : ""}${P.linkedin ? `<a class="btn alt" href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}${P.github ? `<a class="btn alt" href="${esc(P.github)}" target="_blank" rel="noopener">GitHub</a>` : ""}<span class="note" id="copied" role="status"></span>`;
  $("#copy").onclick = () => navigator.clipboard.writeText(mail).then(() => ($("#copied").textContent = " ¡Copiado!"), () => ($("#copied").textContent = " No se pudo copiar."));
}

// Barras animadas: una sola vez, respetando prefers-reduced-motion
function animateBars() {
  const bars = document.querySelectorAll(".bar i");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fill = (b) => (b.style.width = b.dataset.w + "%");
  if (reduce || !("IntersectionObserver" in window)) return bars.forEach(fill);
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.querySelectorAll("i").forEach(fill); io.unobserve(e.target); } }), { threshold: 0.3 });
  io.observe($("#skills"));
}

// Proyectos
let active = "Todos";
function renderFilters() {
  $("#filters").innerHTML = CONFIG.filtros.map((f) => `<button type="button" data-f="${esc(f)}" aria-pressed="${f === active}">${esc(f)}</button>`).join("");
}
function renderProjects() {
  const list = CONFIG.proyectos.filter((p) => active === "Todos" || p.tecnologia === active);
  $("#empty").hidden = list.length > 0;
  $("#projects").innerHTML = list.map((p) => `<article class="card">${img(p.portada, "Portada de " + p.titulo, "cover", '<div class="cover" role="img" aria-label="Sin imagen de portada"></div>')}<h3>${esc(p.titulo)}${demoTag(p.demo)}</h3><div><span class="tag">${esc(p.tecnologia)}</span></div><p>${esc(p.descripcion)}</p><div><button class="btn" data-open="${p.id}">Ver proyecto</button>${p.pdf && p.botones.documentacion ? `<button class="btn alt" data-doc="${p.id}">Ver documentación</button>` : ""}</div></article>`).join("");
}
const find = (id) => CONFIG.proyectos.find((p) => p.id === id);
const section = (t, v) => (v && v.length ? `<h4>${t}</h4>${Array.isArray(v) ? `<ul class="list">${v.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : `<p>${esc(v)}</p>`}` : "");

let slideIdx = 0, slides = [];
function carousel() {
  if (!slides.length) return "";
  return `<div class="car"><img id="slide" src="${esc(slides[0])}" alt="Captura 1 de ${slides.length}" onerror="this.alt='Imagen no disponible'">${slides.length > 1 ? '<button class="nav prev" aria-label="Anterior">‹</button><button class="nav next" aria-label="Siguiente">›</button>' : ""}</div>${slides.length > 1 ? `<div class="dots">${slides.map((_, i) => `<button aria-label="Ir a imagen ${i + 1}" data-dot="${i}" aria-current="${i === 0}"></button>`).join("")}</div>` : ""}`;
}
function go(i) {
  slideIdx = (i + slides.length) % slides.length;
  const s = $("#slide"); s.src = slides[slideIdx]; s.alt = `Captura ${slideIdx + 1} de ${slides.length}`;
  document.querySelectorAll("[data-dot]").forEach((d) => d.setAttribute("aria-current", +d.dataset.dot === slideIdx));
}
const pdfBlock = (p) => (p.pdf && p.botones.documentacion ? `<h4>Documentación</h4><iframe class="pdf" src="${esc(p.pdf)}" title="Documentación de ${esc(p.titulo)}"></iframe><p class="note">Si no se muestra, tu navegador no permite verlo aquí o el archivo aún no existe.</p><a class="btn alt" href="${esc(p.pdf)}" download>Descargar PDF</a>` : "");
let lastFocus;
function openProject(id, docOnly) {
  const p = find(id); slides = p.imagenes || []; slideIdx = 0; lastFocus = document.activeElement;
  const links = [p.botones.demo && p.demoUrl && `<a class="btn" href="${esc(p.demoUrl)}" target="_blank" rel="noopener">Ver demostración</a>`, p.botones.repositorio && p.repoUrl && `<a class="btn alt" href="${esc(p.repoUrl)}" target="_blank" rel="noopener">Repositorio</a>`].filter(Boolean).join("");
  $("#modalBody").innerHTML = `<h3>${esc(p.titulo)}${demoTag(p.demo)}</h3><span class="tag">${esc(p.tecnologia)}</span><p>${esc(p.descripcion)}</p>${carousel()}${section("Objetivo", p.objetivo)}${section("Problema empresarial", p.problema)}${section("Solución implementada", p.solucion)}${section("Funcionalidades", p.funcionalidades)}${section("Metodología", p.metodologia)}${p.consultas ? `<h4>Consultas / procesos</h4><pre><code>${esc(p.consultas)}</code></pre>` : ""}${section("Resultados documentados", p.resultados)}<div>${(p.herramientas || []).map((h) => `<span class="tag">${esc(h)}</span>`).join("")}</div>${links}${pdfBlock(p)}`;
  $("#modal").hidden = false; $("#modal .close").focus();
  if (docOnly) $("#modal iframe")?.scrollIntoView();
}
function closeAll() {
  if (!$("#lightbox").hidden) { $("#lightbox").hidden = true; return; }
  $("#modal").hidden = true; $("#modalBody").innerHTML = ""; lastFocus?.focus();
}

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.f) { active = t.dataset.f; renderFilters(); renderProjects(); }
  else if (t.dataset.open) openProject(t.dataset.open);
  else if (t.dataset.doc) openProject(t.dataset.doc, true);
  else if (t.dataset.dot) go(+t.dataset.dot);
  else if (t.classList.contains("prev")) go(slideIdx - 1);
  else if (t.classList.contains("next")) go(slideIdx + 1);
  else if (t.id === "slide") { $("#lbImg").src = t.src; $("#lbImg").alt = t.alt; $("#lightbox").hidden = false; $("#lightbox .close").focus(); }
  else if (t.hasAttribute("data-close") || t.id === "modal" || t.id === "lightbox") closeAll();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAll();
  if ($("#modal").hidden || !slides.length) return;
  if (e.key === "ArrowLeft") go(slideIdx - 1);
  if (e.key === "ArrowRight") go(slideIdx + 1);
});

renderProfile(); renderStatic(); animateBars(); renderFilters(); renderProjects();
