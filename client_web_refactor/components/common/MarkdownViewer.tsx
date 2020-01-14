import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";

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
    <article>
      <pre>
        <code ref={codeEl} className={props.language}>
          {props.value}
        </code>
      </pre>
    </article>
  );
};


interface IMarkdownViewerProps {
  text: string;
}

export default (props: IMarkdownViewerProps) => (
  <ReactMarkdown
    source={props.text}
    renderers={{ code: CodeBlock }}
  />
);
