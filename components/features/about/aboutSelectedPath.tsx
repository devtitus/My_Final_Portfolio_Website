"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ExperienceItem, EducationItem } from "@/lib/types/sanity";
import { cn } from "@/lib/utils";

interface AboutSelectedPathProps {
  experiences: ExperienceItem[];
  education: EducationItem[];
}

const formatDateRange = (startDate?: string, endDate?: string, isCurrent?: boolean): string => {
  if (!startDate) return isCurrent ? "Present" : "";
  const start = new Date(startDate).getFullYear();
  if (isCurrent) return `${start} – Present`;
  if (!endDate) return `${start}`;
  const end = new Date(endDate).getFullYear();
  return start === end ? `${start}` : `${start} – ${end}`;
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const AboutSelectedPath: React.FC<AboutSelectedPathProps> = ({
  experiences,
  education,
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "max-w-[1400px] mx-auto",
        "px-[clamp(16px,4vw,60px)] 2xl:px-0",
        "py-[clamp(60px,10vh,100px)]",
      )}
    >
      {/* Section Header */}
      <motion.div
        className="mb-[clamp(40px,5vw,64px)]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-[clamp(26px,2.2vw,38px)] font-primary mb-2 text-[var(--foreground)] leading-[1.1]">
          Career &amp; Education
        </h2>
        <p className="text-[var(--muted-foreground)] text-[clamp(15px,1vw,17px)]">
          Where I&apos;ve been and what I&apos;ve built
        </p>
      </motion.div>

      {/* Main Grid: Two independent columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(48px,6vw,64px)]">

        {/* Column 1: Work Experience */}
        <div className="relative pl-8 ml-4 lg:ml-0">

          {/* Spine */}
          <div className="absolute left-[2px] top-0 bottom-12 w-[2px] bg-gradient-to-b from-orange-500/0 via-orange-500/40 to-orange-500/0" />

          {/* Column Header */}
          <motion.div
            className="absolute -left-4 top-0 flex items-center gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-10 h-10 bg-[var(--background)] border border-orange-500/30 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(251,146,60,0.2)] shrink-0">
              <span className="text-lg">💼</span>
            </div>
            <span className="text-white/80 font-primary font-semibold text-[clamp(14px,1vw,16px)] whitespace-nowrap">
              Work Experience
            </span>
          </motion.div>

          <div className="mt-20 space-y-10">
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="group relative"
                  custom={0.2 + index * 0.08}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                >
                  {/* Connector */}
                  <div className="absolute -left-[34px] top-5">
                    <div className="absolute top-0 -left-0.5 w-4 h-[2px] bg-orange-500/30 group-hover:bg-orange-400 transition-colors duration-300" />
                    <div className="absolute top-[-4px] -left-[6px] w-3 h-3 bg-[var(--background)] border-2 border-orange-500/40 rounded-full group-hover:border-orange-400 group-hover:bg-orange-400 transition-colors duration-300 z-20" />
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      "bg-white/[0.03] border border-white/[0.06]",
                      "p-[clamp(16px,2.5vw,24px)]",
                      "rounded-[18px] rounded-tl-sm",
                      "hover:border-orange-500/25 hover:bg-white/[0.05]",
                      "transition-[transform,border-color,background-color,box-shadow] duration-300",
                      "hover:shadow-[0_4px_24px_rgba(0,0,0,0.15)]",
                    )}
                  >
                    {/* Title row */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-3">
                      <div>
                        <h4 className="text-[clamp(16px,1.15vw,20px)] font-primary text-[var(--foreground)] group-hover:text-orange-50 transition-colors duration-300 leading-snug">
                          {exp.title}
                        </h4>
                        <p className="text-[var(--muted-foreground)] text-[13px] font-mono mt-1">
                          {exp.company}{exp.location ? ` · ${exp.location}` : ""}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {exp.isCurrent && (
                          <span className="text-orange-400 text-[10px] font-bold tracking-wider uppercase py-1 px-3 bg-orange-400/10 border border-orange-400/20 rounded-full">
                            Current
                          </span>
                        )}
                        <span className="text-[var(--muted-foreground)] text-[11px] font-mono py-1 px-3 bg-white/[0.04] border border-white/[0.06] rounded-full whitespace-nowrap">
                          {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                        </span>
                      </div>
                    </div>

                    {/* Description as bullets */}
                    {exp.description && (
                      <ul className="space-y-1.5 mt-2">
                        {exp.description.split("\n").filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-[clamp(13px,0.95vw,15px)] text-[var(--muted-foreground)] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-orange-400/60 mt-[3px] shrink-0">▹</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-[var(--muted-foreground)] opacity-50 border border-dashed border-[var(--border)] rounded-2xl">
                No experience data.
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Education */}
        <div className="relative pl-8 ml-4 lg:ml-0">

          {/* Spine */}
          <div className="absolute left-[2px] top-0 bottom-12 w-[2px] bg-gradient-to-b from-blue-500/0 via-blue-500/40 to-blue-500/0" />

          {/* Column Header */}
          <motion.div
            className="absolute -left-4 top-0 flex items-center gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-10 h-10 bg-[var(--background)] border border-blue-500/30 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0">
              <span className="text-lg">🎓</span>
            </div>
            <span className="text-white/80 font-primary font-semibold text-[clamp(14px,1vw,16px)] whitespace-nowrap">
              Education
            </span>
          </motion.div>

          <div className="mt-20 space-y-10">
            {education.length > 0 ? (
              education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  className="group relative"
                  custom={0.2 + index * 0.08}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                >
                  {/* Connector */}
                  <div className="absolute -left-[34px] top-5">
                    <div className="absolute top-0 -left-0.5 w-4 h-[2px] bg-blue-500/30 group-hover:bg-blue-400 transition-colors duration-300" />
                    <div className="absolute top-[-4px] -left-[6px] w-3 h-3 bg-[var(--background)] border-2 border-blue-500/40 rounded-full group-hover:border-blue-400 group-hover:bg-blue-400 transition-colors duration-300 z-20" />
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      "bg-white/[0.03] border border-white/[0.06]",
                      "p-[clamp(16px,2.5vw,24px)]",
                      "rounded-[18px] rounded-tl-sm",
                      "hover:border-blue-500/25 hover:bg-white/[0.05]",
                      "transition-[transform,border-color,background-color,box-shadow] duration-300",
                      "hover:shadow-[0_4px_24px_rgba(0,0,0,0.15)]",
                    )}
                  >
                    {/* Title row */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-3">
                      <div>
                        <h4 className="text-[clamp(16px,1.15vw,20px)] font-primary text-[var(--foreground)] group-hover:text-blue-50 transition-colors duration-300 leading-snug">
                          {edu.university}
                        </h4>
                        <p className="text-[var(--muted-foreground)] text-[13px] font-mono mt-1">
                          {edu.degree}
                        </p>
                      </div>

                      <span className="self-start text-[var(--muted-foreground)] text-[11px] font-mono py-1 px-3 bg-white/[0.04] border border-white/[0.06] rounded-full whitespace-nowrap shrink-0">
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </span>
                    </div>

                    {/* Details as bullets */}
                    {edu.details && (
                      <ul className="space-y-1.5 mt-2">
                        {edu.details.split("\n").filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-[clamp(13px,0.95vw,15px)] text-[var(--muted-foreground)] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-blue-400/70 mt-[3px] shrink-0">▹</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-[var(--muted-foreground)] opacity-50 border border-dashed border-[var(--border)] rounded-2xl">
                No education data.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
