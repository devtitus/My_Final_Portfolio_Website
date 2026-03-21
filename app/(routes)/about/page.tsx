import React from "react";
import dynamic from "next/dynamic";
import { AboutHeroSection } from "@/components/features/about/aboutHeroSection";
import ContactSection from "@/components/features/home/contactSection";
import { getExperience } from "@/lib/services/sanity/getExperience";
import { getEducation } from "@/lib/services/sanity/getEducation";
import { getSiteSettings } from "@/lib/services/sanity/getSiteSettings";
import type { Metadata } from "next";

// Code-split the below-fold timeline — still SSRs, just smaller initial JS bundle
const AboutSelectedPath = dynamic(
  () => import("@/components/features/about/aboutSelectedPath").then((m) => m.AboutSelectedPath)
);

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn about Melwyn Titus, a Full Stack Developer with expertise in enterprise-grade web applications, modern JavaScript frameworks, and product engineering.',
  openGraph: {
    title: 'About Melwyn Titus | Full Stack Developer',
    description: 'Turning complex problems into elegant, user-centric products.',
    url: 'https://www.melwyn.co.in/about',
    images: ['/og-image.png'],
  },
};

const AboutPage = async () => {
  // Parallel data fetching — eliminates the sequential waterfall
  const [experiences, education, siteSettings] = await Promise.all([
    getExperience(),
    getEducation(),
    getSiteSettings(),
  ]);

  return (
    <div className="min-h-svh text-[var(--default-text-color)]">
      <AboutHeroSection />
      <AboutSelectedPath
        experiences={experiences}
        education={education}
      />
      <ContactSection
        siteSettings={siteSettings}
        headingHtml={
          <div className="flex flex-col items-center text-center gap-[clamp(8px,1vw,12px)]">
            <span className="text-[clamp(26px,3.2vw,48px)] font-primary leading-none block">
              Let's build the
            </span>
            <span
              className="text-[clamp(26px,3.2vw,48px)] font-serif leading-normal block italic"
              style={{
                background: "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              extraordinary.
            </span>
          </div>
        }
        ctaText="Start a Project"
        subHeading="Ready to collaborate?"
        paragraph="I bring technical expertise and product thinking to every project. Let's create something that makes a difference."
      />
    </div>
  );
};

export default AboutPage;
