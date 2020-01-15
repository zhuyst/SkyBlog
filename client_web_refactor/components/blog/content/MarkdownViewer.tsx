import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";

import "highlight.js/styles/default.css";
import "./MarkdownViewer.scss";

interface ICodeBlockProps {
  language?: string;
  value: string;
}

const CodeBlock = (props: ICodeBlockProps) => {
  const codeEl = useRef<HTMLElement>(null);
  useEffect(() => {
    if (codeEl.current) {
      hljs.highlightBlock(codeEl.current);
    }
  });

  return (
    <pre>
      <code ref={codeEl} className={props.language}>
        {props.value}
      </code>
    </pre>
  );
};


interface IMarkdownViewerProps {
  text: string;
}

export default (props: IMarkdownViewerProps) => (
  <div className="markdown-viewer">
    <ReactMarkdown
      source={props.text}
      renderers={{ code: CodeBlock }}
    />
  </div>
);
