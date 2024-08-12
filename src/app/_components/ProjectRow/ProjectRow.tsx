'use client'

import React from "react";
import './ProjectRow.scss'
import {Project} from "@/interfaces/project";
import { useRouter } from 'next/navigation'

interface Props {
    project: Project
    key: string
}

const ProjectRow: React.FC<Props> = ({project}) => {
    const router = useRouter()
    return(
        <div className={"project"} onClick={() => router.push(`/projects/${project.slug}`)}>
            <div className="thumbnail-bg">
                <img src={project.thumbnail} alt="project thumbnail" className={"thumbnail"}/>
            </div>
            <div className="text">
                <h3>{project.title}</h3>
                <p>{project.excerpt}</p>
            </div>
        </div>
    )
}

export default ProjectRow