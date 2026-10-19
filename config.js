/* ===== CONFIGURACIÓN CENTRAL: edita aquí, no en main.js ===== */
const CONFIG = {
  perfil: {
    nombre: "[NOMBRE COMPLETO]",
    cargo: "Analista de Datos",
    ubicacion: "[CIUDAD, COLOMBIA]",
    foto: "assets/images/profile/foto.jpg",
    resumen: "Analista de datos enfocado en transformar información en conocimiento útil para la toma de decisiones.",
    cv: "assets/documents/cv/cv.pdf",            // "" para ocultar el botón
    correo: "[CORREO PROFESIONAL]",
    linkedin: "",                                 // pega tu enlace; vacío = oculto
    github: ""
  },
  sobreMi: [
    "Soy analista de datos interesado en transformar información en conocimiento útil para la toma de decisiones. [EDITA ESTE TEXTO]",
    "Mi trabajo se orienta a: análisis de datos, automatización de procesos, inteligencia de negocios, visualización de indicadores, optimización de procesos empresariales y desarrollo de soluciones con herramientas digitales. [CONFIRMA Y AJUSTA]"
  ],
  formacion: [
    { institucion: "[INSTITUCIÓN]", logo: "", programa: "[PROGRAMA ACADÉMICO]", fechaInicio: "", fechaFin: "", estado: "En curso", descripcion: "", demo: true }
  ],
  experiencia: [
    { empresa: "[EMPRESA 1]", logo: "", cargo: "[CARGO]", inicio: "2024-01", fin: "", descripcion: "[Descripción del cargo]",
      responsabilidades: ["[Análisis y transformación de datos]", "[Construcción de informes]"], logros: [], demo: true },
    { empresa: "[EMPRESA 2]", logo: "", cargo: "[CARGO]", inicio: "2022-01", fin: "2023-12", descripcion: "[Descripción del cargo]",
      responsabilidades: ["[Automatización de procesos]", "[Elaboración de tableros de control]"], logros: [], demo: true }
  ],
  // nivel: Básico | Intermedio | Avanzado. Valores de DEMOSTRACIÓN: reemplázalos por los reales.
  herramientas: [
    { nombre: "Microsoft Excel", logo: "assets/images/tools/excel.png", nivel: "Intermedio", porcentaje: 50 },
    { nombre: "SQL", logo: "assets/images/tools/sql.png", nivel: "Intermedio", porcentaje: 50 },
    { nombre: "Power BI", logo: "assets/images/tools/power-bi.png", nivel: "Intermedio", porcentaje: 50 },
    { nombre: "Python", logo: "assets/images/tools/python.png", nivel: "Intermedio", porcentaje: 50 },
    { nombre: "Looker Studio", logo: "assets/images/tools/looker-studio.png", nivel: "Intermedio", porcentaje: 50 },
    { nombre: "SolidWorks", logo: "assets/images/tools/solidworks.png", nivel: "Intermedio", porcentaje: 50 },
    { nombre: "AppSheet", logo: "assets/images/tools/appsheet.png", nivel: "Intermedio", porcentaje: 50 },
    { nombre: "Google Apps Script", logo: "assets/images/tools/apps-script.png", nivel: "Intermedio", porcentaje: 50 }
  ],
  herramientasDemo: true,
  filtros: ["Todos", "Power BI", "Looker Studio", "AppSheet", "Google Apps Script", "Python", "SQL"],
  /* PROYECTOS. tecnologia debe coincidir con un filtro.
     imagenes: rutas locales (carrusel). pdf: ruta local, "" = oculto.
     botones: activa/desactiva demo, documentacion, repositorio. */
  proyectos: [
    { id: "demo-pbi", demo: true, tecnologia: "Power BI", titulo: "Tablero de ventas (DEMOSTRACIÓN)",
      portada: "assets/images/projects/power-bi/demo-1.png",
      imagenes: ["assets/images/projects/power-bi/demo-1.png", "assets/images/projects/power-bi/demo-2.png"],
      descripcion: "Proyecto de ejemplo. Reemplázalo por uno real.", problema: "[Problema que resuelve]", objetivo: "[Objetivo]",
      solucion: "[Solución implementada]", funcionalidades: ["[Funcionalidad 1]", "[Funcionalidad 2]"], herramientas: ["Power BI"],
      resultados: [], demoUrl: "", repoUrl: "", pdf: "", botones: { demo: false, documentacion: false, repositorio: false } },
    { id: "demo-sql", demo: true, tecnologia: "SQL", titulo: "Análisis con SQL (DEMOSTRACIÓN)",
      portada: "", imagenes: [], descripcion: "Proyecto de ejemplo.", problema: "[Problema]", objetivo: "[Objetivo]",
      solucion: "", funcionalidades: [], herramientas: ["SQL"], metodologia: "[Metodología]",
      consultas: "SELECT categoria, SUM(valor) AS total\nFROM ventas\nGROUP BY categoria;",
      resultados: [], demoUrl: "", repoUrl: "", pdf: "assets/documents/sql/demo.pdf", botones: { demo: false, documentacion: true, repositorio: false } }
  ]
};
