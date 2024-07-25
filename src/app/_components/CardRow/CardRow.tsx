import './CardRow.scss'
import React from "react";

interface CardRowProps {
    type: "Work" | "Education";
    title: string;
    place: string;
    date: string;
    tags?: string[];
    children?: React.ReactNode
}

export default function CardRow({type, title, place, date, tags, children}: CardRowProps){
    return (
        <div className={"CardRow"}>
            <h3>{title} - {place}</h3>
            <p className={"subtitle"}>{type} between {date}</p>
            <div className="content">
                {children}
            </div>
            <ul className={"tags"}>
                {tags?.map((tag, index) => {
                    return <li key={tag+"-"+index}>{tag}</li>;
                })}
            </ul>
        </div>
    )
}