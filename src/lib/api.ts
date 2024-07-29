import {Project} from "@/interfaces/project";
import fs from "fs";
import matter from "gray-matter";
import {join} from "path";

const projectsDirectory = join(process.cwd(), "_projects");

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
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

// export function getAllProjectByYear(): Project[] {
// }

export function getAllSortedTags() {
  const projects = getAllProjects();
  const tags = projects.map((project) => {return project.tags}).flat();
  return countTagOccurrences(tags);
}

function countTagOccurrences(tags){
  const countMap = {};

  tags.forEach(value => {
    countMap[value] = (countMap[value] || 0) + 1;
  });

  return Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => {return {[tag]: count}})
}