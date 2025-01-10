'use client'
import ReactMarkDown from "react-markdown";
import {useState} from "react";
import "./Markdown.scss"
import classNames from "classnames";

interface MarkdownProps {
    content: string
}

export default function Markdown({content}: MarkdownProps){
    return (
        <ReactMarkDown
            className={"content"}
            components={{
                pre: (props) => {
                    const {node} = props;
                    // @ts-ignore
                    const codeChunk = node?.children[0].children[0].value
                    const [copied, setCopied] = useState(false)
                    const handleCopyCode = (codeChunk: string) => {
                        navigator.clipboard.writeText(codeChunk.split("//")[0].trimEnd()).then(r => setCopied(true));
                        setTimeout(() => setCopied(false), 5000)
                    }
                    return (
                        <div className={"codeBlock"}>
                            <pre {...props} onClick={() => handleCopyCode(codeChunk)}></pre>
                            <p className={"copiedMessage" + classNames({" active": copied, " hidden": !copied})}>Copied!</p>
                        </div>
                    )
                }
            }}
        >
            {content}
        </ReactMarkDown>
    )
}

