'use client'

import './ProjectRow.scss'
import Thumbnail from './thumbnail.jpg';
import {Project} from "@/interfaces/project";
import { useRouter } from 'next/navigation'

interface Props {
    project: Project
}

export default function ProjectRow({project}: Props){
    const router = useRouter()
    return(
        <div className={"project"} onClick={() => router.push(`/projects/${project.slug}`)}>
            <img src={project.coverImage} alt="homelab" className={"thumbnail"}/>
            <div className="text">
                <h3>{project.title}</h3>
                <p>{project.excerpt}</p>
            </div>
        </div>
    )
}