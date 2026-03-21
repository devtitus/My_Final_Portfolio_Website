import React from "react";
import { cn } from "@/lib/utils";

const ContactHero: React.FC = () => {
  return (
    <section
      className={cn(
        "relative px-[clamp(16px,4vw,60px)] pt-[20px] pb-[clamp(32px,5vh,56px)]",
        "max-w-[1400px] mx-auto 2xl:px-0 z-10"
      )}
    >
      <div className="flex flex-col items-start gap-[clamp(12px,1.5vw,20px)] mt-[64px] lg:mt-[70px]">

        {/* Availability badge */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
            "bg-white/[0.04] border border-white/[0.10]"
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
          </span>
          <span className="text-white/70 font-secondary text-[clamp(12px,0.9vw,13px)] font-medium tracking-wide">
            Available for new projects
          </span>
        </div>

        <h1 className="font-primary text-[clamp(36px,4.5vw,64px)] font-medium text-foreground leading-[1.1] m-0">
          Let&apos;s Build{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #0057E0 0%, #2b7fff 55%, #0057E0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Something
          </span>
          <br className="hidden sm:block" />
          {" "}Together
        </h1>

        <p className="font-secondary text-[clamp(16px,1.1vw,19px)] font-normal leading-relaxed text-white/60 m-0 max-w-[520px]">
          Whether you have a project in mind, want to explore a collaboration,
          or just want to say hello — my inbox is always open.
        </p>
      </div>
    </section>
  );
};

export { ContactHero };
