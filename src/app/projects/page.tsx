import {Metadata} from "next";
import {getAllProjects, getAllSortedTags} from "@/lib/api";
import ProjectList from "@/app/_components/ProjectList";

export default async function Project() {
  const projects = getAllProjects();
  const tags = getAllSortedTags();

  return (
      <div className={"projects"}>
        <h2>All projects</h2>
        <ProjectList projects={projects} tags={tags}/>
      </div>
  );
}

export function generateMetadata(): Metadata {

  const title = `All projects | Sten ter Stal`;

  return {
    title,
    openGraph: {
      title,
      // images: [project.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}
