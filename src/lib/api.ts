import {Project} from "@/interfaces/project";
import fs from "fs";
import matter from "gray-matter";
import {join} from "path";
import {Cheatsheet} from "@/interfaces/cheatsheet.ts";

const projectsDirectory = join(process.cwd(), "_projects");
const cheatsheetsDirectory = join(process.cwd(), "_cheatsheets");

//
//  Projects
//

export function getProjectsSlug() {
  return fs.readdirSync(projectsDirectory);
}

export function getProjectBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(projectsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Project;
}

export function getAllProjects(): Project[] {
  const slugs = getProjectsSlug();
  return slugs
      .map((slug) => getProjectBySlug(slug))
      .filter(project => project.published)
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date < post2.date ? -1 : 1));
}

export function getAllSortedTags() {
  const projects = getAllProjects();
  const tags = projects
      .filter(project => project.published)
      .filter(project => project.tags !== undefined)
      .map((project) => {return project.tags}).flat() as string[];
  return countTagOccurrences(tags);
}

function countTagOccurrences(tags: string[]){
  const countMap: Record<string, number> = {};

  tags.forEach(value => {
    countMap[value] = (countMap[value] || 0) + 1;
  });

  return Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => {return {[tag]: count}})
}

//
//  Cheatsheets
//

export function getCheatsheetSlug() {
  return fs.readdirSync(cheatsheetsDirectory);
}

export function getCheatsheetBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(cheatsheetsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Cheatsheet;
}

export function getAllCheatsheets(): Cheatsheet[] {
  const slugs = getCheatsheetSlug();
  return slugs.map((slug) => getCheatsheetBySlug(slug));
}