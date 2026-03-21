import React, { memo } from "react";
import { GlassCard } from "@/components/ui";

interface SkillCardProps {
  skillName: string;
  skillIcon: string;
}

const SkillCard = memo(function SkillCard({ skillName, skillIcon }: SkillCardProps) {
  return (
    <GlassCard
      hover
      glow={false}
      blur={false}
      padding="sm"
      className="group flex flex-col items-center justify-center gap-3"
    >
      <div className="flex flex-col items-center justify-center gap-[clamp(4px,1vw,12px)]">
        <div
          className="relative w-[clamp(34px,3vw,44px)] h-[clamp(34px,3vw,44px)] will-change-transform transition-transform duration-300 group-hover:scale-110"
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
        <span className="text-white/80 text-[clamp(12px,1vw,14px)] font-medium text-center transition-colors duration-300 group-hover:text-white">
          {skillName}
        </span>
      </div>
    </GlassCard>
  );
});

export default SkillCard;
