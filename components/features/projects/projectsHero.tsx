import React from "react";
import { cn } from "@/lib/utils";

const ProjectsHero: React.FC = () => {
  return (
    <section
      className={cn(
        // Base Fluid Layout
        "flex flex-col justify-center",
        "px-[clamp(16px,4vw,60px)] 2xl:px-0",
        "py-[clamp(60px,10vh,100px)]",
        "max-w-[1400px] mx-auto relative overflow-hidden",
        "mt-[64px] lg:mt-[0px]",
        // Mobile/Tablet Overrides
        "max-sm:py-[60px] max-sm:text-center",
        "max-lg:py-[80px]",
      )}
    >
      {/* Decorative background element - optimized for mobile */}
      <div
        className={cn(
          "absolute -top-[20%] -right-[10%] rounded-full -z-10 pointer-events-none",
          "w-[600px] h-[600px]",
          "max-sm:w-[400px] max-sm:h-[400px] max-sm:-top-[10%] max-sm:-right-[20%]",
        )}
      />

      <h1 className="text-[clamp(32px,4vw,56px)] font-medium text-foreground mb-[clamp(8px,1vw,12px)] font-primary leading-[1.1]">
        Projects &amp;{" "}
        <span
          style={{
            background:
              "linear-gradient(90deg, #0057E0 0%, #2b7fff 55%, #0057E0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Case Studies
        </span>
      </h1>
      <p
        className={cn(
          "text-[clamp(16px,1vw,18px)] text-muted-foreground leading-relaxed",
          "max-w-[600px] max-sm:text-left",
          "max-sm:max-w-full max-sm:mx-auto",
        )}
      >
        Each project represents a unique challenge and learning opportunity.
        From enterprise platforms to personal experiments, I approach every
        build with the same commitment to quality and innovation.
      </p>
    </section>
  );
};

export { ProjectsHero };
