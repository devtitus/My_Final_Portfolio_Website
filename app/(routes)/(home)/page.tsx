import dynamic from "next/dynamic";
import { PerformanceHeroSection } from "@/components/features";
import { getSkills } from "@/lib/services/sanity/getSkills";
import { getSiteSettings } from "@/lib/services/sanity/getSiteSettings";
import { getFeaturedProjects } from "@/lib/services/sanity/getFeaturedProjects";
import type { Metadata } from "next";

// Dynamically load below-the-fold components to keep Hero instant
const FobSection = dynamic(
  () => import("@/components/features/home/fobSection"),
);
const ProjectSection = dynamic(
  () => import("@/components/features/home/projectSection"),
);
const SkillsSection = dynamic(
  () => import("@/components/features/home/skillsSection"),
);
const ContactSection = dynamic(
  () => import("@/components/features/home/contactSection"),
);

export const metadata: Metadata = {
  title: "Home",
  description:
    "Transforming complex challenges into elegant solutions. Full Stack Developer & Product Engineer with expertise in modern web technologies.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Melwyn Titus | Full Stack Developer & Product Engineer",
    description: "Transforming complex challenges into elegant solutions.",
    url: "https://www.melwyn.co.in",
    images: ["/og-image.png"],
  },
};

/**
 * Home Page - Server Component
 *
 * Optimized for Zero Glitch / Instant Load.
 * - Hero renders immediately (no data dependency).
 * - Data fetches in PARALLEL using Promise.all (eliminates waterfall).
 * - Heavy UI components are dynamically loaded.
 */
export default async function HomePage() {
  // Parallel data fetching - all requests fire simultaneously
  const [skills, siteSettings, featuredProjects] = await Promise.all([
    getSkills(),
    getSiteSettings(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <PerformanceHeroSection />
      <div className="page-content">
        <FobSection />
        <ProjectSection projects={featuredProjects} />
        <SkillsSection skills={skills} />
        <ContactSection siteSettings={siteSettings} />
      </div>
    </>
  );
}
