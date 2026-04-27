export interface AreaInfo {
  id: string;
  name: string;
  description: string;
  image: string;
  fullDescription: string;
  gallery?: string[];
}

export const areasData: AreaInfo[] = [
  {
    id: "agrimensura",
    name: "Agrimensura",
    description: "Medición y delimitación de predios, relevamientos topográficos y cartografía.",
    image: "https://akhydra.com.ar/wp-content/uploads/2023/01/agrimensura_nuevo_3.jpg",
    fullDescription: "Nuestro departamento de agrimensura combina tecnología GPS de última generación con métodos tradicionales de precisión para garantizar la exacta delimitación de parcelas, relevamientos altimétricos y apoyo técnico a proyectos de infraestructura de gran escala.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2023/01/agrimensura_nuevo_2.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2023/01/agrimensura_nuevo_1.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/05/agrimensura_1.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/05/agrimensura_3.jpg"
    ]
  },
  {
    id: "ambiental",
    name: "Ambiental",
    description: "Estudios de impacto, gestión de residuos y soluciones sostenibles.",
    image: "https://akhydra.com.ar/wp-content/uploads/2023/10/ambiental0001-scaled.jpg",
    fullDescription: "Brindamos consultoría ambiental integral, realizando evaluaciones de impacto ambiental (EIA), planes de gestión de residuos y estrategias de mitigación para asegurar que cada proyecto cumpla con las normativas vigentes y respete el ecosistema local.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2022/08/ambiental_001.jpeg",
      "https://akhydra.com.ar/wp-content/uploads/2022/08/ambiental_002.jpeg",
      "https://akhydra.com.ar/wp-content/uploads/2022/08/ambiental_003.jpeg",
      "https://akhydra.com.ar/wp-content/uploads/2023/10/ambiental0002-1024x472.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/05/ambiental_2.jpg"
    ]
  },
  {
    id: "arquitectura",
    name: "Arquitectura",
    description: "Diseño espacial, funcional y estético de edificaciones dinámicas.",
    image: "https://akhydra.com.ar/wp-content/uploads/2021/05/arquitectura_1.jpg",
    fullDescription: "Integramos la ingeniería con la arquitectura para crear espacios que no solo sean estructuralmente sólidos, sino también funcionales y estéticamente inspiradores, optimizando el uso de recursos y mejorando la calidad de vida de los usuarios.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2021/05/arquitectura_3.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/05/arquitectura_2.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/05/arquitectura_5.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/05/arquitectura_6.jpg"
    ]
  },
  {
    id: "asesoramiento",
    name: "Asesoramiento",
    description: "Consultoría estratégica para la toma de decisiones técnicas.",
    image: "https://akhydra.com.ar/wp-content/uploads/2021/06/legal_2.jpg",
    fullDescription: "Acompañamos a nuestros clientes en todas las etapas de sus proyectos, ofreciendo asesoramiento técnico, económico y legal que permite minimizar riesgos y maximizar el retorno de la inversión en obras de ingeniería civil e industrial.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2021/06/papeles_legales.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/legal_3.jpg"
    ]
  },
  {
    id: "civil",
    name: "Civil",
    description: "Cálculo estructural, diseño de cimientos y supervisión de obra.",
    image: "https://akhydra.com.ar/wp-content/uploads/2023/07/civil_06-1024x768.jpg",
    fullDescription: "La ingeniería civil es el pilar de nuestra empresa. Diseñamos estructuras resistentes, duraderas y seguras, aplicando las últimas normas de cálculo y utilizando materiales de alta tecnología para garantizar la estabilidad de cada construcción.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2023/07/civil_05-1024x768.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2023/07/civil_04-1024x768.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/05/civil_01.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/05/civil_02.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/05/civil_03.jpg"
    ]
  },
  {
    id: "eng-renovables",
    name: "Eng. Renovables",
    description: "Sistemas fotovoltaicos, eólicos y eficiencia energética.",
    image: "http://akhydra.com.ar/wp-content/uploads/2021/05/energia_01.jpg",
    fullDescription: "Desarrollamos proyectos de energías limpias que permiten a empresas y municipios reducir su huella de carbono. Nos especializamos en la implementación de parques solares, energía eólica y sistemas híbridos de generación.",
    gallery: [
      "http://akhydra.com.ar/wp-content/uploads/2021/05/energia_02.jpg",
      "http://akhydra.com.ar/wp-content/uploads/2021/05/energia_03.jpg"
    ]
  },
  {
    id: "ferrocarril",
    name: "Ferrocarril",
    description: "Ingeniería de vías, señalización e infraestructura ferroviaria.",
    image: "https://akhydra.com.ar/wp-content/uploads/2023/08/ferrocarril_01.jpg",
    fullDescription: "Contamos con especialistas en transporte ferroviario para el diseño y mantenimiento de vías, estaciones y sistemas de señalización, optimizando la logística y seguridad en el transporte de cargas y pasajeros.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2021/06/ferrocaril_02.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/ferrocaril_03.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/ferrocaril_04.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2023/10/ferrocarril_01-1024x528.jpg"
    ]
  },
  {
    id: "geologia",
    name: "Geología",
    description: "Estudio de suelos, rocas y procesos terrestres aplicados.",
    image: "https://akhydra.com.ar/wp-content/uploads/2023/10/geologia_2023-1024x472.jpg",
    fullDescription: "El conocimiento del terreno es crucial. Realizamos estudios geológicos detallados para identificar potenciales riesgos naturales, ubicar recursos hídricos subterráneos y proveer los datos base para cualquier cimentación profunda.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2022/08/geologia_02.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/geologia.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2024/07/Geologia-1-1024x683.jpeg",
      "https://akhydra.com.ar/wp-content/uploads/2024/07/Geologia-2-790x1024.jpeg"
    ]
  },
  {
    id: "geotecnia",
    name: "Geotecnia",
    description: "Mecánica de suelos y diseño de fundaciones especiales.",
    image: "https://akhydra.com.ar/wp-content/uploads/2021/06/geotecnia.jpg",
    fullDescription: "Analizamos el comportamiento de los suelos bajo cargas estructurales. Diseñamos pilotes, muros de contención y soluciones de estabilización de taludes, asegurando que la obra tenga la base más sólida posible.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2025/01/GEOTECNIA.2.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/geotecnia_01.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2025/01/GEOTECNIA.1.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/geotecnia_03.jpg"
    ]
  },
  {
    id: "gestoria",
    name: "Gestoría",
    description: "Tramitaciones municipales, provinciales y aprobación de planos.",
    image: "http://akhydra.com.ar/wp-content/uploads/2023/07/gestoria_01.jpg",
    fullDescription: "Agilizamos el camino burocrático de sus proyectos. Nos encargamos de todas las gestiones ante entes reguladores, asegurando la obtención de permisos y habilitaciones en los tiempos planificados.",
    gallery: [
      "http://akhydra.com.ar/wp-content/uploads/2023/07/gestoria_02.jpg",
      "http://akhydra.com.ar/wp-content/uploads/2023/07/gestoria_03.jpg",
      "http://akhydra.com.ar/wp-content/uploads/2023/07/gestoria_04.jpg",
      "http://akhydra.com.ar/wp-content/uploads/2023/07/gestoria_05.jpg",
      "http://akhydra.com.ar/wp-content/uploads/2023/07/gestoria_06-611x1024.jpg"
    ]
  },
  {
    id: "hidraulica",
    name: "Hidráulica",
    description: "Acueductos, canales, presas y control de inundaciones.",
    image: "https://akhydra.com.ar/wp-content/uploads/2021/06/hidraulica_01.png",
    fullDescription: "AKHYDRA tiene sus raíces en la ingeniería hidráulica. Diseñamos infraestructuras para el manejo inteligente del agua, desde sistemas de drenaje urbano hasta complejos hidromecánicos de gran escala.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2022/08/hidraulica_00.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/hidraulica_02.png",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/hidraulica_03.png"
    ]
  },
  {
    id: "higiene-seguridad",
    name: "Higiene & Seguridad",
    description: "Prevención de riesgos laborales y normativas de seguridad.",
    image: "https://akhydra.com.ar/wp-content/uploads/2021/06/seguridad_01.jpg",
    fullDescription: "Protegemos el capital humano. Desarrollamos planes de Higiene y Seguridad en el Trabajo, capacitaciones y auditorías en obra para garantizar un entorno laboral seguro y libre de accidentes.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2021/06/seguridad_02.jpg"
    ]
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Plantas industriales, naves y procesos de producción.",
    image: "https://akhydra.com.ar/wp-content/uploads/2021/06/industrial_01.jpg",
    fullDescription: "Diseñamos y optimizamos espacios de producción. Desde naves logísticas hasta plantas de proceso pesado, enfocándonos en la eficiencia operativa y la integración tecnológica de los sistemas industriales.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2021/06/industrial_02.jpg"
    ]
  },
  {
    id: "mecanica",
    name: "Mecánica",
    description: "Diseño de maquinaria, estructuras metálicas y sistemas HVAC.",
    image: "http://akhydra.com.ar/wp-content/uploads/2021/06/refrigeracion.jpg",
    fullDescription: "Especialistas en ingeniería mecánica para el diseño de componentes, estructuras metálicas complejas y sistemas de climatización industrial, garantizando el correcto funcionamiento térmico y cinético de las instalaciones.",
    gallery: [
      "http://akhydra.com.ar/wp-content/uploads/2021/06/kelvineau-1024x448.png",
      "http://akhydra.com.ar/wp-content/uploads/2021/06/mecanica.jpeg"
    ]
  },
  {
    id: "sanitaria",
    name: "Sanitaria",
    description: "Tratamiento de efluentes, potabilización y redes cloacales.",
    image: "https://akhydra.com.ar/wp-content/uploads/2022/11/sanitaria-1024x471.jpeg",
    fullDescription: "Desarrollamos soluciones para el saneamiento básico, diseñando plantas potabilizadoras y de tratamiento de aguas residuales que garantizan la salud pública y la protección de los cursos de agua.",
    gallery: [
      "https://akhydra.com.ar/wp-content/uploads/2021/06/asequia.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/drenaje_urbano1.jpg",
      "https://akhydra.com.ar/wp-content/uploads/2021/06/agua1.jpg"
    ]
  },
  {
    id: "vial",
    name: "Vial",
    description: "Diseño geométrico de carreteras, pavimentos y puentes.",
    image: "http://akhydra.com.ar/wp-content/uploads/2022/11/Vial-1-1024x576.jpeg",
    fullDescription: "Planificamos y diseñamos la infraestructura del transporte. Nos especializamos en la ingeniería de pavimentos rígidos y flexibles, diseño vial urbano y rural, y proyectos de señalización integral.",
    gallery: [
      "http://akhydra.com.ar/wp-content/uploads/2022/11/Vial-2-1024x472.jpeg",
      "http://akhydra.com.ar/wp-content/uploads/2022/11/Vial-3-1024x471.jpeg",
      "http://akhydra.com.ar/wp-content/uploads/2021/06/pavimento_1.jpg",
      "http://akhydra.com.ar/wp-content/uploads/2021/06/pavimento.png"
    ]
  }
];
