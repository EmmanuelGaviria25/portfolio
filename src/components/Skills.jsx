"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";


function Skills({ name, icon, index }) {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.15, y: y * 0.15 }); // Subtle magnetic effect
  }

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  const { x, y } = position;
  return (
    <motion.div variants={fadeIn("right", "spring", index * 0.1, 0.75)} className="w-full h-full">
      <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} animate={{ x, y }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
        className="w-full h-full"
      >
        <div
          className="w-full h-full flex items-center justify-center p-4 bg-[#232323] hover:bg-[#2c2c2c] rounded-2xl border border-white/5 hover:border-burgundy hover:shadow-[0_0_25px_rgba(90,24,28,0.4)] transition-all duration-300 group cursor-pointer"
        >
          <img title={name}
            alt={name}
            width={60}
            height={60}
            src={icon.src}
            className="cursor-pointer object-contain max-h-[80%] max-w-[80%] filter grayscale group-hover:grayscale-0 transition-all duration-300 scale-95 group-hover:scale-105"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Skills;
