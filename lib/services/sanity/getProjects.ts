import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import type { ProjectItem, SanityProject } from "@/lib/types/sanity";
import { serializeMDX } from "@/lib/utils/serializeMDX";

export const getProjects = async (): Promise<ProjectItem[]> => {
  const query = `*[_type == "project" && isPublished == true] | order(_createdAt desc) {
    _id,
    title,
    tagline,
    slug,
    mainImage,
    screenshots,
    description,
    projectLink,
    codeLink,
    designLink,
    tags,
    technologies[]->{
      _id,
      label,
      icon
    },
    formattedContent,
    isPublished
  }`;

  try {
    const projects: SanityProject[] = await client.fetch(
      query,
      {},
      { next: { revalidate: 3600 } },
    );

    const serializedProjects = await Promise.all(
      projects.map(async (project) => {
        try {
          const serialized = project.formattedContent?.trim()
            ? await serializeMDX(project.formattedContent)
            : null;
          const projectItem: ProjectItem = {
            id: project._id,
            title: project.title,
            tagline: project.tagline,
            slug: project.slug?.current || "",
            mainImage: urlForImage(project.mainImage)?.url() || "",
            screenshots:
              project.screenshots?.map(
                (img) => urlForImage(img)?.url() || "",
              ) || [],
            description: project.description,
            projectLink: project.projectLink,
            codeLink: project.codeLink,
            designLink: project.designLink,
            tags: project.tags,
            technologies:
              project.technologies?.map((tech) => ({
                id: tech._id,
                label: tech.label,
                iconUrl: urlForImage(tech.icon)?.url() || "",
                uid: null,
              })) || [],
            formattedContent: project.formattedContent,
            serializedContent: serialized,
            isPublished: project.isPublished,
          };
          return projectItem;
        } catch (err) {
          console.error(`Error serializing project ${project.title}:`, err);
          // Fallback: return project without serialized content instead of null
          return {
            id: project._id,
            title: project.title,
            tagline: project.tagline,
            slug: project.slug?.current || "",
            mainImage: urlForImage(project.mainImage)?.url() || "",
            screenshots:
              project.screenshots?.map(
                (img) => urlForImage(img)?.url() || "",
              ) || [],
            description: project.description,
            projectLink: project.projectLink,
            codeLink: project.codeLink,
            designLink: project.designLink,
            tags: project.tags,
            technologies:
              project.technologies?.map((tech) => ({
                id: tech._id,
                label: tech.label,
                iconUrl: urlForImage(tech.icon)?.url() || "",
                uid: null,
              })) || [],
            formattedContent: project.formattedContent,
            serializedContent: null,
            isPublished: project.isPublished,
          };
        }
      }),
    );

    return serializedProjects.filter((p): p is ProjectItem => p !== null);
  } catch (error) {
    console.error("Error fetching projects from Sanity:", error);
    return [];
  }
};
