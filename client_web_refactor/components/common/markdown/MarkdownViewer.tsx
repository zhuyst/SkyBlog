import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

interface IMarkdownViewerProps {
  text: string;
}

export default (props: IMarkdownViewerProps) => (
  <ReactMarkdown
    source={props.text}
    renderers={{ code: CodeBlock }}
  />
);
