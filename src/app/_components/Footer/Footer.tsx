'use client'

import './Footer.scss'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import classNames from "classnames";

export default function Footer(){
    const currentPath = usePathname();
    return(
        <footer>
            <ul>
                <li className={classNames({"active": currentPath.startsWith("/projects")})}>
                    <Link href={"/projects/"}>Projects</Link>
                </li>
                <li className={classNames({"active": currentPath.startsWith("/cheatsheets")})}>
                    <Link href={"/cheatsheets/"}>Cheatsheets</Link>
                </li>
            </ul>
        </footer>
    )
}