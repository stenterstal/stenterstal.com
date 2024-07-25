import {Metadata} from "next";
import {notFound} from "next/navigation";
import {getAllProjects, getProjectBySlug} from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import './Project.scss'

export default async function Project({ params }: Params) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  const content = await markdownToHtml(project.content || "");

  return (
    <>
      <article>
        <h1>{project.title}</h1>
        <h4>{project.date}</h4>
        <hr/>
        <div
            dangerouslySetInnerHTML={{__html: content}}
        />
      </article>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};


export function generateMetadata({params}: Params): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  const title = `${project.title} | Sten ter Stal`;

  return {
    title,
    openGraph: {
      title,
      images: [project.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}
