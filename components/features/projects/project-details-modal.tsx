"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectItem } from "@/lib/types/sanity";
import { MDXRemote } from "next-mdx-remote";
import { Github, Globe, Figma } from "lucide-react";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "bg-[radial-gradient(ellipse_at_center,rgba(0,87,224,0.12)_0%,rgba(0,87,224,0.04)_30%,rgba(10,10,15,0.98)_100%)]",
          "border border-[var(--glass-border-color)]",
          "text-foreground max-w-[90vw] w-[1000px]",
          "h-[88vh] max-h-[88vh] max-sm:h-[92svh] max-sm:max-h-[92svh]",
          "overflow-hidden flex flex-col p-0 rounded-2xl",
          "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] border-none gap-0",
          "sm:max-w-[1000px]",
          "mt-[48px] lg:mt-[40px]",
        )}
      >
        <div
          data-lenis-prevent
          className={cn(
            "overflow-y-auto flex-1",
            "py-[clamp(32px,4vw,40px)] px-[clamp(20px,4vw,40px)]",
            "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb:hover]:bg-white/20",
          )}
        >
          <DialogHeader
            className={cn(
              "flex justify-between items-start",
              "mb-[clamp(24px,4vw,32px)]",
              "max-sm:flex-col max-sm:gap-2",
            )}
          >
            <div className="flex flex-col gap-2">
              <DialogTitle className="font-secondary text-[clamp(28px,3.25vw,38px)] text-left leading-tight text-foreground">
                {project.title}
              </DialogTitle>
              {project.tagline && (
                <span className="font-secondary text-[var(--skill-text-color)] text-left text-[clamp(16px,1vw,18px)] mb-[clamp(4px,1vw,8px)]">
                  {project.tagline}
                </span>
              )}
            </div>

            <div
              className={cn(
                "flex gap-3",
                "max-sm:w-full max-sm:justify-start self-end",
              )}
            >
              {project.projectLink && (
                <Link
                  href={project.projectLink}
                  target="_blank"
                  className={cn(
                    "rounded-full border border-[var(--glass-border-color)]",
                    "bg-muted flex items-center justify-center text-foreground",
                    "transition-all duration-200",
                    "hover:bg-primary hover:-translate-y-0.5 hover:border-primary",
                    "w-[clamp(32px,3vw,44px)] h-[clamp(32px,3vw,44px)]",
                    "max-sm:w-10 max-sm:h-10",
                  )}
                  aria-label="View Live Site"
                >
                  <Globe className={cn("w-5 h-5", "max-sm:w-4 max-sm:h-4")} />
                </Link>
              )}
              {project.codeLink && (
                <Link
                  href={project.codeLink}
                  target="_blank"
                  className={cn(
                    "rounded-full border border-[var(--glass-border-color)]",
                    "bg-muted flex items-center justify-center text-foreground",
                    "transition-all duration-200",
                    "hover:bg-primary hover:-translate-y-0.5 hover:border-primary",
                    "w-[clamp(32px,3vw,44px)] h-[clamp(32px,3vw,44px)]",
                    "max-sm:w-10 max-sm:h-10",
                  )}
                  aria-label="View Source Code"
                >
                  <Github className={cn("w-5 h-5", "max-sm:w-4 max-sm:h-4")} />
                </Link>
              )}
              {project.designLink && (
                <Link
                  href={project.designLink}
                  target="_blank"
                  className={cn(
                    "rounded-full border border-[var(--glass-border-color)]",
                    "bg-muted flex items-center justify-center text-foreground",
                    "transition-all duration-200",
                    "hover:bg-primary hover:-translate-y-0.5 hover:border-primary",
                    "w-[clamp(32px,3vw,44px)] h-[clamp(32px,3vw,44px)]",
                    "max-sm:w-10 max-sm:h-10",
                  )}
                  aria-label="View Design"
                >
                  <Figma className={cn("w-5 h-5", "max-sm:w-4 max-sm:h-4")} />
                </Link>
              )}
            </div>
          </DialogHeader>

          <div className="mb-[clamp(24px,4vw,40px)]">
            <ScreenshotsCarousel
              screenshots={carouselImages}
              title={project.title}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-[clamp(24px,4vw,32px)]">
            {project.technologies?.map((tech) => (
              <span
                key={tech.id}
                className="text-[12px] px-2.5 py-1 bg-white/5 text-[var(--skill-text-color)] border border-white/10 rounded-full whitespace-nowrap"
              >
                {tech.label}
              </span>
            ))}
            {!project.technologies?.length &&
              project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] px-2.5 py-1 bg-white/5 text-[var(--skill-text-color)] border border-white/10 rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
          </div>

          <div className="text-[clamp(16px,1vw,18px)] leading-relaxed text-[var(--skill-text-color)]">
            {project.serializedContent ? (
              <div
                className={cn(
                  "prose prose-invert max-w-none",
                  "prose-headings:font-secondary prose-headings:text-foreground",
                  "prose-p:font-secondary prose-p:text-[var(--skill-text-color)]",
                  "prose-li:font-secondary prose-li:text-[var(--skill-text-color)]",
                  "prose-strong:text-foreground prose-strong:font-semibold",
                  "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                  "prose-code:text-accent prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none",
                  "prose-pre:bg-[#08080a] prose-pre:border prose-pre:border-white/10",
                  "prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:pr-4",
                  "prose-hr:border-white/10",
                )}
              >
                <MDXRemote {...project.serializedContent} />
              </div>
            ) : (
              <p>{project.description}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
