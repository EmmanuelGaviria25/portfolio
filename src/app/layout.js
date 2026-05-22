import { Toaster } from "react-hot-toast";
import "./globals.css";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  metadataBase: new URL("https://www.emma-dev.com"),
  title: {
    default: "Emmanuel Gaviria | Ingeniero de Software & Desarrollador Full-Stack",
    template: "%s | Emmanuel Gaviria"
  },
  description: "Portafolio profesional de Emmanuel Gaviria, Ingeniero de Software, Líder Técnico y Desarrollador Full-Stack. Especialista en React, Next.js, Angular, Node.js, Spring Boot y arquitecturas en la nube (AWS/DevOps) de alto rendimiento.",
  keywords: [
    "Emmanuel Gaviria",
    "Emmanuel Gaviria Software",
    "Ingeniero de Software",
    "Desarrollador Full-Stack",
    "Desarrollador React",
    "Desarrollador Next.js",
    "Desarrollador Angular",
    "Java Spring Boot",
    "Líder Técnico",
    "Coordinador de Desarrollo",
    "Portafolio Desarrollador",
    "Desarrollo Web Colombia",
    "Cloud & DevOps Specialist"
  ],
  authors: [{ name: "Emmanuel Gaviria", url: "https://www.emma-dev.com" }],
  creator: "Emmanuel Gaviria",
  publisher: "Emmanuel Gaviria",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.emma-dev.com",
  },
  openGraph: {
    title: "Emmanuel Gaviria | Ingeniero de Software & Desarrollador Full-Stack",
    description: "Portafolio profesional de Emmanuel Gaviria. Conoce mis proyectos, experiencia técnica en desarrollo frontend, backend, arquitecturas cloud y liderazgo de equipos de alto rendimiento.",
    url: "https://www.emma-dev.com",
    siteName: "Emmanuel Gaviria Portfolio",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://raw.githubusercontent.com/EmmanuelGaviria25/portfolio/main/public/logo.png",
        width: 1200,
        height: 630,
        alt: "Emmanuel Gaviria Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Gaviria | Ingeniero de Software & Desarrollador Full-Stack",
    description: "Portafolio profesional de Emmanuel Gaviria. Especialista en backend, frontend, arquitectura de software y cloud.",
    images: ["https://raw.githubusercontent.com/EmmanuelGaviria25/portfolio/main/public/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Emmanuel Gaviria",
  "url": "https://www.emma-dev.com",
  "sameAs": [
    "https://github.com/EmmanuelGaviria25",
    "https://www.linkedin.com/in/emmanuel-gaviria-9a3b68181"
  ],
  "jobTitle": "Ingeniero de Software & Desarrollador Full-Stack",
  "worksFor": {
    "@type": "Organization",
    "name": "Consultor de Software & Freelance"
  },
  "description": "Emmanuel Gaviria es un Ingeniero de Software Full-Stack, Líder Técnico y Arquitecto de Software experto en aplicaciones de alto rendimiento, React, Next.js, Angular, Node.js y Java Spring Boot.",
  "knowsAbout": [
    "Desarrollo Web",
    "Software Engineering",
    "React",
    "Next.js",
    "Angular",
    "Node.js",
    "Java Spring Boot",
    "Arquitectura de Software",
    "DevOps",
    "Cloud Computing",
    "Liderazgo Técnico"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Script
        strategy="lazyOnload"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NRS9PX9R2K"
      ></Script>
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-NRS9PX9R2K');
        `}
      </Script>
      <SmoothScroll />
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
