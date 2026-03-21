import Link from "next/link";
import Image from "next/image";
import { ProjectItem } from "@/lib/types/sanity";
import { GlassCard } from "@/components/ui";
import { LinkIcon } from "@/lib/utils/icons";

interface ProjectCardProps {
  project: ProjectItem;
  onClick?: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const linkUrl = project.projectLink || project.codeLink || "#";

  return (
    <GlassCard
      hover
      glow
      padding="none"
      className="group overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container with Overlay */}
      <div className="relative aspect-video overflow-hidden bg-black/10">
        {project.mainImage ? (
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50 font-secondary text-[clamp(14px,2vw,16px)]">
            No Image
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

        {/* Hover Info */}
        <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-end w-full">
            <Link
              href={linkUrl}
              target={linkUrl !== "#" ? "_blank" : undefined}
              className="w-9 h-9 rounded-full bg-[rgba(0,87,224,0.2)] border border-[rgba(0,87,224,0.4)] flex items-center justify-center text-white hover:bg-[rgba(0,87,224,0.3)] hover:scale-110 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <LinkIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-semibold font-secondary text-[clamp(16px,2.1vw,20px)] leading-snug mb-1.5">
          {project.title}
        </h3>
        <p className="text-white/70 font-secondary text-[clamp(14px,2.2vw,16px)] leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {(project.tags || []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[clamp(11px,1.2vw,13px)] font-secondary rounded-full bg-[rgba(0,87,224,0.1)] border border-[rgba(0,87,224,0.3)] text-[#0057E0]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;
