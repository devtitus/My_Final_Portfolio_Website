import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IconButton } from "@/components/ui";

// Social icons (you can replace with actual icon components)
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);



const Footer: React.FC = () => {
  return (
    <footer className={cn(
      "relative px-[clamp(16px,4vw,60px)] py-[clamp(40px,5vw,60px)] pb-[clamp(30px,4vw,40px)] flex flex-col items-center",
      "bg-gradient-to-b from-black/80 to-black/95",
      "border-t border-brand-blue/20",
      // Ambient glow shade
      "after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_100%,rgba(0,87,224,0.1),transparent_70%)] after:pointer-events-none",
      // Top glow
      "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px",
      "before:bg-gradient-to-r before:from-transparent before:via-brand-blue/40 before:to-transparent",
      // Mobile
      "max-lg:px-4 max-lg:py-8 max-lg:pb-6"
    )}>
      <div className={cn(
        "flex justify-center items-start gap-[clamp(14px,1vw,24px)]",
        "animate-fade-in-up motion-reduce:animate-none",
        "max-lg:flex-col w-full max-w-[1400px]",
        "max-sm:flex-col-reverse"
      )}>
        <div className={cn(
          "flex flex-col gap-[clamp(16px,2vw,24px)] flex-1",
          "max-lg:w-full max-sm:items-center"
        )}>
          <div className="flex items-center">
            <Image
              src={"/navbar/logo.png"}
              width={64}
              height={64}
              alt="Logo"
              className={cn(
                "w-16 h-16 aspect-square",
                "drop-shadow-[0_0_20px_rgba(0,87,224,0.3)]",
                "transition-[filter] duration-300",
                "hover:drop-shadow-[0_0_30px_rgba(0,87,224,0.5)]"
              )}
            />
          </div>
          <p className={cn(
            "text-white/75 font-secondary text-[clamp(16px,1.25vw,18px)] font-normal leading-relaxed",
            "max-w-[320px] mb-4",
            "max-lg:max-w-full max-lg:m-0 max-sm:text-center"
          )}>
            I&apos;m Melwyn - a full-stack developer, freelancer & problem
            solver. Thanks for checking out my site!
          </p>
          <p className="text-white/50 font-secondary text-[clamp(14px,1.5vw,16px)] font-normal leading-relaxed m-0">
            © {new Date().getFullYear()} Melwyn Titus
          </p>
        </div>

        <div className={cn(
          "flex gap-[clamp(2rem,8vw,6rem)] flex-1",
          "max-lg:w-full max-lg:mt-6 max-lg:mb-6",
          "max-sm:grid max-sm:grid-cols-3 max-sm:gap-[clamp(2rem,8vw,6rem)]"
        )}>
          <div className={cn(
            "flex flex-col gap-[clamp(12px,2vw,16px)] flex-1",
            "max-lg:w-full max-lg:gap-4",
            "max-sm:items-center"
          )}>
            <h3 className="text-white/95 font-secondary text-[clamp(16px,1.5vw,18px)] font-medium leading-normal m-0 tracking-[0.02em]">
              General
            </h3>
            <nav className="flex flex-col gap-3 max-sm:items-center">
              <Link
                href="/"
                className={cn(
                  "relative w-fit text-white/65 font-secondary text-[clamp(16px,1.5vw,18px)] font-normal leading-relaxed",
                  "transition-all duration-300",
                  // Underline effect
                  "after:content-[''] after:absolute after:bottom-[-2px] after:left-0",
                  "after:w-0 after:h-px after:bg-gradient-to-r after:from-brand-blue after:to-transparent",
                  "after:transition-[width] after:duration-300",
                  "hover:text-white/95 hover:translate-x-1 hover:after:w-full"
                )}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={cn(
                  "relative w-fit text-white/65 font-secondary text-[clamp(16px,1.5vw,18px)] font-normal leading-relaxed",
                  "transition-all duration-300",
                  "after:content-[''] after:absolute after:bottom-[-2px] after:left-0",
                  "after:w-0 after:h-px after:bg-gradient-to-r after:from-brand-blue after:to-transparent",
                  "after:transition-[width] after:duration-300",
                  "hover:text-white/95 hover:translate-x-1 hover:after:w-full"
                )}
              >
                About
              </Link>
              <Link
                href="/projects"
                className={cn(
                  "relative w-fit text-white/65 font-secondary text-[clamp(16px,1.5vw,18px)] font-normal leading-relaxed",
                  "transition-all duration-300",
                  "after:content-[''] after:absolute after:bottom-[-2px] after:left-0",
                  "after:w-0 after:h-px after:bg-gradient-to-r after:from-brand-blue after:to-transparent",
                  "after:transition-[width] after:duration-300",
                  "hover:text-white/95 hover:translate-x-1 hover:after:w-full"
                )}
              >
                Projects
              </Link>
            </nav>
          </div>

          <div className={cn(
            "flex flex-col gap-[clamp(12px,2vw,16px)] flex-1",
            "max-lg:w-full max-lg:gap-4",
            "max-sm:items-center"
          )}>
            <h3 className="text-white/95 font-secondary text-[clamp(16px,1.5vw,18px)] font-medium leading-normal m-0 tracking-[0.02em]">
              More
            </h3>
            <nav className="flex flex-col gap-3 max-sm:items-center">
              <Link
                href="/contact"
                className={cn(
                  "relative w-fit text-white/65 font-secondary text-[clamp(16px,1.5vw,18px)] font-normal leading-relaxed",
                  "transition-all duration-300",
                  "after:content-[''] after:absolute after:bottom-[-2px] after:left-0",
                  "after:w-0 after:h-px after:bg-gradient-to-r after:from-brand-blue after:to-transparent",
                  "after:transition-[width] after:duration-300",
                  "hover:text-white/95 hover:translate-x-1 hover:after:w-full"
                )}
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className={cn(
            "flex flex-col gap-[clamp(12px,2vw,16px)] flex-1",
            "max-lg:w-full max-lg:gap-4 max-sm:items-center"
          )}>
            <h3 className="text-white/95 font-secondary text-[clamp(16px,1.5vw,18px)] font-medium leading-normal m-0 tracking-[0.02em]">
              Social
            </h3>
            <div className="flex gap-3 items-start max-sm:flex-col">
              <Link href="https://www.linkedin.com/in/melwyn-john-8125bb214" target="_blank" rel="noopener noreferrer">
                <IconButton
                  icon={<LinkedInIcon />}
                  tooltip="LinkedIn"
                  ariaLabel="LinkedIn"
                  size="md"
                />
              </Link>
              <Link href="https://github.com/devtitus" target="_blank" rel="noopener noreferrer">
                <IconButton
                  icon={<GithubIcon />}
                  tooltip="Github"
                  ariaLabel="Github"
                  size="md"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
