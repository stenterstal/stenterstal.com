'use client'

import './Navigation.scss'
import Avatar from '../../Avatar.png';
import Github from './github.svg';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function Navigation(){
    const router = useRouter()
    return(
        <nav>
            <ul>
                <li className={"title"} onClick={() => router.push('/')}>
                    <Image src={Avatar} alt={"portrait"} height={24}/>
                    Sten ter Stal
                </li>
                <li><Link href={"/projects/"}>Projects</Link></li>
                <div className="repo">
                    <a href="https://github.com/stenterstal/stenterstal.github.io">
                        <Image src={Github} alt={"github-repo-link"} height={22}/>
                    </a>
                </div>
            </ul>
        </nav>
    )
}