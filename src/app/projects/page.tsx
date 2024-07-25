import {Metadata} from "next";
import {getAllProjects} from "@/lib/api";
import ProjectRow from "@/app/_components/ProjectRow";

export default async function Project() {

  const projects = getAllProjects();

  return (
      <>
        <h2>All projects</h2>
        <div className="projects-container">
          {projects.map(project => <ProjectRow project={project}/>)}
        </div>
      </>
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
