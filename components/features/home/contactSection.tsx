"use client";
import React, { memo, useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PrimaryButton } from "@/components/ui";
import type { SiteSettings } from "@/lib/services/sanity/getSiteSettings";
import { useContactModal } from "@/components/providers/contact-modal-provider";

interface ContactSectionProps {
  headingHtml?: React.ReactNode;
  ctaText?: string;
  subHeading?: string;
  paragraph?: string;
  siteSettings?: SiteSettings | null;
}

/**
 * ContactSection - Client Component (receives data as props from server)
 *
 * Performance improvements:
 * - Data is fetched server-side and passed as props (no useEffect)
 * - Component is memoized to prevent unnecessary re-renders
 * - Background image is lazy loaded with IntersectionObserver
 * - Uses Next.js Image component for optimization
 */
const ContactSection = memo(function ContactSection({
  headingHtml,
  ctaText,
  subHeading,
  paragraph,
  siteSettings,
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { openContactModal } = useContactModal();

  useEffect(() => {
    if (!sectionRef.current || !siteSettings?.contactBackgroundImageUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [siteSettings?.contactBackgroundImageUrl]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "min-h-svh px-[clamp(16px,4vw,60px)] relative",
        "flex flex-col justify-center items-center overflow-hidden",
        "scroll-mt-20",
        "before:content-[''] before:absolute before:inset-0",
        "before:bg-gradient-to-b before:from-black/85 before:via-black/70 before:to-black/85",
        "before:backdrop-blur-md before:z-[1]",
        "after:content-[''] after:absolute after:top-1/2 after:left-1/2",
        "after:-translate-x-1/2 after:-translate-y-1/2",
        "after:w-[min(600px,90vw)] after:h-[min(600px,90vw)]",
        "after:bg-[radial-gradient(circle,rgba(0,87,224,0.15)_0%,rgba(0,87,224,0.05)_40%,transparent_70%)]",
        "after:animate-ambient-pulse after:pointer-events-none after:z-[1]",
        "motion-reduce:after:animate-none"
      )}
    >
      {/* Lazy loaded background image */}
      {siteSettings?.contactBackgroundImageUrl && isVisible && (
        <Image
          src={siteSettings.contactBackgroundImageUrl}
          alt=""
          fill
          priority={false}
          loading="lazy"
          quality={75}
          sizes="100vw"
          className={cn(
            "object-cover object-center -z-10 transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      )}

      <div className={cn(
        "w-full max-w-[1400px] flex flex-col items-center justify-center",
        "gap-fluid-md animate-fade-in-up motion-reduce:animate-none",
        "py-[clamp(80px,10vh,100px)] relative z-[2]",
        "max-sm:py-[80px] max-sm:gap-fluid-sm",
        "max-lg:py-[80px]"
      )}>
        <div className="flex flex-col gap-[clamp(20px,2vw,28px)] items-center">

          {/* Heading — standard persuasion order: heading first */}
          <div className="flex flex-col items-center gap-1">
            {headingHtml || (
              <>
                <span className={cn(
                  "max-w-[min(900px,90vw)] text-white text-center",
                  "font-primary font-medium leading-tight tracking-tight",
                  "drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
                  "text-[clamp(26px,3.2vw,48px)]"
                )}>
                  From concept to{" "}
                  <span className={cn(
                    "bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue",
                    "bg-clip-text text-transparent font-bold"
                  )}>
                    Creation
                  </span>
                </span>
                <span className={cn(
                  "max-w-[min(900px,90vw)] text-white text-center",
                  "font-primary font-medium leading-tight tracking-tight",
                  "drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
                  "text-[clamp(26px,3.2vw,48px)]"
                )}>
                  Let&apos;s make it{" "}
                  <span className={cn(
                    "bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue",
                    "bg-clip-text text-transparent font-bold"
                  )}>
                    Happen
                  </span>
                </span>
              </>
            )}
          </div>

          {/* Subheading — context before the CTA */}
          <p className={cn(
            "text-white/90 text-center font-secondary",
            "text-[clamp(18px,1.5vw,22px)] font-medium leading-relaxed tracking-tight",
          )}>
            {subHeading || "Ready to bring your ideas to life?"}
          </p>

          {/* Supporting paragraph */}
          <p className={cn(
            "text-white/65 text-center font-secondary",
            "text-[clamp(15px,1.4vw,18px)] font-normal leading-relaxed tracking-wide",
            "max-w-[min(560px,90vw)]"
          )}>
            {paragraph ||
              "I'm always excited to collaborate on innovative projects and help turn your vision into reality."}
          </p>

          {/* CTA — after context, standard persuasion sequence */}
          <PrimaryButton
            variant="solid"
            size="md"
            className="mt-2 max-sm:w-full max-sm:max-w-[280px] max-sm:justify-center"
            onClick={openContactModal}
          >
            {ctaText || "Get In Touch"}
          </PrimaryButton>

        </div>
      </div>
    </section>
  );
});

export default ContactSection;
