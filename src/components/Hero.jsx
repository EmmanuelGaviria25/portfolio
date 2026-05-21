'use client'
import { motion } from "framer-motion";

import Image from "next/image";
import { user } from "../assets";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Hero = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    })
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    }
    else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent })
    gsap.set(secondText.current, { xPercent: xPercent })
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  }

  return (
    <section className={`relative z-[-1] w-full h-screen mx-auto banner overflow-hidden`}>
      {/* Soft burgundy glowing backdrop behind the business card */}
      <div className="absolute top-[31%] right-[15%] lg:top-[15%] lg:right-[15%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-burgundy rounded-full filter blur-[100px] md:blur-[150px] opacity-30 z-[-3] animation" />

      <div
        className={`absolute inset-0 top-[120px] md:top-[150px] right-0 md:right-40 z-[-1] animation max-w-7xl mx-auto sm:px-16 px-6 flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-burgundy' />
          <div className='w-1 sm:h-80 h-40 winered-gradient' />
        </div>

        <div data-scroll data-scroll-speed='0.4'>
          <h1 className={`font-black lg:text-[90px] sm:text-[65px] xs:text-[55px] text-[40px] leading-[48px] sm:leading-[72px] lg:leading-[98px] mt-10 md:mt-20 text-white`}>
            Hola, soy <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#A91D22] to-secondary text-[48px] xs:text-[56px] sm:text-[75px] md:text-[90px] lg:text-[110px] leading-tight inline-block pt-1 md:pt-2'>Emmanuel</span><br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-secondary to-[#A91D22] text-[48px] xs:text-[56px] sm:text-[75px] md:text-[90px] lg:text-[110px] leading-tight inline-block pt-1 md:pt-2'>Gaviria</span>
          </h1>
        </div>
      </div>
      
      <div className="sliderContainer md:z-[-10]">
        <div ref={slider} className="slider overflow-hidden text-secondary text-[70px] lg:text-[200px]">
          <p ref={firstText} >Desarrollador Full-Stack.</p>
          <p ref={secondText}>Líder Técnico.</p>
        </div>
      </div>

      <div className="z-[-2] absolute top-[36%] xs:top-[60%] md:top-[10%] lg:top-[12%] right-[70px] xs:right-[4%] md:right-[8%] lg:right-[12%] w-[68%] xs:w-[60%] md:w-[48%] lg:w-[42%] max-w-[240px] xs:max-w-[280px] md:max-w-[460px] lg:max-w-[540px] animation">
        <Image 
          loading="lazy" 
          src={user} 
          alt="Emmanuel Gaviria" 
          className="w-full h-auto drop-shadow-3xl object-contain" 
        />
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-30 cursor-pointer'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 cursor-pointer'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
