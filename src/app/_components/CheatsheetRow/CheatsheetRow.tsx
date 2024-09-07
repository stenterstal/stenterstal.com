'use client'

import './CheatsheetRow.scss'
import React from "react";
import {Cheatsheet} from "@/interfaces/cheatsheet.ts";
import { useRouter } from 'next/navigation'

interface CheatsheetRowProps {
    cheatsheet: Cheatsheet
}

export default function CheatsheetRow({cheatsheet}: CheatsheetRowProps){
    const router = useRouter()
    return (
        <div className={"CheatsheetRow"} onClick={() => router.push(`/cheatsheets/${cheatsheet.slug}`)}>
            <img src={cheatsheet.thumbnail} alt={`${cheatsheet.title}-icon`}/>
            <h3>{cheatsheet.title}</h3>
        </div>
    )
}