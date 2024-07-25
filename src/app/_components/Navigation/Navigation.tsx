import './Navigation.scss'
import Link from "next/link";

export default function Navigation(){
    return(
        <nav>
            <ul>
                <li><Link href={"/projects/"}>Projects</Link></li>
            </ul>
        </nav>
    )
}