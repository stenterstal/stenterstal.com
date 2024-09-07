import {Metadata} from "next";
import {notFound} from "next/navigation";
import {getAllProjects, getProjectBySlug} from "@/lib/api";
import './Project.scss'
import React from "react";
import ReactMarkDown from "react-markdown";

type Params = {
  params: {
    slug: string;
  };
};


export default async function Project({ params }: Params) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <article className={"projects-article"}>
        <header>
          <h1>{project.title}</h1>
          {/*<p>{project.date}</p>*/}
          <ul>
            {project.tags && project.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
        </header>
        <hr/>
        <ReactMarkDown className={"content"}>
          {project.content}
        </ReactMarkDown>
      </article>
    </>
  );
}

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
