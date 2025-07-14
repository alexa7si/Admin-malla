// Cursos por ciclo según el plan 2022
const ciclos = [
  ['Nivelación en Matemáticas', 'Nivelación en Informática', 'Nivelación en Lenguaje'],
  ['Matemáticas I', 'Fundamentos de Contabilidad', 'Lenguaje I', 'Fundamentos de las Ciencias Empresariales'],
  ['Contabilidad Financiera Intermedia', 'Economía General I', 'Lenguaje II', 'Estadística I'],
  ['Matemáticas para los Negocios', 'Economía General II', 'Contabilidad para la Toma de Decisiones', 'Bloque de Ciencias Sociales', 'Investigación Académica'],
  ['Marketing Estratégico', 'Ética', 'Gestión de Personas', 'Bloque de Procesos Sociales', 'Bloque de Desarrollo del Pensamiento Crítico'],
  ['Fundamentos de Finanzas', 'Diseño Organizacional y Estrategia', 'Sistemas de Información y Análisis de Datos', 'Bloque Desarrollo Personal', 'Gestión del Comercio Internacional'],
  ['Análisis Multivariado para los Negocios', 'Investigación de Mercados', 'Proyección Social', 'Bloque de Procesos Sociales', 'Métodos Cuantitativos para la Gestión'],
  ['Finanzas Corporativas I', 'Gestión del Cambio y Transformación Cultural', 'Derecho Civil y Comercial', 'Gestión de Operaciones', 'Bloque de Desarrollo del Pensamiento Crítico'],
  ['Evaluación Financiera', 'Gestión Internacional de Empresas', 'Gestión de la Cadena de Suministros', 'Derecho Laboral y Tributario', 'Creación de Valor y Toma de Decisiones'],
  ['Investigación Aplicada a los Negocios', 'Dirección Estratégica', 'Proyecto Empresarial', 'Gestión de la Sostenibilidad']
];

// Relaciones (dependencias) extraídas del flujograma
const edges = [
  ['Nivelación en Matemáticas', 'Matemáticas I'],
  ['Matemáticas I', 'Matemáticas para los Negocios'],
  ['Matemáticas I', 'Estadística I'],
  ['Fundamentos de Contabilidad', 'Contabilidad Financiera Intermedia'],
  ['Contabilidad Financiera Intermedia', 'Contabilidad para la Toma de Decisiones'],
  ['Economía General I', 'Economía General II'],
  ['Marketing Estratégico', 'Investigación de Mercados'],
  ['Fundamentos de Finanzas', 'Finanzas Corporativas I'],
  ['Investigación Académica', 'Investigación de Mercados'],
  ['Investigación de Mercados', 'Investigación Aplicada a los Negocios'],
  ['Gestión del Cambio y Transformación Cultural', 'Dirección Estratégica'],
  ['Evaluación Financiera', 'Proyecto Empresarial'],
  ['Gestión de la Cadena de Suministros', 'Proyecto Empresarial']
];

// Colores rosados por área
const areaColor = {
  'Contabilidad': '#d63384',
  'Economía': '#f783ac',
  'Matemáticas': '#faa2c1',
  'Marketing': '#fcc2d7',
  'Finanzas': '#e64980',
  'Gestión': '#f06595',
  'Derecho': '#ffb3c1',
  'Lenguaje': '#ffdeeb',
  'Investigación': '#f8bbd0',
  'Bloque': '#ffdce0',
  'Ética': '#f5c2e7',
  'Proyección': '#f3d3e9'
};

// Buscar cursos que se habilitan
const aprobados = new Set();
const conexiones = {};

edges.forEach(([origen, destino]) => {
  if (!conexiones[origen]) conexiones[origen] = [];
  conexiones[origen].push(destino);
});

function detectarColor(curso) {
  return Object.entries(areaColor).find(([clave]) => curso.includes(clave))?.[1] || '#ffc0cb';
}

function render() {
  const malla = document.getElementById('malla');
  malla.innerHTML = '';

  ciclos.forEach((cursos, idx) => {
    const col = document.createElement('div');
    col.className = 'columna';

    cursos.forEach(curso => {
      const div = document.createElement('div');
      div.className = 'curso';
      div.textContent = curso;
      div.style.background = detectarColor(curso);

      if (aprobados.has(curso)) div.classList.add('activo');

      div.onclick = () => {
        if (aprobados.has(curso)) {
          aprobados.delete(curso);
        } else {
          aprobados.add(curso);
          expandir(curso);
        }
        render();
      };

      col.appendChild(div);
    });

    malla.appendChild(col);
  });
}

function expandir(curso) {
  const siguientes = conexiones[curso] || [];
  siguientes.forEach(sig => aprobados.add(sig));
}

render();
