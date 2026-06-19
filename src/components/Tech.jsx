'use client'
import React from "react";

import { SectionWrapper } from "./hoc";
import { technologies } from "../constants/constants";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import Skills from "./Skills";

const Tech = () => {
  return (
    <>
    <div className='relative'>
      {/* Soft burgundy glowing ambient light for tech section */}
      <div className="absolute top-0 -left-60 w-[300px] h-[300px] bg-burgundy rounded-full filter blur-[120px] opacity-25 z-[-1]" />
      
      <motion.div variants={textVariant()}>
        <h2 className={'text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'}>Habilidades.</h2>
      </motion.div>
    </div>
    <div className='grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-3 xs:gap-5 md:gap-8 justify-center items-center relative z-10 w-full max-w-5xl mx-auto mt-10 px-2 xs:px-0'>
      {technologies.map((technology, index) => (
        <div className='w-full aspect-square' key={technology.name}>
          <Skills name={technology.name} icon={technology.icon} index={index} />
        </div>
      ))}
    </div>
    <div className="absolute left-[calc(-50vw+50%)] w-screen h-full top-0 overflow-hidden pointer-events-none z-[-10] opacity-[0.25]">
      <video
        className="w-full h-full object-cover"
        preload="auto"
        playsInline
        loop
        muted
        autoPlay
        src="/content/cards-video.mp4"
      ></video>
    </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
