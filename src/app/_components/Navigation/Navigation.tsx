'use client'

import './Navigation.scss'
import Avatar from '../../../../public/assets/img/Avatar.png';
import Github from './github.svg';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import classNames from "classnames";

export default function Navigation(){
    const router = useRouter()
    const currentPath = usePathname();
    console.log(currentPath)
    return(
        <nav>
            <ul>
                <li className={classNames({
                    "title": true,
                    "active": currentPath === "/"
                })} onClick={() => router.push('/')}>
                    <Image src={Avatar} alt={"portrait"} height={24}/>
                    Sten ter Stal
                </li>
                <li className={classNames({
                    "active": currentPath.startsWith("/projects")
                })}>
                    <Link href={"/projects/"}>Projects</Link>
                </li>
                <div className="repo">
                    <a href="https://github.com/stenterstal/stenterstal.github.io">
                        <Image src={Github} alt={"github-repo-link"} height={22}/>
                    </a>
                </div>
            </ul>
        </nav>
    )
}