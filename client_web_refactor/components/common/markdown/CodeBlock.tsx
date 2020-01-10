import React, { useRef, useEffect } from "react";
import hljs from "highlight.js";

interface ICodeBlockProps {
  language?: string;
  value: string;
}

export default (props: ICodeBlockProps) => {
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
