"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "@/lib/types/sanity";
import { ExternalLink, Github } from "lucide-react";
import { ProjectDetailsModal } from "./project-details-modal";
import { cn } from "@/lib/utils";

const MAX_VISIBLE_TAGS = 3;

interface ProjectsGridProps {
  projects: ProjectItem[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
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
          "max-w-[1400px] mx-auto",
          "px-[clamp(16px,4vw,60px)] 2xl:px-0",
          "py-[clamp(60px,10vh,100px)]",
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          "gap-[clamp(24px,4vw,40px)]"
        )}
      >
        {projects.map((project) => {
          const allTags = project.technologies?.length
            ? project.technologies.map((t) => t.label)
            : (project.tags ?? []);
          const visibleTags = allTags.slice(0, MAX_VISIBLE_TAGS);
          const overflowCount = allTags.length - MAX_VISIBLE_TAGS;

          return (
            <article
              key={project.id}
              className={cn(
                "bg-white/[0.04] border border-white/[0.07]",
                "rounded-[20px] overflow-hidden",
                "transition-all duration-300 ease-in-out will-change-transform",
                "hover:-translate-y-2 hover:border-white/[0.14] hover:bg-white/[0.06]",
                "hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]",
                "motion-reduce:hover:translate-y-0",
                "flex flex-col h-full cursor-pointer group"
              )}
              onClick={() => handleProjectClick(project)}
            >
              {/* Thumbnail */}
              <div className="w-full aspect-[16/10] relative overflow-hidden bg-black">
                {project.mainImage ? (
                  <>
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={
                        project === projects[0] ||
                        project === projects[1] ||
                        project === projects[2]
                      }
                      className={cn(
                        "object-cover w-full h-full",
                        "transition-transform duration-500 ease-in-out",
                        "group-hover:scale-105",
                        "motion-reduce:group-hover:scale-100"
                      )}
                    />
                    {/* Hover affordance overlay — Visibility of System Status (Nielsen) */}
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center",
                        "bg-black/50 opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-300",
                        "motion-reduce:hidden"
                      )}
                      aria-hidden="true"
                    >
                      <span className="text-white text-sm font-secondary font-medium tracking-wide px-4 py-2 rounded-full border border-white/30 bg-white/10">
                        View Details →
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-700">
                    No Image
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-[clamp(16px,3vw,24px)] flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-[clamp(8px,1.5vw,12px)]">
                  <h3 className="text-[clamp(1.1rem,1.8vw,1.35rem)] font-semibold font-secondary text-foreground m-0 leading-snug pr-2">
                    {project.title}
                  </h3>
                  <div className="flex gap-3 flex-shrink-0 mt-0.5">
                    {project.codeLink && (
                      <Link
                        href={project.codeLink}
                        target="_blank"
                        className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        title="View Code"
                        aria-label={`View source code for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                      </Link>
                    )}
                    {project.projectLink && (
                      <Link
                        href={project.projectLink}
                        target="_blank"
                        className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        title="Live Project"
                        aria-label={`View live site for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} />
                      </Link>
                    )}
                  </div>
                </div>

                <p className="text-[clamp(0.85rem,1vw,0.925rem)] text-muted-foreground leading-relaxed mb-[clamp(16px,2vw,20px)] flex-1 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags — capped to MAX_VISIBLE_TAGS (Hick's Law / Miller's Law) */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {visibleTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 bg-white/[0.05] border border-white/[0.08] rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {overflowCount > 0 && (
                    <span className="text-[11px] px-2.5 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-brand-blue/80">
                      +{overflowCount} more
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
      />
    </>
  );
};

export default ProjectsGrid;

export { ProjectsGrid };
