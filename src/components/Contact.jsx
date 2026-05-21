'use client'
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motion";
import { toast } from "react-hot-toast";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCommentAlt, 
  FaPaperPlane, 
  FaCopy, 
  FaCheck, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin 
} from "react-icons/fa";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website_hp: "", // Campo honeypot oculto para bots
  });

  const [loading, setLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);
  const [copied, setCopied] = useState(false);

  // Capturar el tiempo exacto en que se monta la sección de contacto
  useEffect(() => {
    setLoadTime(Date.now());
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("emmanuel.gaviria.25@gmail.com");
    setCopied(true);
    toast.success("¡Correo copiado al portapapeles!");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica de campos obligatorios en el cliente
    if (!form.name || !form.email || !form.message) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const API_URL = '/api/send';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          website_hp: form.website_hp,
          submit_time: loadTime, // Enviamos el timestamp de carga de la sección
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Algo salió mal.");
      }

      setLoading(false);
      toast.success("¡Gracias por contactarme! Te responderé lo antes posible.");

      // Limpiar el formulario al completarse exitosamente
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        website_hp: "",
      });
      
      // Reiniciar el temporizador para un envío subsecuente
      setLoadTime(Date.now());
      
    } catch (error) {
      setLoading(false);
      console.error('Error al enviar el correo:', error);
      toast.error("¡Ups! No pudimos enviar tu mensaje. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 items-stretch overflow-hidden relative w-full xl:mt-12">
      {/* Resplandor de neón de fondo (Ambiance) */}
      <div className="absolute top-[30%] left-[50%] -translate-x-[50%] w-[400px] h-[400px] bg-[#5A181C] rounded-full filter blur-[150px] opacity-25 z-[-1] pointer-events-none" />
      
      {/* COLUMNA IZQUIERDA: Tarjeta de Información & Conectividad */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="w-full lg:w-[42%] bg-[#1E1E22]/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-[0_0_50px_rgba(90,24,28,0.1)] flex flex-col justify-between relative overflow-hidden"
      >
        {/* Orbes de luz traseros internos en la tarjeta izquierda */}
        <div className="absolute -top-24 -left-24 w-[200px] h-[200px] bg-[#5A181C] rounded-full filter blur-[100px] opacity-20 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[200px] h-[200px] bg-[#FF3E44] rounded-full filter blur-[120px] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          <div>
            <p className={styles.sectionSubText}>Hablemos</p>
            <h3 className="text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[28px] mt-2">
              Conéctate<span className="text-[#FF3E44]">.</span>
            </h3>
          </div>

          <p className="text-secondary text-[16px] leading-[26px] font-medium">
            ¿Tienes una propuesta interesante, una oportunidad laboral o simplemente quieres charlar sobre tecnología? Mi bandeja de entrada siempre está lista para recibir tu mensaje.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {/* Tarjeta interactiva de Correo */}
            <div className="bg-[#121215]/60 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:border-[#FF3E44]/30 hover:shadow-[0_0_20px_rgba(255,62,68,0.08)] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#1E1E22] to-[#121215] flex items-center justify-center border border-white/5 group-hover:border-[#FF3E44]/40 transition-colors duration-300">
                  <FaEnvelope className="text-[#FF3E44] text-lg" />
                </div>
                <div>
                  <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold block">Escríbeme</span>
                  <span className="text-white text-[15px] font-medium block mt-0.5">emmanuel.gaviria.25@gmail.com</span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleCopy}
                className="w-10 h-10 rounded-xl bg-[#1E1E22] hover:bg-[#FF3E44]/10 border border-white/5 hover:border-[#FF3E44]/30 flex items-center justify-center transition-all duration-300 group/btn"
                title="Copiar correo"
              >
                {copied ? (
                  <FaCheck className="text-green-500 text-sm" />
                ) : (
                  <FaCopy className="text-secondary group-hover/btn:text-white transition-colors text-sm" />
                )}
              </button>
            </div>

            {/* Tarjeta de Ubicación */}
            <div className="bg-[#121215]/60 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:border-[#FF3E44]/30 hover:shadow-[0_0_20px_rgba(255,62,68,0.08)] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#1E1E22] to-[#121215] flex items-center justify-center border border-white/5 group-hover:border-[#FF3E44]/40 transition-colors duration-300">
                  <FaMapMarkerAlt className="text-[#FF3E44] text-lg" />
                </div>
                <div>
                  <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold block">Ubicación</span>
                  <span className="text-white text-[15px] font-medium block mt-0.5">Medellín, Colombia</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1E1E22] rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-secondary font-medium">GMT-5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enlaces a Redes Sociales */}
        <div className="relative z-10 mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-secondary text-xs font-semibold uppercase tracking-wider">Redes sociales</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/EmmanuelGaviria25"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#121215] border border-white/5 hover:border-[#FF3E44]/40 flex items-center justify-center hover:shadow-[0_0_15px_rgba(255,62,68,0.2)] transition-all duration-300 group/social hover:scale-105 active:scale-95"
              title="GitHub"
            >
              <FaGithub className="text-secondary group-hover/social:text-white transition-colors text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/egaviria25"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#121215] border border-white/5 hover:border-[#FF3E44]/40 flex items-center justify-center hover:shadow-[0_0_15px_rgba(255,62,68,0.2)] transition-all duration-300 group/social hover:scale-105 active:scale-95"
              title="LinkedIn"
            >
              <FaLinkedin className="text-secondary group-hover/social:text-white transition-colors text-lg" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* COLUMNA DERECHA: Formulario Glassmorphism */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="w-full lg:w-[55%] bg-[#1E1E22]/60 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-[0_0_50px_rgba(90,24,28,0.15)] relative overflow-hidden"
      >
        {/* Orbes de luz traseros internos en la tarjeta derecha */}
        <div className="absolute -top-24 -right-24 w-[200px] h-[200px] bg-[#FF3E44] rounded-full filter blur-[120px] opacity-15 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[200px] h-[200px] bg-[#5A181C] rounded-full filter blur-[100px] opacity-15 pointer-events-none" />

        <p className={styles.sectionSubText}>Ponte en contacto</p>
        <h3 className="text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[28px] mt-2">
          Contacto<span className="text-[#FF3E44]">.</span>
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-6 relative z-10"
        >
          {/* Campo Honeypot invisible para bots (Antispam) */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website_hp"
              value={form.website_hp}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>

          <label className="flex flex-col group">
            <span className="text-white font-medium mb-2 group-focus-within:text-[#FF3E44] transition-colors duration-300">
              Tu nombre *
            </span>
            <div className="flex items-center bg-[#121215]/80 border border-white/5 focus-within:border-[#FF3E44]/50 focus-within:shadow-[0_0_15px_rgba(255,62,68,0.15)] rounded-xl px-4 transition-all duration-300">
              <FaUser className="text-secondary group-focus-within:text-[#FF3E44] mr-3 transition-colors duration-300 text-sm" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="¿Cuál es tu nombre?"
                className="w-full bg-transparent py-4 placeholder:text-secondary text-white outline-none font-medium"
                required
              />
            </div>
          </label>

          <label className="flex flex-col group">
            <span className="text-white font-medium mb-2 group-focus-within:text-[#FF3E44] transition-colors duration-300">
              Tu correo electrónico *
            </span>
            <div className="flex items-center bg-[#121215]/80 border border-white/5 focus-within:border-[#FF3E44]/50 focus-within:shadow-[0_0_15px_rgba(255,62,68,0.15)] rounded-xl px-4 transition-all duration-300">
              <FaEnvelope className="text-secondary group-focus-within:text-[#FF3E44] mr-3 transition-colors duration-300 text-sm" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="¿Cuál es tu dirección de correo electrónico?"
                className="w-full bg-transparent py-4 placeholder:text-secondary text-white outline-none font-medium"
                required
              />
            </div>
          </label>

          <label className="flex flex-col group">
            <span className="text-white font-medium mb-2 group-focus-within:text-[#FF3E44] transition-colors duration-300">
              Tu número de teléfono
            </span>
            <div className="flex items-center bg-[#121215]/80 border border-white/5 focus-within:border-[#FF3E44]/50 focus-within:shadow-[0_0_15px_rgba(255,62,68,0.15)] rounded-xl px-4 transition-all duration-300">
              <FaPhone className="text-secondary group-focus-within:text-[#FF3E44] mr-3 transition-colors duration-300 text-sm" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="¿Cuál es tu número de teléfono?"
                className="w-full bg-transparent py-4 placeholder:text-secondary text-white outline-none font-medium"
              />
            </div>
          </label>

          <label className="flex flex-col group">
            <span className="text-white font-medium mb-2 group-focus-within:text-[#FF3E44] transition-colors duration-300">
              Tu mensaje *
            </span>
            <div className="flex items-start bg-[#121215]/80 border border-white/5 focus-within:border-[#FF3E44]/50 focus-within:shadow-[0_0_15px_rgba(255,62,68,0.15)] rounded-xl px-4 pt-4 pb-2 transition-all duration-300">
              <FaCommentAlt className="text-secondary group-focus-within:text-[#FF3E44] mr-3 mt-1.5 transition-colors duration-300 text-sm" />
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="¿Qué te gustaría decir?"
                className="w-full bg-transparent placeholder:text-secondary text-white outline-none font-medium resize-none"
                required
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#5A181C] hover:bg-[#FF3E44] py-4 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-[0_0_20px_rgba(90,24,28,0.3)] hover:shadow-[0_0_25px_rgba(255,62,68,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#FF3E44]/20 flex items-center gap-2 group"
          >
            {loading ? (
              <>
                <span>Enviando...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              <>
                <span>Enviar mensaje</span>
                <FaPaperPlane className="text-xs text-white/80 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
