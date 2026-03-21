import React from "react";
import { ProjectsHero } from "@/components/features/projects/projectsHero";
import { ProjectsGrid } from "@/components/features/projects/projectsGrid";
import ContactSection from "@/components/features/home/contactSection";
import { getProjects } from "@/lib/services/sanity/getProjects";
import { getSiteSettings } from "@/lib/services/sanity/getSiteSettings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Case Studies | Melwyn Titus",
  description:
    "Exploring the intersection of design, engineering, and user experience.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Case Studies | Melwyn Titus",
    description:
      "Exploring the intersection of design, engineering, and user experience.",
    url: "https://www.melwyn.co.in/projects",
    images: ["/og-image.png"],
  },
};

const ProjectsPage = async () => {
  const projects = await getProjects();
  const siteSettings = await getSiteSettings();

  return (
    <div className="min-h-svh text-[var(--default-text-color)]">
      <ProjectsHero />
      <ProjectsGrid projects={projects} />
      <ContactSection
        siteSettings={siteSettings}
        ctaText="Get in Touch"
        subHeading="Ready to Collaborate?"
        paragraph="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
      />
    </div>
  );
};

export default ProjectsPage;
