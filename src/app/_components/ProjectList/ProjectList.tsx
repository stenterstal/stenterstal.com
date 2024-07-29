'use client'

import {Project} from "@/interfaces/project.ts";
import {useState} from "react";
import ProjectRow from "@/app/_components/ProjectRow";
import './ProjectList.scss'

interface Props {
    projects: Project[]
    tags: {[p: string]: unknown}[]
}

export default function ProjectList({projects, tags}: Props){
    const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
    return (
        <>
            <ul className={"tags"}>
                {tags.map((tagObj) => {
                    const tagName = Object.keys(tagObj)[0];
                    const tagCount = tagObj[tagName];
                    return(
                        <li
                            key={tagName}
                            className={(selectedTag !== undefined && selectedTag === tagName) && 'active' || ''}
                            onClick={() => {
                                if(selectedTag == tagName) setSelectedTag(undefined)
                                else setSelectedTag(tagName)
                            }}>
                            {tagName} ({tagCount})
                        </li>)
                })}
            </ul>
            <div className="projects-container">
                {projects
                    .filter(project => {
                        if(!selectedTag) return true;
                        if(project.tags === undefined) return false;
                        return project.tags.includes(selectedTag);
                    })
                    .map(project => <ProjectRow project={project} key={project.slug}/>)}
            </div>
        </>
    )
}