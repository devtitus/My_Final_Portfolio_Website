"use client";
import React from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ScriptCopyBtn } from "@/components/ui/magicui/script-copy-btn";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import { MapPinIcon, MailIcon, TechnologiesIcon } from "@/lib/utils/icons";
import { SectionHeader } from "@/components/ui";

import { GlobeLoading } from "@/components/ui/globe-loading";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => <GlobeLoading />,
  },
);

// Module-level constants — defined once, never recreated on re-render
const GLOBE_CONFIG = {
  pointSize: 4,
  globeColor: "#113aab",
  showAtmosphere: true,
  atmosphereColor: "#cfe6ff",
  atmosphereAltitude: 0.1,
  emissive: "#0a2b7e",
  emissiveIntensity: 0.25,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#9bdcfb",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const ARC_COLORS = ["#06b6d4", "#3b82f6", "#6366f1"];
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const SAMPLE_ARCS = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: pick(ARC_COLORS),
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: pick(ARC_COLORS),
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: pick(ARC_COLORS),
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: pick(ARC_COLORS),
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: pick(ARC_COLORS),
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: pick(ARC_COLORS),
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: pick(ARC_COLORS),
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.1,
    color: pick(ARC_COLORS),
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: -2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.1,
    color: pick(ARC_COLORS),
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: -33.936138,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.5,
    color: pick(ARC_COLORS),
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: pick(ARC_COLORS),
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: pick(ARC_COLORS),
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.7,
    color: pick(ARC_COLORS),
  },
  {
    order: 10,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 10,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 11,
    startLat: 41.9028,
    startLng: 12.4964,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 11,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 11,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 12,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.1,
    color: pick(ARC_COLORS),
  },
  {
    order: 12,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.2,
    color: pick(ARC_COLORS),
  },
  {
    order: 12,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 13,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 13,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
  {
    order: 13,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.1,
    color: pick(ARC_COLORS),
  },
  {
    order: 14,
    startLat: -33.936138,
    startLng: 18.436529,
    endLat: 21.395643,
    endLng: 39.883798,
    arcAlt: 0.3,
    color: pick(ARC_COLORS),
  },
];

const FobSection = () => {
  const [shouldLoadGlobe, setShouldLoadGlobe] = React.useState(false);

  // Defer Globe initialization to prevent main thread blocking during initial load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadGlobe(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 200px 0px" });

  return (
    <section
      ref={ref}
      className={cn(
        "min-h-svh px-[clamp(24px,4vw,60px)] py-[clamp(60px,8dvh,100px)]",
        "flex flex-col justify-center items-center overflow-hidden",
        "scroll-mt-20", // Navbar clearance
        "max-sm:min-h-auto max-sm:py-[60px]",
        "max-lg:min-h-auto max-lg:py-[80px]",
      )}
    >
      <div
        className={cn(
          "w-full flex flex-col justify-center gap-fluid-md",
          "animate-fade-in-up motion-reduce:animate-none max-w-[1400px]",
        )}
      >
        <SectionHeader
          title="What I bring to the table"
          subtitle="Skills, availability & ways to connect"
          align="center"
        />

        {/* Bento Grid */}
        <div
          className={cn(
            "grid gap-fluid-md",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            "sm:auto-rows-auto lg:auto-rows-[minmax(0,1fr)]",
          )}
        >
          {/* Column 1 - Globe Card */}
          <div
            className={cn(
              "lg:row-span-2 rounded-2xl p-5",
              "sm:row-span-2",
              "bg-white/[0.04] border border-white/[0.12] backdrop-blur-md",
              "shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,87,224,0.2)]",
              "hover:bg-white/[0.07] hover:border-brand-blue/40",
              "transition-all duration-300 hover:-translate-y-1",
              "flex flex-col gap-4 overflow-hidden relative",
              "min-h-[220px] sm:min-h-[320px] lg:min-h-[460px]",
              "group",
            )}
          >
            {/* Always-visible card label at top */}
            <div className="flex flex-col gap-1 shrink-0">
              <h3 className="text-white/90 font-primary text-[clamp(16px,1.15vw,18px)] font-semibold leading-tight inline-flex items-center gap-2">
                <MapPinIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-brand-blue drop-shadow-[0_0_8px_rgba(0,87,224,0.4)]"
                />
                Available Worldwide
              </h3>
              <p className="text-white/75 font-secondary text-[clamp(14px,2.2vw,16px)] font-normal leading-snug group-hover:text-white/90 transition-colors duration-300">
                Remote-first developer ready to collaborate across time zones.
              </p>
            </div>
            <div className="relative flex-1 min-h-[160px] sm:min-h-[180px] lg:min-h-[220px] overflow-hidden rounded-xl bg-brand-blue/[0.06]">
              {isInView ? (
                shouldLoadGlobe ? (
                  <World data={SAMPLE_ARCS} globeConfig={GLOBE_CONFIG} />
                ) : (
                  <GlobeLoading />
                )
              ) : null}
            </div>
          </div>

          {/* Bento 2 - Email / Contact */}
          <div
            className={cn(
              "rounded-2xl p-5",
              "sm:col-start-2 sm:row-start-1 lg:col-start-2 lg:row-start-1",
              "bg-gradient-to-br from-brand-blue/20 via-brand-blue/10 to-white/[0.05]",
              "border border-brand-blue/35 backdrop-blur-md",
              "shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,87,224,0.24)]",
              "hover:bg-brand-blue/15 hover:border-brand-blue/50",
              "transition-all duration-300 hover:-translate-y-1",
              "flex flex-col gap-4 group",
              "sm:min-h-[180px] lg:min-h-0",
            )}
          >
            {/* Always-visible label */}
            <div className="flex flex-col gap-1 shrink-0">
              <h3 className="text-white/95 font-primary text-[clamp(16px,1.15vw,18px)] font-semibold leading-tight inline-flex items-center gap-2">
                <MailIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-brand-blue drop-shadow-[0_0_8px_rgba(0,87,224,0.4)]"
                />
                Get in Touch
              </h3>
              <p className="text-white/80 font-secondary text-[clamp(14px,2.2vw,16px)] font-normal leading-snug group-hover:text-white transition-colors duration-300">
                I&apos;ll get back to you within 24 hours.
              </p>
            </div>
            <ScriptCopyBtn
              showMultiplePackageOptions={true}
              codeLanguage="shell"
              commandMap={customCommandMap}
              className="mt-0 max-sm:py-2"
            />
          </div>

          {/* Bento 3 - Text Reveal */}
          <div
            className={cn(
              "rounded-2xl p-5",
              "sm:col-start-2 sm:row-start-2 lg:col-start-2 lg:row-start-2",
              "bg-white/[0.04] border border-white/[0.12] backdrop-blur-md",
              "shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,87,224,0.2)]",
              "hover:bg-white/[0.06] hover:border-brand-blue/40",
              "transition-all duration-300 hover:-translate-y-1",
              "flex items-start sm:min-h-[180px] lg:min-h-0",
              "focus-within:ring-2 focus-within:ring-brand-blue/50",
            )}
            tabIndex={0}
          >
            <TextRevealCard
              text="Ideas into Reality"
              revealText="Code with Purpose"
              className="focus-visible:outline-none"
            >
              <TextRevealCardTitle>
                Hover or drag to reveal my approach.
              </TextRevealCardTitle>
              <TextRevealCardDescription className="!mt-0 text-white/75">
                Built for both pointer and touch interactions.
              </TextRevealCardDescription>
            </TextRevealCard>
          </div>

          {/* Column 3 - Technologies */}
          <div
            className={cn(
              "sm:col-span-2 sm:row-start-3 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-2 rounded-2xl p-5",
              "bg-white/[0.04] border border-white/[0.12] backdrop-blur-md",
              "shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,87,224,0.2)]",
              "hover:bg-white/[0.06] hover:border-brand-blue/40",
              "transition-all duration-300 hover:-translate-y-1",
              "flex flex-col gap-4 overflow-hidden relative",
              "min-h-[260px]",
              "group",
            )}
            role="region"
            aria-label="Technology stack carousel"
          >
            {/* Always-visible label at top */}
            <div className="flex flex-col gap-1 shrink-0">
              <h3 className="text-white/90 font-primary text-[clamp(16px,1.15vw,18px)] font-semibold leading-tight inline-flex items-center gap-2">
                <TechnologiesIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-brand-blue drop-shadow-[0_0_8px_rgba(0,87,224,0.4)]"
                />
                Tech Stack
              </h3>
              <p className="text-white/75 font-secondary text-[clamp(14px,2.2vw,16px)] font-normal leading-snug group-hover:text-white/90 transition-colors duration-300">
                Tools I use to build fast, scalable web applications.
              </p>
            </div>
            <div className="flex flex-col gap-fluid-sm flex-1 overflow-hidden">
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
              <InfiniteMovingCards
                items={testimonials}
                direction="left"
                speed="slow"
                className="max-sm:hidden"
              />
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                className="max-sm:hidden"
              />
              <InfiniteMovingCards
                items={testimonials}
                direction="left"
                speed="slow"
                className="max-md:hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FobSection;

const customCommandMap = {
  email: "m.works.gd@gmail.com",
};

const testimonials = [
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    name: "React",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    name: "Next.js",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    name: "TypeScript",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    name: "Tailwind CSS",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    name: "Node.js",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    name: "Python",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    name: "MongoDB",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    name: "PostgreSQL",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    name: "Git",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    name: "Docker",
  },
];
