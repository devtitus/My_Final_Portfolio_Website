import React, { memo } from "react";
import { GlassCard } from "@/components/ui";

interface SkillCardProps {
  skillName: string;
  skillIcon: string;
}

const SkillCard = memo(function SkillCard({
  skillName,
  skillIcon,
}: SkillCardProps) {
  return (
    <GlassCard
      hover
      glow={false}
      blur={false}
      padding="sm"
      className="group flex flex-col items-center justify-center gap-3"
    >
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-2.5">
        <div
          className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 will-change-transform transition-transform duration-300 group-hover:scale-110"
          style={{ willChange: "transform" }}
        >
          <img
            src={skillIcon}
            alt={`${skillName} icon`}
            className="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="text-white/80 text-[clamp(12px,1.5vw,14px)] font-secondary font-medium leading-snug text-center transition-colors duration-300 group-hover:text-white">
          {skillName}
        </span>
      </div>
    </GlassCard>
  );
});

export default SkillCard;
