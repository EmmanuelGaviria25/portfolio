'use client'
import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../constants/constants";
import { SectionWrapper } from "./hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";
import Image from "next/image";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      visible={true}
      contentStyle={{
        background: "linear-gradient(to bottom, #1C1C1E, #0A0A0C)",
        color: "#fff",
        border: "1px solid #5A181C",
        boxShadow: "0px 0px 30px rgba(169, 29, 34, 0.25)",
        borderRadius: "20px"
      }}
      contentArrowStyle={{ borderRight: "7px solid #5A181C" }}
      date={experience.date}
      iconStyle={{
        background: "linear-gradient(to bottom, #151517, #0D0D0E)",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.8), 0 1px 2px rgba(255,255,255,0.05)",
        border: "1px solid rgba(62, 20, 23, 0.5)"
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <Image
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain filter drop-shadow-[0_0_8px_rgba(255,62,68,0.3)]'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <div className='relative'>
        <div className="absolute top-0 -left-60 w-[300px] h-[300px] bg-burgundy rounded-full filter blur-[120px] opacity-25 z-[-1]" />

        <div>
          <h2 className={`${styles.sectionHeadText}`}>Experiencia.</h2>
        </div>

        <div className='w-full flex'>
          <p className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'>
            A lo largo de mi carrera profesional he desempeñado diversos roles que me han permitido construir soluciones integrales, liderar equipos de desarrollo y diseñar arquitecturas escalables. A continuación, presento un resumen de mi trayectoria, destacando mis aportes y las tecnologías con las que he trabajado para alcanzar los objetivos de cada proyecto.
          </p>
        </div>
      </div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline lineColor="rgba(255, 62, 68, 0.2)">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
