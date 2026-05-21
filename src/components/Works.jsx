'use client'
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "./hoc";
import { projects } from "../constants/constants";
import { fadeIn, textVariant } from "../utils/motion";
import { HiLink } from "react-icons/hi";
import { ImGithub } from "react-icons/im";
import Image from "next/image";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  features,
  live_link,
}) => {
  const refLiveLink = React.useRef(null);
  const refSourceCodeLink = React.useRef(null);
  const [positionLiveLink, setPositionLiveLink] = React.useState({ x: 0, y: 0 });
  const [positionSourceCodeLink, setPositionSourceCodeLink] = React.useState({ x: 0, y: 0 });

  const onMouseMoveLiveLink = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = refLiveLink.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPositionLiveLink({ x: x * 0.15, y: y * 0.15 });
  };

  const onMouseMoveSourceCodeLink = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = refSourceCodeLink.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPositionSourceCodeLink({ x: x * 0.15, y: y * 0.15 });
  };

  const onMouseLeave = () => {
    setPositionLiveLink({ x: 0, y: 0 });
    setPositionSourceCodeLink({ x: 0, y: 0 });
  };

  return (
    <div className='w-full lg:w-[calc(50%-14px)] bg-gradient-to-b from-[#1E1E22] to-[#121215] bg-opacity-95 p-5 rounded-3xl border border-white/5 hover:border-burgundy/40 hover:shadow-[0_20px_50px_rgba(90,24,28,0.25)] hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between group h-full'>
      <div>
        {/* macOS Browser Mockup Frame Container */}
        <div className='relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/5 flex flex-col'>
          {/* macOS Safari Browser Header */}
          <div className='w-full h-7 bg-[#1A1A1E] border-b border-white/5 flex items-center px-3 relative z-20 select-none'>
            {/* Window Controls (Traffic light dots) */}
            <div className='flex gap-1.5 absolute left-3'>
              <span className='w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]'></span>
              <span className='w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]'></span>
              <span className='w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]'></span>
            </div>

            {/* URL Address Bar */}
            <div className='mx-auto bg-black/30 border border-white/5 text-white/30 text-[10px] font-medium tracking-wide px-4 py-0.5 rounded-md truncate max-w-[170px] text-center'>
              {live_link.replace(/^https?:\/\/(www\.)?/, '')}
            </div>
          </div>

          {/* Screenshot Image Container with Tilt */}
          <div className='relative w-full overflow-hidden'>
            <Tilt
              className='w-full h-full'
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#FF3E44"
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
            >
              <img
                src={image.src}
                alt={name}
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]'
              />
            </Tilt>

            {/* High-tech glass hover actions overlay */}
            <div className='absolute inset-0 bg-black/60 backdrop-blur-[4px] flex justify-center items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10'>
              {/* Live Link Button */}
              <motion.div
                ref={refLiveLink}
                onMouseMove={onMouseMoveLiveLink}
                onMouseLeave={onMouseLeave}
                animate={{ x: positionLiveLink.x, y: positionLiveLink.y }}
                transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.1 }}
                className='flex flex-col items-center gap-1.5'
              >
                <button
                  onClick={() => window.open(live_link, "_blank")}
                  className='w-14 h-14 rounded-full bg-burgundy/90 text-white flex justify-center items-center border border-white/10 hover:bg-[#FF3E44] hover:shadow-[0_0_15px_rgba(255,62,68,0.5)] transition-all duration-300 transform hover:scale-105 group/btn'
                  title="Visitar Sitio Web"
                >
                  <HiLink size={24} className="transition-transform group-hover/btn:scale-110" />
                </button>
                <span className='text-[10px] font-bold tracking-widest text-white/70 uppercase select-none'>Visitar Web</span>
              </motion.div>

              {/* GitHub Button */}
              <motion.div
                ref={refSourceCodeLink}
                onMouseMove={onMouseMoveSourceCodeLink}
                onMouseLeave={onMouseLeave}
                animate={{ x: positionSourceCodeLink.x, y: positionSourceCodeLink.y }}
                transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.1 }}
                className='flex flex-col items-center gap-1.5'
              >
                <button
                  onClick={() => window.open(source_code_link, "_blank")}
                  className='w-14 h-14 rounded-full bg-white/10 text-white flex justify-center items-center border border-white/10 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:scale-105 group/btn'
                  title="Ver Código en GitHub"
                >
                  <ImGithub size={22} className="transition-transform group-hover/btn:scale-110" />
                </button>
                <span className='text-[10px] font-bold tracking-widest text-white/70 uppercase select-none'>GitHub</span>
              </motion.div>
            </div>

            {/* Elegant Top-Left Project Accent Badge */}
            <div className='absolute top-3 left-3 bg-black/60 backdrop-blur-md py-1 px-3 rounded-full border border-white/10 z-10 transition-opacity duration-300 group-hover:opacity-0 select-none'>
              <span className='text-[8px] uppercase tracking-[0.2em] font-bold text-white/80'>Proyecto Destacado</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className='mt-5 flex flex-col gap-2.5 px-1'>
          <h3 className='text-white font-bold text-[24px] sm:text-[26px] flex gap-2.5 items-center group-hover:text-[#FF3E44] transition-colors duration-300'>
            {name}
            <HiLink size={18} className='text-[#FF3E44] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
          </h3>
          <p className='text-secondary text-[15px] sm:text-[16px] leading-[26px] font-medium mt-1'>{description}</p>

          {/* Features bullet points with clean customized indicator */}
          <ul className='list-none mt-3 flex flex-col gap-2.5'>
            {features.map((feature, idx) => (
              <li key={idx} className='text-[14px] sm:text-[15px] text-[#D8D8DC] flex items-start leading-[22px]'>
                <span className='inline-block min-w-[8px] h-[8px] rounded-full bg-gradient-to-r from-burgundy to-[#FF3E44] mr-3 mt-[7px] shadow-[0_0_6px_rgba(255,62,68,0.4)] animate-pulse'></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Tags Pill Container */}
      <div className='mt-6 px-1 flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <span
            key={`${name}-${tag.name}`}
            className={`text-[12px] font-semibold py-1 px-3 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#FF3E44]/25 hover:shadow-[0_0_10px_rgba(255,62,68,0.1)] transition-all duration-300 cursor-default ${tag.color}`}
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const Works = () => {
  return (
    <>
      <div className='relative'>
        {/* Soft burgundy glowing ambient light for projects section */}
        <div className="absolute top-0 -left-60 w-[300px] h-[300px] bg-burgundy rounded-full filter blur-[120px] opacity-25 z-[-1]" />

        <div>
          <p id="work" className={`${styles.sectionSubText} `}>Mi trabajo</p>
          <h2 className={`${styles.sectionHeadText}`}>Proyectos.</h2>
        </div>

        <div className='w-full flex'>
          <motion.p
            className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
          >
            Los siguientes proyectos muestran mis habilidades y experiencia a través de ejemplos reales de mi trabajo. Cada proyecto se describe brevemente con enlaces a repositorios de código y demostraciones en vivo. Refleja mi capacidad para resolver problemas complejos, trabajar con diferentes tecnologías y gestionar proyectos de manera efectiva.
          </motion.p>
        </div>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
