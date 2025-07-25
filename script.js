const ciclos = [
  // Ciclo 00
  ['Nivelación en Lenguaje', 'Nivelación en Matemáticas', 'Nivelación en Informática'],
  // Ciclo 01
  ['Fundamentos de las Ciencias Empresariales', 'Lenguaje I', 'Matemáticas I', 'Economía General I'],
  // Ciclo 02
  ['Matemáticas para los Negocios', 'Lenguaje II', 'Economía General II', 'Fundamentos de Contabilidad', 'Cursos de Ciencias Sociales'],
  // Ciclo 03
  ['Estadística I', 'Contabilidad Financiera Intermedia', 'Derecho Civil y Comercial', 'Cursos de Desarrollo Personal', 'Cursos de Pensamiento Crítico'],
  // Ciclo 04
  ['Diseño Organizacional y Estrategia', 'Fundamentos de Finanzas', 'Derecho Laboral y Tributario', 'Analí tica de Datos para los Negocios', 'Marketing Estratégico'],
  // Ciclo 05
  ['Contabilidad para la Toma de Decisiones', 'Métodos Cuantitativos para la Gestión en las Organizaciones', 'Análisis Multivariado para los Negocios', 'Gestión del Cambio y Transformación Cultural', 'Investigación de Mercados'],
  // Ciclo 06
  ['Finanzas Corporativas I', 'Gestión de Operaciones en las Organizaciones', 'Gestión de Personas', 'Innovación y Gestión en Negocios Digitales', 'Investigación Académica'],
  // Ciclo 07
  ['Evaluación Financiera de las Organizaciones', 'Sistemas de Información y Análisis de Datos', 'Gestión de la Cadena de Suministros', 'Creación de Valor y Toma de Decisiones', 'Gestión del Comercio Inernacional'],
  // Ciclo 08
  ['Business Agility', 'Gestión de la Sostenibilidad Social y Ambiental en las Empresas', 'Gestión Internacional de Empresas', 'Cursos de Procesos Sociales', 'Cursos de Quehacer Científico'],
  // Ciclo 09
  ['Dirección Estratégica', 'Investigación Aplicada a los Negocios', 'Cursos de Pensamiento Crítico', 'Ética'],
  // Ciclo 10
  ['Proyecto Empresarial', 'Proyección Social', 'Cursos de Procesos Sociales']
];

// ✅ Solo relaciones reales según flechas del flujograma
const edges = [
  ['Nivelación en Lenguaje', 'Lenguaje I'],
  ['Nivelación en Matemáticas', 'Matemáticas I'],
  ['Nivelación en Matemáticas', 'Economía General I'],
  ['Nivelación en Informática', 'Estadística I'],
  ['Nivelación en Informática', 'Fundamentos de Finanzas'],
  ['Lenguaje I', 'Lenguaje II'],
  ['Lenguaje II', 'Cursos de Procesos Sociales'],
  ['Fundamentos de las Ciencias Empresariales', 'Diseño Organizacional y Estrategia'],
  ['Fundamentos de las Ciencias Empresariales', 'Derecho Civil y Comercial'],
  ['Diseño Organizacional y Estrategia', 'Gestion del Cambio y Transformación Cultural'],
  ['Diseño Organizacional y Estrategia', 'Innovación y Gestión en Negocios Digitales'],
  ['Diseño Organizacional y Estrategia', 'Dirección Estratégica'],
  ['Diseño Organizacional y Estrategia', 'Gestión de la Sostenibilidad Social y Ambiental en las Empresas'],
  ['Diseño Organizacional y Estrategia', 'Gestión Internacional de las Empresas'],
  ['Derecho Civil y Comercial', 'Derecho Laboral y Tributario'],
  ['Fundamentos de Contabilidad', 'Contabilidad Financiera Intermedia'],
  ['Fundamentos de Contabilidad', 'Fundamentos de Finanzas'],
  ['Contabilidad Financiera Intermedia', 'Contabilidad para la Toma de Decisiones'],
  ['Economía General I', 'Economía General II'],
  ['Matemáticas I', 'Matemáticas para los Negocios'],
  ['Economía General II', 'Gestión del Comercio Internacional'],
  ['Matemáticas I', 'Estadística I'],
  ['Estadística I', 'Analí tica de Datos para los Negocios'],
  ['Estadística I', 'Finanzas Corporativas I'],
  ['Estadística I', 'Métodos Cuantitativos para la Gestión en las Organizaciones'],
  ['Métodos Cuantitativos para la Gestión en las Organizaciones', 'Gestión de Operaciones en las Organizaciones'],
  ['Gestión de Operaciones en las Organizaciones', 'Investigación Aplicada a los Negocios'],
  ['Gestión de Operaciones en las Organizaciones', 'Business Agility'],
  ['Gestión de Operaciones en las Organizaciones', 'Gestión de la Cadena de Suministros'],
  ['Gestión de Operaciones en las Organizaciones', 'Gestión de la Sostenibilidad Social y Ambiental en las Empresas'],
  ['Fundamentos de Finanzas', 'Finanzas Corporativas I'],
  ['Fundamentos de Finanzas', 'Creación de Valor y Toma de Decisiones'],
  ['Finanzas Corporativas I', 'Evaluación Financiera de las Organizaciones'],
  ['Finanzas Corporativas I', 'Dirección Estratégica'],
  ['Marketing Estratégico', 'Investigación de Mercados'],
  ['Marketing Estratégico', 'Gestión del Comercio Internacional'],
  ['Marketing Estratégico', 'Creación de Valor y Toma de Decisiones'], 
  ['Investigación Académica', 'Investigación Aplicada a los Negocios'],
  ['Investigación de Mercados', 'Gestión del Comercio Internacional'],
  ['Investigación de Mercados', 'Proyecto Empresarial'],
  ['Gestión del Cambio y Transformación Cultural', 'Gestión de Personas'],
  ['Gestión del Cambio y Transformación Cultural', 'Creación de Valor y Toma de Decisiones'],
  ['Evaluación Financiera de las Organizaciones', 'Proyecto Empresarial'],
  ['Gestión de la Cadena de Suministros', 'Proyecto Empresarial']
];

const aprobados = new Set();
const conexiones = {};
const prerrequisitos = {};

edges.forEach(([origen, destino]) => {
  if (!conexiones[origen]) conexiones[origen] = [];
  if (!prerrequisitos[destino]) prerrequisitos[destino] = [];
  conexiones[origen].push(destino);
  prerrequisitos[destino].push(origen);
});

function estaHabilitado(curso) {
  const requisitos = prerrequisitos[curso] || [];
  return requisitos.every(req => aprobados.has(req));
}
function render() {
  const malla = document.getElementById('malla');
  malla.innerHTML = '';

  ciclos.forEach(cursos => {
    const col = document.createElement('div');
    col.className = 'columna';

    cursos.forEach(curso => {
      const div = document.createElement('div');
      div.className = 'curso';
      div.textContent = curso;

      const aprobado = aprobados.has(curso);
      const habilitado = estaHabilitado(curso);

      if (aprobado) {
        div.classList.add('aprobado');
      } else if (habilitado) {
        div.classList.add('habilitado');
      }

      div.onclick = () => {
        if (aprobado) {
          aprobados.delete(curso);
        } else if (habilitado) {
          aprobados.add(curso);
        }
        render();
      };

      col.appendChild(div);
    });

    malla.appendChild(col);
  });
}

render();
