"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ExperienceItem, EducationItem } from "@/lib/types/sanity";
import { cn } from "@/lib/utils";

interface AboutSelectedPathProps {
  experiences: ExperienceItem[];
  education: EducationItem[];
}

const formatDateRange = (
  startDate?: string,
  endDate?: string,
  isCurrent?: boolean
): string => {
  if (!startDate) return isCurrent ? "Present" : "";
  const start = new Date(startDate).getFullYear();
  if (isCurrent) return `${start} – Present`;
  if (!endDate) return `${start}`;
  const end = new Date(endDate).getFullYear();
  return start === end ? `${start}` : `${start} – ${end}`;
};

/* ─── Reusable Timeline Column ─────────────────────────────────────────────── */

interface TimelineColumnProps {
  icon: string;
  label: string;
  accentOrange?: boolean;
  isInView: boolean;
  headerDelay: number;
  children: React.ReactNode;
}

const TimelineColumn: React.FC<TimelineColumnProps> = ({
  icon,
  label,
  accentOrange = false,
  isInView,
  headerDelay,
  children,
}) => {
  const accent = accentOrange
    ? {
        border: "border-orange-500/30",
        shadow: "shadow-[0_0_20px_rgba(251,146,60,0.15)]",
        spine: "from-orange-500/0 via-orange-500/35 to-orange-500/0",
      }
    : {
        border: "border-blue-500/30",
        shadow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        spine: "from-blue-500/0 via-blue-500/35 to-blue-500/0",
      };

  return (
    /* Outer column — the gutter (w-10 = 40px) + card live side by side */
    <div className="relative flex flex-col">

      {/* Vertical spine — centred on the 40px gutter (left: 19px = 40/2 - 1) */}
      {/* Starts at top-10 (below circle centre) so it doesn't overdraw the icon */}
      <div
        className={cn(
          "absolute left-[19px] top-10 bottom-8 w-[2px]",
          "bg-gradient-to-b",
          accent.spine,
        )}
      />

      {/* Column header ─ flex row, NO absolute positioning */}
      <motion.div
        className="flex items-center gap-3 mb-8 relative"
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: headerDelay, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Icon circle — sits in the gutter, centred on spine */}
        <div
          className={cn(
            "w-10 h-10 shrink-0 rounded-full flex items-center justify-center",
            "bg-[var(--background)] border z-10",
            accent.border,
            accent.shadow,
          )}
        >
          <span className="text-base">{icon}</span>
        </div>
        <span className="text-white/80 font-primary font-semibold text-[clamp(14px,1.05vw,17px)]">
          {label}
        </span>
      </motion.div>

      {/* Items list */}
      <div className="flex flex-col gap-8">
        {children}
      </div>
    </div>
  );
};

/* ─── Dot + Connector row for each item ────────────────────────────────────── */

interface TimelineItemRowProps {
  accentOrange?: boolean;
  isInView: boolean;
  delay: number;
  children: React.ReactNode;
}

const TimelineItemRow: React.FC<TimelineItemRowProps> = ({
  accentOrange = false,
  isInView,
  delay,
  children,
}) => {
  const dotBase = accentOrange
    ? "border-orange-500/40 group-hover:border-orange-400 group-hover:bg-orange-400"
    : "border-blue-500/40 group-hover:border-blue-400 group-hover:bg-blue-400";

  const lineBase = accentOrange
    ? "bg-orange-500/20 group-hover:bg-orange-400/50"
    : "bg-blue-500/20 group-hover:bg-blue-400/50";

  return (
    <motion.div
      className="flex items-start gap-0 group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Gutter: fixed 40px wide, dot centred at 19-20px = spine position */}
      <div className="w-10 shrink-0 flex flex-col items-center pt-[18px] relative z-10">
        {/* Dot */}
        <div
          className={cn(
            "w-[11px] h-[11px] rounded-full border-2 bg-[var(--background)]",
            "transition-[border-color,background-color] duration-300",
            dotBase,
          )}
        />
      </div>

      {/* Horizontal connector: 16px bridge from gutter edge to card */}
      <div
        className={cn(
          "w-4 h-[2px] mt-[24px] shrink-0",
          "transition-colors duration-300",
          lineBase,
        )}
      />

      {/* Card takes remaining width */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </motion.div>
  );
};

/* ─── Main Section ──────────────────────────────────────────────────────────── */

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
      {/* Section heading */}
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

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[clamp(32px,5vw,64px)] gap-y-16">

        {/* ── Work Experience ───────────────────────────────────────────── */}
        <TimelineColumn
          icon="💼"
          label="Work Experience"
          accentOrange
          isInView={isInView}
          headerDelay={0.1}
        >
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <TimelineItemRow
                key={exp.id}
                accentOrange
                isInView={isInView}
                delay={0.2 + index * 0.09}
              >
                <div
                  className={cn(
                    "bg-white/[0.03] border border-white/[0.07]",
                    "p-[clamp(14px,2vw,22px)]",
                    "rounded-[16px] rounded-tl-sm",
                    "group-hover:border-orange-500/25 group-hover:bg-white/[0.05]",
                    "group-hover:shadow-[0_4px_28px_rgba(0,0,0,0.18)]",
                    "transition-[border-color,background-color,box-shadow] duration-300",
                  )}
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-3">
                    <div className="min-w-0">
                      <h4 className="text-[clamp(15px,1.1vw,19px)] font-primary text-[var(--foreground)] group-hover:text-orange-50 transition-colors duration-300 leading-snug">
                        {exp.title}
                      </h4>
                      <p className="text-[var(--muted-foreground)] text-[12px] font-mono mt-0.5 truncate">
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                      {exp.isCurrent && (
                        <span className="text-orange-400 text-[10px] font-bold tracking-wider uppercase py-0.5 px-2.5 bg-orange-400/10 border border-orange-400/20 rounded-full">
                          Current
                        </span>
                      )}
                      <span className="text-[var(--muted-foreground)] text-[11px] font-mono py-0.5 px-2.5 bg-white/[0.04] border border-white/[0.07] rounded-full whitespace-nowrap">
                        {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                      </span>
                    </div>
                  </div>

                  {/* Description bullets */}
                  {exp.description && (
                    <ul className="space-y-1.5 mt-2 border-t border-white/[0.05] pt-3">
                      {exp.description
                        .split("\n")
                        .filter(Boolean)
                        .map((line, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[clamp(12px,0.9vw,14px)] text-[var(--muted-foreground)] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <span className="text-orange-400/60 mt-[3px] shrink-0 text-[10px]">▹</span>
                            <span>{line}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </TimelineItemRow>
            ))
          ) : (
            <p className="text-[var(--muted-foreground)] opacity-50 pl-14 text-sm">
              No experience data.
            </p>
          )}
        </TimelineColumn>

        {/* ── Education ─────────────────────────────────────────────────── */}
        <TimelineColumn
          icon="🎓"
          label="Education"
          accentOrange={false}
          isInView={isInView}
          headerDelay={0.15}
        >
          {education.length > 0 ? (
            education.map((edu, index) => (
              <TimelineItemRow
                key={edu.id}
                accentOrange={false}
                isInView={isInView}
                delay={0.2 + index * 0.09}
              >
                <div
                  className={cn(
                    "bg-white/[0.03] border border-white/[0.07]",
                    "p-[clamp(14px,2vw,22px)]",
                    "rounded-[16px] rounded-tl-sm",
                    "group-hover:border-blue-500/25 group-hover:bg-white/[0.05]",
                    "group-hover:shadow-[0_4px_28px_rgba(0,0,0,0.18)]",
                    "transition-[border-color,background-color,box-shadow] duration-300",
                  )}
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-3">
                    <div className="min-w-0">
                      <h4 className="text-[clamp(15px,1.1vw,19px)] font-primary text-[var(--foreground)] group-hover:text-blue-50 transition-colors duration-300 leading-snug">
                        {edu.university}
                      </h4>
                      <p className="text-[var(--muted-foreground)] text-[12px] font-mono mt-0.5">
                        {edu.degree}
                      </p>
                    </div>

                    <span className="self-start text-[var(--muted-foreground)] text-[11px] font-mono py-0.5 px-2.5 bg-white/[0.04] border border-white/[0.07] rounded-full whitespace-nowrap shrink-0">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>

                  {/* Details bullets */}
                  {edu.details && (
                    <ul className="space-y-1.5 mt-2 border-t border-white/[0.05] pt-3">
                      {edu.details
                        .split("\n")
                        .filter(Boolean)
                        .map((line, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[clamp(12px,0.9vw,14px)] text-[var(--muted-foreground)] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <span className="text-blue-400/60 mt-[3px] shrink-0 text-[10px]">▹</span>
                            <span>{line}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </TimelineItemRow>
            ))
          ) : (
            <p className="text-[var(--muted-foreground)] opacity-50 pl-14 text-sm">
              No education data.
            </p>
          )}
        </TimelineColumn>

      </div>
    </section>
  );
};
