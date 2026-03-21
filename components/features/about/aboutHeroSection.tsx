import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Built" },
  { value: "India", label: "🇮🇳 Based" },
];

const AboutHeroSection: React.FC = () => {
  return (
    <section
      className={cn(
        "relative min-h-svh flex items-center overflow-hidden",
        "px-[clamp(16px,4vw,60px)] py-[clamp(80px,8vh,100px)]",
      )}
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-[clamp(40px,7vw,100px)] z-10">

        {/* Text Content */}
        <div className="flex-1 flex flex-col w-full items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

          {/* Availability Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6",
              "bg-white/[0.04] border border-white/[0.10]",
              "animate-fade-in-up motion-reduce:animate-none",
            )}
            style={{ animationDelay: "0s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
            </span>
            <span className="text-white/70 font-secondary text-[clamp(12px,0.9vw,13px)] font-medium tracking-wide">
              Full Stack Developer &amp; Product Engineer
            </span>
          </div>

          {/* Heading */}
          <div
            className="animate-fade-in-up motion-reduce:animate-none"
            style={{ animationDelay: "0.1s" }}
          >
            <h1 className="font-primary font-medium leading-[1.1] text-[clamp(36px,4.5vw,68px)] flex flex-wrap justify-center lg:justify-start gap-x-[clamp(8px,1vw,16px)]">
              About{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #0057E0 0%, #2b7fff 55%, #0057E0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Me
              </span>
            </h1>
          </div>

          {/* Description */}
          <p
            className={cn(
              "mt-5 text-[clamp(15px,1.1vw,18px)] text-[var(--text-secondary)] leading-relaxed font-light",
              "max-w-[520px] text-center lg:text-left",
              "animate-fade-in-up motion-reduce:animate-none",
            )}
            style={{ animationDelay: "0.2s" }}
          >
            Turning complex problems into elegant, user-centric products.
            With expertise in modern web technologies, I specialise in creating
            scalable, performant applications that make a difference.
          </p>

          {/* Stats Row */}
          <div
            className={cn(
              "flex flex-wrap justify-center lg:justify-start gap-3 mt-8",
              "animate-fade-in-up motion-reduce:animate-none",
            )}
            style={{ animationDelay: "0.3s" }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col items-center lg:items-start px-5 py-3 rounded-2xl",
                  "bg-white/[0.03] border border-white/[0.08]",
                  "hover:bg-white/[0.06] hover:border-white/[0.14] transition-colors duration-300",
                )}
              >
                <span className="text-white font-primary text-[clamp(20px,1.8vw,28px)] font-semibold leading-none">
                  {stat.value}
                </span>
                <span className="text-white/50 font-secondary text-[clamp(11px,0.8vw,13px)] mt-1.5 leading-none">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div
          className={cn(
            "relative flex-shrink-0 order-1 lg:order-2",
            "w-[clamp(200px,55vw,440px)] aspect-square",
            "rounded-2xl",
            "shadow-[0_0_0_1px_rgba(0,87,224,0.2),0_0_60px_rgba(0,87,224,0.12),0_0_120px_rgba(0,87,224,0.06)]",
            "animate-fade-in-up motion-reduce:animate-none",
          )}
          style={{ animationDelay: "0.15s" }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <Image
              src="/titus-pic.webp"
              alt="Melwyn Titus - Full Stack Developer"
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 440px"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-white/30 font-secondary text-[11px] tracking-[0.15em] uppercase">
          scroll
        </span>
        <div className="w-px h-8 relative overflow-hidden rounded-full bg-white/10">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0057E0] to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
};

export { AboutHeroSection };
