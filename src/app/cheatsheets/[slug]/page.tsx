import {Metadata} from "next";
import {notFound} from "next/navigation";
import {getAllCheatsheets, getCheatsheetBySlug} from "@/lib/api";
import React from "react";
import './Cheatsheet.scss'
import Markdown from "@/app/_components/Markdown/Markdown.tsx";

type Params = {
  params: {
    slug: string;
  };
};


export default async function Cheatsheet({ params }: Params) {
  const cheatsheet = getCheatsheetBySlug(params.slug);

  if (!cheatsheet) {
    return notFound();
  }

  return (
    <>
      <article className={"cheatsheet-article"}>
        <header>
          <img src={cheatsheet.thumbnail}  alt={`${cheatsheet.title}-icon`}/>
          <h1>{cheatsheet.title}</h1>
        </header>
        <hr/>
        <Markdown content={cheatsheet.content}/>
      </article>
    </>
  );
}

export function generateMetadata({params}: Params): Metadata {
  const cheatsheet = getCheatsheetBySlug(params.slug);

  if (!cheatsheet) {
    return notFound();
  }

  const title = `${cheatsheet.title} Cheatsheet | Sten ter Stal`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  const cheatsheets = getAllCheatsheets();

  return cheatsheets.map((cheatsheet) => ({
    slug: cheatsheet.slug,
  }));
}
