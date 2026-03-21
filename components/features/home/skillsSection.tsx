"use client";
import React, { useState, memo } from "react";
import { cn } from "@/lib/utils";
import { SkillSpinningImage } from "@/lib/utils/icons";
import SkillCard from "@/components/features/home/skillCard";
import { SectionHeader, GlassButton } from "@/components/ui";
import type { SkillItem } from "@/lib/services/sanity/getSkills";

interface SkillsSectionProps {
  skills: SkillItem[];
}

/**
 * SkillsSection - Client Component (receives data as props from server)
 *
 * Performance improvements:
 * - Data is fetched server-side and passed as props (no useEffect)
 * - Component is memoized to prevent unnecessary re-renders
 * - SkillCards are memoized individually
 */
const SkillsSection = memo(function SkillsSection({ skills }: SkillsSectionProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);

  const shouldShowToggle = skills.length > 10;
  const visibleSkills = shouldShowToggle && !showAllSkills ? skills.slice(0, 10) : skills;
  const remainingSkillsCount = skills.length - 10;

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section className={cn(
      "min-h-svh px-[clamp(16px,4vw,60px)] py-[clamp(60px,10vh,100px)]",
      "flex flex-col justify-center items-center overflow-hidden relative",
      "scroll-mt-20",
      "max-sm:min-h-auto max-sm:py-[60px]",
      "max-lg:min-h-auto max-lg:py-[80px]"
    )}>
      <div className={cn(
        "w-full flex flex-col items-center justify-center",
        "gap-fluid-lg animate-fade-in-up",
        "motion-reduce:animate-none"
      )}>
        {/* Header with spinning accent inline */}
        <div className={cn(
          "flex flex-col items-center gap-fluid-sm",
          "sm:flex-row sm:items-center sm:gap-fluid-md"
        )}>
          {/* Spinning accent — compact, decorative */}
          <div className={cn(
            "animate-spin-slow motion-reduce:animate-none shrink-0",
            "w-[clamp(72px,8vw,112px)] h-[clamp(72px,8vw,112px)]",
          )}>
            <SkillSpinningImage className="aspect-square w-full h-full" />
          </div>

          <SectionHeader
            title="My Skills"
            subtitle="Technologies and tools I work with"
            align="center"
            className="mb-0 sm:text-left sm:items-start"
          />
        </div>

        {/* Skills Grid — predictable columns, no orphaned rows */}
        <div className={cn(
          "w-full max-w-[1400px] grid gap-fluid-sm",
          "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        )}>
          {visibleSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skillName={skill.label}
              skillIcon={skill.iconUrl}
            />
          ))}
        </div>

        {/* Toggle Button */}
        {shouldShowToggle && (
          <GlassButton
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="mt-fluid-sm"
          >
            {showAllSkills ? "Show Less" : `Show More (${remainingSkillsCount})`}
          </GlassButton>
        )}
      </div>
    </section>
  );
});

export default SkillsSection;
