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
        <p className={'sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider'}>Tecnología</p>
        <h2 className={'text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'}>Habilidades.</h2>
      </motion.div>
    </div>
    <div className='flex relative z-10 flex-col flex-wrap justify-center gap-10'>
      <div className=" flex flex-wrap gap-10 justify-center">
      {technologies.slice(0,7).map((technology,index) => (
        <div className='w-28 h-28 mt-5' key={technology.name}>
          <Skills name={technology.name} icon={technology.icon} index={index} />
        </div>
      ))}
      </div>
      <div className=" flex flex-wrap gap-10 justify-center">
      {technologies.slice(7,14).map((technology,index) => (
        <div className='w-28 h-28 mt-5' key={technology.name}>
          <Skills name={technology.name} icon={technology.icon} index={index} />
        </div>
      ))}
      </div>
      <div className=" flex flex-wrap gap-10 justify-center">
      {technologies.slice(14, 18).map((technology,index) => (
        <div className='w-24 h-24 mt-5' key={technology.name}>
          <Skills name={technology.name} icon={technology.icon} index={index} />
        </div>
      ))}
      </div>
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

export default SectionWrapper(Tech, "");
