import {
  mobile,
  backend,
  web,
  architecture,
  leader,
  devops,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  carrent,
  jobit,
  inkSync,
  tracker,
  threejs,
  nextjs,
  express,
  java,
  jwt,
  nextauth,
  socialSphere,
  springboot,
  prontury,
  pronterasst,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "Sobre mí",
  },
  {
    id: "tech",
    title: "Habilidades",
  },
  {
    id: "work",
    title: "Proyectos",
  },
  {
    id: "experience",
    title: "Experiencia",
  },
  {
    id: "contact",
    title: "Contacto",
  },
];

const services = [
  {
    title: "Desarrollador Frontend",
    icon: web,
  },
  {
    title: "Desarrollador Backend",
    icon: backend,
  },
  {
    title: "Desarrollador Mobile",
    icon: mobile,
  },
  {
    title: "Arquitecto de Software",
    icon: architecture,
  },
  {
    title: "Líder Técnico & Coordinador",
    icon: leader,
  },
  {
    title: "Especialista Cloud & DevOps",
    icon: devops,
  },
];

const technologies = [
  {
    name: "React JS",
    icon: reactjs,
    position: [0, 0, 0],
  },
  {
    name: "Next JS",
    icon: nextjs,
    position: [2, 0, 0],
  },
  {
    name: "Express JS",
    icon: express,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Spring Boot",
    icon: springboot,
  },
  {
    name: "JWT",
    icon: jwt,
  },
  {
    name: "NextAuth",
    icon: nextauth,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const projects = [
  {
    name: "Prontury",
    description:
      "Plataforma integral para la transformación digital de municipios, diseñada para potenciar el turismo y el comercio local de manera ágil y escalable.",
    features: [
      "Permite a las administraciones municipales crear su identidad digital oficial de forma rápida.",
      "Facilita la promoción interactiva de hoteles, restaurantes, sitios turísticos e iniciativas comerciales locales.",
      "Funciona como una guía oficial en tiempo real con búsquedas dinámicas e información local de interés.",
      "Impulsa el desarrollo económico regional y la visibilidad de los comercios locales en la web."
    ],
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Next.js",
        color: "orange-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
    ],
    image: prontury,
    source_code_link: "https://github.com/EmmanuelGaviria25",
    live_link: "https://www.prontury.com",
  },
  {
    name: "Prontera SST",
    description:
      "Sistema de gestión integral para la Seguridad y Salud en el Trabajo (SST), optimizando el seguimiento de riesgos, cumplimiento normativo y bienestar laboral.",
    features: [
      "Módulo avanzado para el registro y clasificación de riesgos laborales y planes de acción preventivos.",
      "Panel de control interactivo con visualización en tiempo real de indicadores clave de seguridad y cumplimiento normativo.",
      "Gestión simplificada de capacitaciones, reportes de incidentes, actas y documentación de empleados.",
      "Garantiza el cumplimiento normativo mediante flujos de trabajo automatizados y alertas dinámicas."
    ],
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Next.js",
        color: "orange-text-gradient",
      },
      {
        name: "TypeScript",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
      },
    ],
    image: pronterasst,
    source_code_link: "https://github.com/EmmanuelGaviria25",
    live_link: "https://pronterasst.vercel.app",
  }
];

const experiences = [
  {
    title: "COORDINADOR DE DESARROLLO",
    company_name: "Informa Colombia",
    icon: leader,
    iconBg: "#383E56",
    date: "MARZO 2024 - ACTUALMENTE",
    points: [
      "Liderazgo técnico y coordinación de equipos de desarrollo full stack, asegurando entregas de alta calidad bajo metodologías ágiles.",
      "Diseño e implementación de arquitecturas escalables, seguras y orientadas a rendimiento para aplicaciones web y móviles.",
      "Gestión integral de proyectos tecnológicos, alineando objetivos técnicos con necesidades del negocio.",
      "Supervisión de buenas prácticas de desarrollo: Git, CI/CD, code reviews, testing automatizado y patrones de diseño.",
      "Garantía de estándares de accesibilidad, seguridad y optimización continua de plataformas digitales.",
    ],
  },
  {
    title: "DESARROLLADOR BACKEND SENIOR",
    company_name: "Banco Pichincha",
    icon: backend,
    iconBg: "#E6DEDD",
    date: "JULIO 2024 - DICIEMBRE 2024",
    points: [
      "Diseño y desarrollo de microservicios escalables con Node.js y Spring Boot.",
      "Gestión y optimización de bases de datos (MySQL, MongoDB) con uso de ORM.",
      "Desarrollo de integraciones mediante consumo de APIs y mensajería asincrónica (RabbitMQ, Kafka).",
      "Automatización con CI/CD utilizando Azure DevOps.",
    ],
  },
  {
    title: "DESARROLLADOR SOFTWARE",
    company_name: "Cobis",
    icon: web,
    iconBg: "#383E56",
    date: "NOVIEMBRE 2022 - ENERO 2024",
    points: [
      "Estuve desarrollando varias aplicaciones web con React y NextJs. de un sistema de gestión de cliente desde la web.",
      "Estuve desarrollando una aplicación backend para Java, implementando API RESTFUL con Spring framework.",
      "Implementé la integración continua y la implementación continua con Azure DevOps para la implementación de aplicaciones y la administración de servidores.",
    ],
  },
  {
    title: "DESARROLLADOR SOFTWARE",
    company_name: "Team International",
    icon: architecture,
    iconBg: "#E6DEDD",
    date: "MARZO 2023 - AGOSTO 2023",
    points: [
      "Desempeñé el rol de proveedor en Datacrédito, donde desarrollé módulos para aplicaciones web utilizando Java Spring Boot y Angular, optimizando las funcionalidades y mejorando la experiencia de usuario.",
      "Implementé diversos servicios de AWS como Docker, EKS, RDS, y Secret Manager, lo que mejoró la escalabilidad, seguridad y gestión de los recursos en la nube.",
      "Configuré y gestioné procesos de integración continua (CI) y entrega continua (CD) utilizando Azure DevOps, automatizando los despliegues de aplicaciones y la administración eficiente de servidores.",
    ],
  },
  {
    title: "DESARROLLADOR FULL-STACK SENIOR",
    company_name: "Sofka Tecnologíes",
    icon: web,
    iconBg: "#383E56",
    date: "MARZO 2022 - MARZO 2023",
    points: [
      "Gestión de proyectos para Grupo Argos: Desarrollé nuevos módulos y funcionalidades para aplicaciones en Node.js y Angular, mejorando la experiencia del usuario y optimizando el rendimiento de las aplicaciones.",
      "Integración de servicios en la nube: Implementé servicios de AWS (Amazon Web Services), incluyendo Lambda, EC2, y S3, para el manejo eficiente de datos y almacenamiento en la nube.",
      "Automatización y despliegue continuo: Configuré pipelines de Azure DevOps para la integración y entrega continua (CI/CD), garantizando la calidad y rapidez en el despliegue de los aplicativos.",
    ],
  },
  {
    title: "DESARROLLADOR FULL-STACK SENIOR",
    company_name: "IASSoftware",
    icon: backend,
    iconBg: "#E6DEDD",
    date: "MARZO 2021 - MARZO 2022",
    points: [
      "Colaboración con Bancolombia: Diseñé y desarrollé nuevos módulos para aplicaciones empresariales utilizando Spring Boot en el backend y Angular en el frontend, mejorando la escalabilidad y el rendimiento de los sistemas existentes.",
      "Integración con servicios en la nube: Implementé soluciones basadas en AWS (como RDS, S3, y Lambda) para optimizar la gestión de datos, almacenamiento y procesamiento de información crítica.",
      "Automatización y despliegue continuo: Configuré y administré pipelines de Azure DevOps para garantizar la entrega continua (CI/CD) de aplicaciones, minimizando el tiempo de inactividad durante las implementaciones.",
      "Mejora en la seguridad: Apliqué prácticas de codificación segura y configuré controles de acceso en AWS para proteger los datos y cumplir con las normativas de la industria financiera.",
      "Trabajo en equipos ágiles: Participé en equipos multidisciplinarios utilizando Scrum y otras metodologías ágiles para coordinar entregables y garantizar la calidad del software desarrollado.",
    ],
  },
  {
    title: "DESARROLLADOR FULL-STACK SENIOR",
    company_name: "Matrixtech",
    icon: leader,
    iconBg: "#383E56",
    date: "AGOSTO 2020 - MARZO 2021",
    points: [
      "Participación en el desarrollo de aplicaciones de GANA: Formé parte del equipo encargado de las aplicaciones cliente de GANA, colaborando en el diseño e implementación de soluciones innovadoras para el mercado de apuestas y servicios financieros.",
      "Liderazgo de equipo: Dirigí un equipo de tres desarrolladores, coordinando con equipos multidisciplinarios para garantizar la integración y entrega oportuna de proyectos.",
      "Desarrollo del módulo SuperChance: Diseñé y desarrollé el módulo SuperChance para la aplicación de GANA, utilizando React en el frontend y complementos de Java EE para el backend, mejorando la experiencia de usuario y la funcionalidad del servicio.",
      "Desarrollo del módulo Raspita: Implementé el módulo Raspita para las aplicaciones web y móviles de GANA, utilizando Android Studio y Java para el frontend, e integrando plugins de Java EE para las operaciones backend.",
      "Colaboración interfuncional: Coordiné con equipos de diseño, QA y soporte técnico para garantizar la calidad del producto y la resolución de problemas antes del lanzamiento.",
    ],
  },
  {
    title: "ANALISTA DESARROLLADOR TI 2",
    company_name: "Konecta Fabrica de Software",
    icon: web,
    iconBg: "#E6DEDD",
    date: "MAYO 2018 - AGOSTO 2020",
    points: [
      "Optimización de procesos de negocio: Trabajé en el equipo de desarrollo encargado de mejorar la gestión de procesos empresariales en las aplicaciones de Konecta, implementando soluciones tecnológicas que optimizaron la eficiencia operativa.",
      "Pionero en Angular: Introduje Angular 8+ en la empresa como nueva tecnología de frontend, liderando su adopción y capacitando al equipo en el uso de este framework para crear aplicaciones web modernas y escalables.",
      "Desarrollo full-stack: Implementé desarrollos con jQuery para el frontend y Spring Framework para el backend, asegurando una integración fluida entre ambas capas.",
      "Migración tecnológica: Rediseñé una aplicación existente para actualizar su arquitectura, migrándola de ExtJS a una solución basada en Bootstrap, mejorando la experiencia del usuario y la mantenibilidad del sistema.",
      "Colaboración y mentoría: Actué como mentor para otros desarrolladores, compartiendo conocimientos y promoviendo buenas prácticas de desarrollo en la empresa.",
    ],
  },
  {
    title: "DESARROLLADOR FULL-STACK",
    company_name: "Neo Koolumbia",
    icon: backend,
    iconBg: "#383E56",
    date: "SEPTIEMBRE 2016 - ABRIL 2018",
    points: [
      "Desarrollo de aplicaciones empresariales: Diseñé e implementé soluciones completas como desarrollador fullstack, utilizando AngularJS para el frontend y Java para el backend.",
      "Optimización de rendimiento: Trabajé en la mejora del rendimiento y la escalabilidad de las aplicaciones, asegurando tiempos de respuesta más rápidos y una experiencia de usuario fluida.",
      "Colaboración con equipos multidisciplinarios: Coordiné con equipos de diseño, QA y gestión de proyectos para garantizar entregas alineadas con los requisitos del cliente y altos estándares de calidad.",
      "Mantenimiento y mejora continua: Realicé tareas de mantenimiento en aplicaciones existentes, implementando nuevas funcionalidades y corrigiendo errores para garantizar un rendimiento óptimo.",
    ],
  },
  {
    title: "PRACTICANTE FULL-STACK",
    company_name: "YuxiGlobal",
    icon: web,
    iconBg: "#E6DEDD",
    date: "MARZO 2016 - AGOSTO 2016",
    points: [
      "Desarrollo de aplicaciones web y móviles: Diseñé e implementé soluciones completas para aplicaciones empresariales en diversas plataformas, trabajando en proyectos de frontend, backend y bases de datos.",
      "Frontend: Implementé interfaces dinámicas y responsivas utilizando AngularJS, HTML, CSS y desarrollé aplicaciones móviles con Android nativo.",
      "Integré servicios web RESTful para garantizar una comunicación fluida entre las capas del sistema.",
      "Backend: Desarrollé y optimicé servicios y APIs con Java, Spring Framework, y herramientas como Hibernate y Maven para la gestión eficiente del ciclo de vida del desarrollo.",
      "Gestión de bases de datos: Diseñé y administré bases de datos relacionales utilizando MySQL, PostgreSQL, SQL Server, y otras tecnologías de gestión de datos para soportar las aplicaciones.",
      "Colaboración en equipo: Trabajé junto a equipos multidisciplinarios para garantizar el cumplimiento de los objetivos de los proyectos dentro de los plazos establecidos.",
    ],
  },
];

// const testimonials = [
//   {
//     testimonial:
//       "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
//     name: "Sara Lee",
//     designation: "CFO",
//     company: "Acme Co",
//     image: "https://randomuser.me/api/portraits/women/4.jpg",
//   },
//   {
//     testimonial:
//       "I've never met a web developer who truly cares about their clients' success like Rick does.",
//     name: "Chris Brown",
//     designation: "COO",
//     company: "DEF Corp",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//   },
//   {
//     testimonial:
//       "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
//     name: "Lisa Wang",
//     designation: "CTO",
//     company: "456 Enterprises",
//     image: "https://randomuser.me/api/portraits/women/6.jpg",
//   },
// ];

export {
  services,
  technologies,
  experiences,
  //  testimonials,
  projects,
};
