import {Metadata} from "next";
import {getAllCheatsheets} from "@/lib/api";
import CheatsheetRow from "@/app/_components/CheatsheetRow";
import './page.scss'

export default async function Cheatsheets() {
    const cheatsheets = getAllCheatsheets();
    return (
        <section className={"cheatsheets"}>
            <h1>Cheatsheets</h1>
            <p>Quick cheatsheet references, mostly for personal use</p>
            <div className="container">
                {cheatsheets.map(cheatsheet => <CheatsheetRow cheatsheet={cheatsheet} key={cheatsheet.slug}/>)}
            </div>
        </section>
    );
}

export function generateMetadata(): Metadata {

  const title = `Cheatsheets | Sten ter Stal`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}