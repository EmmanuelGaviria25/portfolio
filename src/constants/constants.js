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
    id: "work",
    title: "Proyectos",
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

// const experiences = [
//   {
//     title: "React.js Developer",
//     company_name: "Starbucks",
//     icon: starbucks,
//     iconBg: "#383E56",
//     date: "March 2020 - April 2021",
//     points: [
//       "Developing and maintaining web applications using React.js and other related technologies.",
//       "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
//       "Implementing responsive design and ensuring cross-browser compatibility.",
//       "Participating in code reviews and providing constructive feedback to other developers.",
//     ],
//   },
//   {
//     title: "React Native Developer",
//     company_name: "Tesla",
//     icon: tesla,
//     iconBg: "#E6DEDD",
//     date: "Jan 2021 - Feb 2022",
//     points: [
//       "Developing and maintaining web applications using React.js and other related technologies.",
//       "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
//       "Implementing responsive design and ensuring cross-browser compatibility.",
//       "Participating in code reviews and providing constructive feedback to other developers.",
//     ],
//   },
//   {
//     title: "Web Developer",
//     company_name: "Shopify",
//     icon: shopify,
//     iconBg: "#383E56",
//     date: "Jan 2022 - Jan 2023",
//     points: [
//       "Developing and maintaining web applications using React.js and other related technologies.",
//       "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
//       "Implementing responsive design and ensuring cross-browser compatibility.",
//       "Participating in code reviews and providing constructive feedback to other developers.",
//     ],
//   },
//   {
//     title: "Full stack Developer",
//     company_name: "Meta",
//     icon: meta,
//     iconBg: "#E6DEDD",
//     date: "Jan 2023 - Present",
//     points: [
//       "Developing and maintaining web applications using React.js and other related technologies.",
//       "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
//       "Implementing responsive design and ensuring cross-browser compatibility.",
//       "Participating in code reviews and providing constructive feedback to other developers.",
//     ],
//   },
// ];

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
  //  experiences,
  //  testimonials,
  projects,
};
