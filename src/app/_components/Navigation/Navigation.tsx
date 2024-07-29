'use client'

import './Navigation.scss'
import Avatar from '../../Avatar.png';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function Navigation(){
    const router = useRouter()
    return(
        <nav>
            <ul>
                <li className={"title"} onClick={() => router.push('/')}>
                    <Image src={Avatar} alt={"test"} height={24}/>
                    Sten ter Stal
                </li>
                <li><Link href={"/projects/"}>Projects</Link></li>
            </ul>
        </nav>
    )
}