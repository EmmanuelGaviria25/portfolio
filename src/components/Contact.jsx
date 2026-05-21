'use client'
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motion";
import { toast } from "react-hot-toast";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log('Service ID: ', process.env.MAIL_PASS);
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
    emailjs
      .send(
        process.env.SERVICE_ID,
        process.env.TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          to_name: "Emmanuel Gaviria",
          to_email: "emmanuel.gaviria.25@gmail.com",
          message: form.message,
        },
        process.env.PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Gracias por contactarme. Te responderé pronto.");

          setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error('FAILED...', error);

          toast.error("¡Ups! Algo salió mal. Por favor, inténtalo de nuevo.");
        }
        
      );
    } catch (error) {
      setLoading(false);
      console.error('FAILED...', error);
      toast.error("¡Ups! Algo salió mal. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col gap-10 overflow-hidden relative`}
    >
      {/* Soft burgundy glowing background highlight */}
      <div className="absolute top-[30%] -left-20 w-[250px] h-[250px] bg-burgundy rounded-full filter blur-[100px] opacity-25 z-[-1]" />
      
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-tertiary bg-opacity-80 p-8 rounded-2xl border border-white/5 shadow-[0_0_30px_rgba(90,24,28,0.15)]'
      >
        <p className={styles.sectionSubText}>Ponte en contacto</p>
        <h3 className={styles.sectionHeadText}>Contacto.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-2 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Tu nombre</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="¿Cuál es tu nombre?"
              className='bg-[#1E1E1E] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-burgundy font-medium transition-all'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Tu correo electrónico</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="¿Cuál es tu dirección de correo?"
              className='bg-[#1E1E1E] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-burgundy font-medium transition-all'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Tu número de teléfono</span>
            <input
              type='phone'
              name='phone'
              value={form.phone}
              onChange={handleChange}
              placeholder="¿Cuál es tu número de teléfono?"
              className='bg-[#1E1E1E] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-burgundy font-medium transition-all'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Tu mensaje</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='¿Qué te gustaría decir?'
              className='bg-[#1E1E1E] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-burgundy font-medium transition-all'
            />
          </label>

          <button
            type='submit'
            className='bg-burgundy py-3 px-8 rounded-xl hover:bg-burgundy/80 outline-none w-fit text-white font-bold shadow-md shadow-primary transition-all duration-300 hover:scale-[1.02] border border-burgundy/30'
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
