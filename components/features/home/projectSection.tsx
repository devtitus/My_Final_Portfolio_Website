"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ProjectCard from "@/components/features/home/projectCard";
import { SectionHeader, PrimaryButton } from "@/components/ui";
import { ProjectDetailsModal } from "@/components/features/projects/project-details-modal";

import { ProjectItem } from "@/lib/types/sanity";

interface ProjectSectionProps {
  projects?: ProjectItem[];
}

const ProjectSection = ({ projects = [] }: ProjectSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      <section
        className={cn(
          "min-h-svh px-[clamp(24px,4vw,60px)] py-[clamp(60px,10vh,100px)]",
          "flex flex-col justify-center items-center overflow-hidden",
          "scroll-mt-20",
          "max-sm:min-h-auto max-sm:py-[60px]",
          "max-lg:min-h-auto max-lg:py-[80px]",
        )}
      >
        <div
          className={cn(
            "w-full max-w-[1400px] flex flex-col justify-center items-center",
            "gap-fluid-lg animate-fade-in-up motion-reduce:animate-none",
          )}
        >
          <SectionHeader
            title="Featured Projects"
            subtitle="Hand-picked work I'm proud of"
            align="center"
          />

          {/* Project Grid */}
          <div
            className={cn(
              "w-full grid gap-fluid-md",
              "grid-cols-1 sm:grid-cols-2",
            )}
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>

          <Link href="/projects" className="max-sm:w-full max-sm:max-w-[280px]">
            <PrimaryButton
              variant="outline"
              size="md"
              className={cn(
                "mt-6 group flex items-center gap-2 font-secondary text-[clamp(14px,1.5vw,16px)]",
                "max-sm:w-full max-sm:justify-center",
              )}
            >
              Explore More Work
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </PrimaryButton>
          </Link>
        </div>
      </section>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
      />
    </>
  );
};

export default ProjectSection;
