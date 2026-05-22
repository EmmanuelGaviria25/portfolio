'use client'
import { motion } from "framer-motion";

import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Hero = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const requestRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    let xPercent = 0;
    let direction = -1;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      scrub: 0.5,
      start: 0,
      end: window.innerHeight,
      onUpdate: e => {
        direction = e.direction * -1;
      }
    });

    const scrollAnim = gsap.to(slider.current, {
      scrollTrigger: trigger,
      x: "-500px",
    });

    const animate = () => {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      if (firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercent });
        gsap.set(secondText.current, { xPercent: xPercent });
      }

      // 0.02 is a smooth, elegant, and perfectly readable speed
      xPercent += 0.02 * direction;

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      trigger.kill();
      scrollAnim.kill();
    };
  }, []);

  // Preload frames and play cinematic 24 FPS animation using requestAnimationFrame
  useEffect(() => {
    const totalFrames = 102;
    const loadedImages = [];

    // Preload images into browser memory cache for lag-free rendering
    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      img.src = `/frames_hero/frame_${String(i).padStart(3, '0')}.webp`;
      loadedImages.push(img);
    }

    let currentFrame = 0;
    let lastTime = 0;
    const fps = 12; // Slow, premium and relaxed 12 FPS frame rate
    const interval = 1000 / fps;
    let animId = null;

    const animateFrames = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed >= interval) {
        currentFrame = (currentFrame + 1) % totalFrames;
        if (imgRef.current) {
          imgRef.current.src = `/frames_hero/frame_${String(currentFrame).padStart(3, '0')}.webp`;
        }
        lastTime = timestamp - (elapsed % interval);
      }
      animId = requestAnimationFrame(animateFrames);
    };

    animId = requestAnimationFrame(animateFrames);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className={`relative z-[-1] w-full h-screen mx-auto banner overflow-hidden`}>
      {/* Soft burgundy glowing backdrop is now dynamically centered inside the character container below */}

      <div
        className={`absolute inset-0 top-[120px] md:top-[150px] right-0 md:right-40 z-[-1] animation max-w-7xl mx-auto sm:px-16 px-6 flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-burgundy' />
          <div className='w-1 sm:h-80 h-40 winered-gradient' />
        </div>

        <div>
          <h1 className={`font-black lg:text-[80px] sm:text-[58px] xs:text-[48px] text-[35px] leading-[42px] sm:leading-[65px] lg:leading-[88px] mt-10 md:mt-20 text-white`}>
            Hola, soy <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#A91D22] to-secondary text-[42px] xs:text-[50px] sm:text-[68px] md:text-[80px] lg:text-[95px] leading-tight inline-block pt-1 md:pt-2'>Emmanuel</span><br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-secondary to-[#A91D22] text-[42px] xs:text-[50px] sm:text-[68px] md:text-[80px] lg:text-[95px] leading-tight inline-block pt-1 md:pt-2'>Gaviria</span>
          </h1>
        </div>
      </div>

      <div className="sliderContainer z-[-10] select-none pointer-events-none w-full">
        <div
          ref={slider}
          className="slider font-black tracking-wider uppercase text-[70px] lg:text-[200px]"
          style={{
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
            color: "transparent"
          }}
        >
          <p ref={firstText}>Arquitecto de Software // Líder Técnico // Desarrollador Fullstack //</p>
          <p ref={secondText}>Arquitecto de Software // Líder Técnico // Desarrollador Fullstack //</p>
        </div>
      </div>

      <div className="z-[-2] absolute top-[39%] xs:top-[44%] md:top-[18%] lg:top-[16%] left-0 right-0 mx-auto md:left-auto md:right-[2%] md:mx-0 w-[110%] xs:w-[95%] md:w-[65%] lg:w-[58%] max-w-[450px] xs:max-w-[480px] md:max-w-[650px] lg:max-w-[760px] flex items-center justify-center animation">
        {/* Soft burgundy glowing backdrop perfectly centered behind the character */}
        <div className="absolute w-[80%] aspect-square bg-burgundy rounded-full filter blur-[100px] md:blur-[150px] opacity-30 z-[-1]" />

        <img
          ref={imgRef}
          src="/frames_hero/frame_099.webp"
          alt="Emmanuel Gaviria"
          className="w-full h-auto drop-shadow-3xl object-contain select-none pointer-events-none relative z-[1]"
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
