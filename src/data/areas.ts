
export interface AreaInfo {
  id: string;
  name: string;
  description: string;
  image: string;
  fullDescription: string;
}

export const areasData: AreaInfo[] = [
  {
    id: "agrimensura",
    name: "Agrimensura",
    description: "Medición y delimitación de predios, relevamientos topográficos y cartografía.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Nuestro departamento de agrimensura combina tecnología GPS de última generación con métodos tradicionales de precisión para garantizar la exacta delimitación de parcelas, relevamientos altimétricos y apoyo técnico a proyectos de infraestructura de gran escala."
  },
  {
    id: "ambiental",
    name: "Ambiental",
    description: "Estudios de impacto, gestión de residuos y soluciones sostenibles.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Brindamos consultoría ambiental integral, realizando evaluaciones de impacto ambiental (EIA), planes de gestión de residuos y estrategias de mitigación para asegurar que cada proyecto cumpla con las normativas vigentes y respete el ecosistema local."
  },
  {
    id: "arquitectura",
    name: "Arquitectura",
    description: "Diseño espacial, funcional y estético de edificaciones dinámicas.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Integramos la ingeniería con la arquitectura para crear espacios que no solo sean estructuralmente sólidos, sino también funcionales y estéticamente inspiradores, optimizando el uso de recursos y mejorando la calidad de vida de los usuarios."
  },
  {
    id: "asesoramiento",
    name: "Asesoramiento",
    description: "Consultoría estratégica para la toma de decisiones técnicas.",
    image: "https://images.unsplash.com/photo-1454165833767-131435bb4496?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Acompañamos a nuestros clientes en todas las etapas de sus proyectos, ofreciendo asesoramiento técnico, económico y legal que permite minimizar riesgos y maximizar el retorno de la inversión en obras de ingeniería civil e industrial."
  },
  {
    id: "civil",
    name: "Civil",
    description: "Cálculo estructural, diseño de cimientos y supervisión de obra.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "La ingeniería civil es el pilar de nuestra empresa. Diseñamos estructuras resistentes, duraderas y seguras, aplicando las últimas normas de cálculo y utilizando materiales de alta tecnología para garantizar la estabilidad de cada construcción."
  },
  {
    id: "eng-renovables",
    name: "Eng. Renovables",
    description: "Sistemas fotovoltaicos, eólicos y eficiencia energética.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Desarrollamos proyectos de energías limpias que permiten a empresas y municipios reducir su huella de carbono. Nos especializamos en la implementación de parques solares, energía eólica y sistemas híbridos de generación."
  },
  {
    id: "ferrocarril",
    name: "Ferrocarril",
    description: "Ingeniería de vías, señalización e infraestructura ferroviaria.",
    image: "https://images.unsplash.com/photo-1474487056435-c545233fb1e6?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Contamos con especialistas en transporte ferroviario para el diseño y mantenimiento de vías, estaciones y sistemas de señalización, optimizando la logística y seguridad en el transporte de cargas y pasajeros."
  },
  {
    id: "geologia",
    name: "Geología",
    description: "Estudio de suelos, rocas y procesos terrestres aplicados.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "El conocimiento del terreno es crucial. Realizamos estudios geológicos detallados para identificar potenciales riesgos naturales, ubicar recursos hídricos subterráneos y proveer los datos base para cualquier cimentación profunda."
  },
  {
    id: "geotecnia",
    name: "Geotecnia",
    description: "Mecánica de suelos y diseño de fundaciones especiales.",
    image: "https://images.unsplash.com/photo-1534643944416-9ac83deb4a0a?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Analizamos el comportamiento de los suelos bajo cargas estructurales. Diseñamos pilotes, muros de contención y soluciones de estabilización de taludes, asegurando que la obra tenga la base más sólida posible."
  },
  {
    id: "gestoria",
    name: "Gestoría",
    description: "Tramitaciones municipales, provinciales y aprobación de planos.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Agilizamos el camino burocrático de sus proyectos. Nos encargamos de todas las gestiones ante entes reguladores, asegurando la obtención de permisos y habilitaciones en los tiempos planificados."
  },
  {
    id: "hidraulica",
    name: "Hidráulica",
    description: "Acueductos, canales, presas y control de inundaciones.",
    image: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "AKHYDRA tiene sus raíces en la ingeniería hidráulica. Diseñamos infraestructuras para el manejo inteligente del agua, desde sistemas de drenaje urbano hasta complejos hidromecánicos de gran escala."
  },
  {
    id: "higiene-seguridad",
    name: "Higiene & Seguridad",
    description: "Prevención de riesgos laborales y normativas de seguridad.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Protegemos el capital humano. Desarrollamos planes de Higiene y Seguridad en el Trabajo, capacitaciones y auditorías en obra para garantizar un entorno laboral seguro y libre de accidentes."
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Plantas industriales, naves y procesos de producción.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5efa61df?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Diseñamos y optimizamos espacios de producción. Desde naves logísticas hasta plantas de proceso pesado, enfocándonos en la eficiencia operativa y la integración tecnológica de los sistemas industriales."
  },
  {
    id: "mecanica",
    name: "Mecánica",
    description: "Diseño de maquinaria, estructuras metálicas y sistemas HVAC.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5efa61df?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Especialistas en ingeniería mecánica para el diseño de componentes, estructuras metálicas complejas y sistemas de climatización industrial, garantizando el correcto funcionamiento térmico y cinético de las instalaciones."
  },
  {
    id: "sanitaria",
    name: "Sanitaria",
    description: "Tratamiento de efluentes, potabilización y redes cloacales.",
    image: "https://images.unsplash.com/photo-1558444479-c8a027920927?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Desarrollamos soluciones para el saneamiento básico, diseñando plantas potabilizadoras y de tratamiento de aguas residuales que garantizan la salud pública y la protección de los cursos de agua."
  },
  {
    id: "vial",
    name: "Vial",
    description: "Diseño geométrico de carreteras, pavimentos y puentes.",
    image: "https://img.freepik.com/foto-gratis/carretera-asfalto-vacia-atardecer_1127-3136.jpg",
    fullDescription: "Planificamos y diseñamos la infraestructura del transporte. Nos especializamos en la ingeniería de pavimentos rígidos y flexibles, diseño vial urbano y rural, y proyectos de señalización integral."
  }
];
