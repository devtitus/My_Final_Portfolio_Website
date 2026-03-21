"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectItem } from "@/lib/types/sanity";
import { MDXRemote } from "next-mdx-remote";
import { Github, Globe, Figma, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScreenshotsCarousel } from "./screenshots-carousel";

interface ProjectDetailsModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailsModalProps) {
  if (!project) return null;

  const carouselImages = [
    project.mainImage,
    ...(project.screenshots ?? []),
  ].filter((img): img is string => Boolean(img));

  const allTags = project.technologies?.length
    ? project.technologies
    : (project.tags ?? []).map((t) => ({ id: t, label: t }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "bg-[radial-gradient(ellipse_at_top,rgba(0,87,224,0.10)_0%,rgba(0,87,224,0.03)_35%,rgba(8,8,12,0.99)_100%)]",
          "border border-white/[0.08]",
          "text-foreground max-w-[90vw] w-[1000px]",
          "h-[88vh] max-h-[88vh] max-sm:h-[92svh] max-sm:max-h-[92svh]",
          "overflow-hidden flex flex-col p-0 rounded-2xl",
          "shadow-[0_32px_64px_rgba(0,0,0,0.7)] gap-0",
          "sm:max-w-[1000px]",
          "mt-[48px] lg:mt-[40px]",
        )}
      >
        {/* Sticky header */}
        <div
          className={cn(
            "flex items-start justify-between gap-4",
            "px-[clamp(20px,4vw,40px)] pt-[clamp(24px,3vw,36px)] pb-[clamp(16px,2vw,24px)]",
            "border-b border-white/[0.06]",
            "bg-[rgba(8,8,12,0.6)]",
            "flex-shrink-0",
          )}
        >
          <DialogHeader className="flex-1 min-w-0 space-y-0">
            <DialogTitle className="font-secondary text-[clamp(20px,3vw,30px)] text-left leading-tight text-foreground truncate">
              {project.title}
            </DialogTitle>
            {project.tagline && (
              <p className="font-secondary text-[clamp(13px,1.8vw,15px)] text-white/55 text-left mt-1 leading-relaxed">
                {project.tagline}
              </p>
            )}
          </DialogHeader>

          {/* Actions row */}
          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
            {project.projectLink && (
              <Link
                href={project.projectLink}
                target="_blank"
                className={cn(
                  "rounded-full border border-white/[0.10]",
                  "bg-white/[0.05] flex items-center gap-1.5 px-3 h-9",
                  "text-white/75 text-[clamp(13px,1.4vw,14px)] font-secondary font-medium",
                  "transition-all duration-200",
                  "hover:bg-brand-blue hover:border-brand-blue hover:text-white",
                  "max-sm:px-2 max-sm:gap-0",
                )}
                aria-label="View Live Site"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden sm:inline">Live</span>
              </Link>
            )}
            {project.codeLink && (
              <Link
                href={project.codeLink}
                target="_blank"
                className={cn(
                  "rounded-full border border-white/[0.10]",
                  "bg-white/[0.05] flex items-center gap-1.5 px-3 h-9",
                  "text-white/75 text-[clamp(13px,1.4vw,14px)] font-secondary font-medium",
                  "transition-all duration-200",
                  "hover:bg-white/[0.12] hover:border-white/20 hover:text-white",
                  "max-sm:px-2 max-sm:gap-0",
                )}
                aria-label="View Source Code"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden sm:inline">Code</span>
              </Link>
            )}
            {project.designLink && (
              <Link
                href={project.designLink}
                target="_blank"
                className={cn(
                  "rounded-full border border-white/[0.10]",
                  "bg-white/[0.05] flex items-center gap-1.5 px-3 h-9",
                  "text-white/75 text-[clamp(13px,1.4vw,14px)] font-secondary font-medium",
                  "transition-all duration-200",
                  "hover:bg-white/[0.12] hover:border-white/20 hover:text-white",
                  "max-sm:px-2 max-sm:gap-0",
                )}
                aria-label="View Design"
                onClick={(e) => e.stopPropagation()}
              >
                <Figma className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden sm:inline">Design</span>
              </Link>
            )}
            {/* Explicit close button — Fitts's Law: large enough target */}
            <button
              onClick={() => onClose(false)}
              aria-label="Close project details"
              className={cn(
                "rounded-full border border-white/[0.10]",
                "bg-white/[0.05] flex items-center justify-center w-9 h-9",
                "text-white/50 transition-all duration-200",
                "hover:bg-white/[0.12] hover:border-white/20 hover:text-white",
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div
          data-lenis-prevent
          className={cn(
            "overflow-y-auto flex-1",
            "px-[clamp(20px,4vw,40px)] py-[clamp(24px,3vw,36px)]",
            "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb:hover]:bg-white/20",
          )}
        >
          {/* Gallery section */}
          {carouselImages.length > 0 && (
            <div className="mb-[clamp(28px,4vw,40px)]">
              <p className="text-[clamp(11px,1.2vw,12px)] font-secondary font-semibold text-white/35 uppercase tracking-[0.12em] mb-3">
                Gallery
              </p>
              <ScreenshotsCarousel
                screenshots={carouselImages}
                title={project.title}
              />
            </div>
          )}

          {/* Tech stack section */}
          {allTags.length > 0 && (
            <div className="mb-[clamp(24px,3vw,36px)]">
              <p className="text-[clamp(11px,1.2vw,12px)] font-secondary font-semibold text-white/35 uppercase tracking-[0.12em] mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tech) => (
                  <span
                    key={typeof tech === "string" ? tech : tech.id}
                    className="text-[clamp(12px,1.5vw,14px)] px-2.5 py-1 bg-white/[0.05] text-white/70 border border-white/[0.08] rounded-full whitespace-nowrap font-secondary"
                  >
                    {typeof tech === "string" ? tech : tech.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prose content section */}
          <div>
            <p className="text-[clamp(11px,1.2vw,12px)] font-secondary font-semibold text-white/35 uppercase tracking-[0.12em] mb-4">
              Overview
            </p>
            <div className="text-[clamp(14px,2vw,16px)] leading-[1.75] text-white/75">
              {project.serializedContent ? (
                <div
                  className={cn(
                    "prose prose-invert max-w-none",
                    "prose-headings:font-secondary prose-headings:text-foreground prose-headings:font-semibold",
                    "prose-h2:text-[clamp(18px,2.2vw,22px)] prose-h3:text-[clamp(16px,1.9vw,19px)]",
                    "prose-p:font-secondary prose-p:text-white/75 prose-p:text-[clamp(14px,2vw,16px)] prose-p:leading-[1.75]",
                    "prose-li:font-secondary prose-li:text-white/75 prose-li:text-[clamp(14px,2vw,16px)]",
                    "prose-strong:text-foreground prose-strong:font-semibold",
                    "prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline",
                    "prose-code:text-blue-300 prose-code:bg-white/[0.08] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[clamp(12px,1.5vw,13px)] prose-code:before:content-none prose-code:after:content-none",
                    "prose-pre:bg-[#08080a] prose-pre:border prose-pre:border-white/10 prose-pre:text-[clamp(12px,1.5vw,13px)]",
                    "prose-blockquote:border-l-brand-blue prose-blockquote:bg-white/[0.03] prose-blockquote:py-1 prose-blockquote:pr-4",
                    "prose-hr:border-white/10",
                  )}
                >
                  <MDXRemote {...project.serializedContent} />
                </div>
              ) : (
                <p className="font-secondary text-white/75 text-[clamp(14px,2vw,16px)] leading-[1.75]">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
