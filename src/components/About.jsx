'use client'
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services } from "../constants/constants"
import { SectionWrapper } from "./hoc";
import { fadeIn, textVariant } from "../utils/motion";
import Image from "next/image";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'
    glareEnable={true}
    glareMaxOpacity={0.25}
    glareColor="#FF3E44"
    glarePosition="all"
    glareBorderRadius="20px"
    tiltMaxAngleX={12}
    tiltMaxAngleY={12}
    tiltEnable={true}
    perspective={1000}
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card hover:shadow-[0_0_30px_rgba(169,29,34,0.35)] transition-all duration-500'
    >
      <div
        className='bg-gradient-to-b from-[#1C1C1E] to-[#0A0A0C] rounded-[20px] py-5 px-3 xs:py-8 xs:px-6 min-h-[180px] xs:min-h-[280px] flex justify-center items-center flex-col border border-[#2B0E11]/30 backdrop-blur-md group transition-all duration-300'
      >
        {/* Recessed Circular Tech Badge for the Icon */}
        <div className="w-14 h-14 xs:w-20 xs:h-20 rounded-full bg-gradient-to-b from-[#151517] to-[#0D0D0E] flex justify-center items-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),0_1px_2px_rgba(255,255,255,0.05)] border border-[#3E1417]/50 mb-3 xs:mb-6 group-hover:border-[#FF3E44]/40 transition-all duration-300">
          <Image
            src={icon}
            alt={title}
            className='w-8 h-8 xs:w-14 xs:h-14 object-contain filter drop-shadow-[0_0_8px_rgba(255,62,68,0.3)] group-hover:scale-110 transition-all duration-300'
          />
        </div>

        <h3 className='text-white text-[13px] xs:text-[19px] font-bold text-center tracking-wide group-hover:text-[#FF3E44] transition-colors duration-300'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <div className='relative overflow-hidden lg:overflow-visible w-full'>
        {/* Soft elegant burgundy glowing ambient light */}
        <div className="absolute top-0 -left-40 w-[300px] h-[300px] bg-burgundy rounded-full filter blur-[120px] opacity-25 z-[-1]" />
        
        <motion.div variants={textVariant()}>
          <p className={'sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider'}>Introducción</p>
          <h2 className={'text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'}>Presentación.</h2>
        </motion.div>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-4 text-secondary text-[18px] max-w-3xl leading-[30px] font-semibold'
        >
          Soy un Ingeniero de Software Fullstack y Coordinador con amplia experiencia en el desarrollo de aplicaciones backend y frontend en diversas industrias.
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-4 text-secondary text-[18px] max-w-3xl leading-[30px] font-semibold'
        >
          He trabajado en proyectos empresariales clave utilizando tecnologías como JavaScript, TypeScript, Angular, React y Java para construir sistemas de gestión de información, plataformas bancarias, aplicaciones de comercio electrónico y soluciones de software a la medida.
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-4 text-secondary text-[18px] max-w-3xl leading-[30px] font-semibold'
        >
          Mi experiencia incluye el diseño e implementación de arquitecturas escalables y robustas utilizando frameworks como Next.js, Spring e Hibernate, así como la integración de sistemas a través de servicios web y APIs RESTful.
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-4 text-secondary text-[18px] max-w-3xl leading-[30px] font-semibold'
        >
          Además, he liderado equipos técnicos, asegurando la entrega de soluciones eficientes y de alto rendimiento.
        </motion.p>
      </div>

      <div className='mt-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-10 w-full justify-items-center justify-center max-w-5xl mx-auto'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
