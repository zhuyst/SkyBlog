import React from 'react';
import ReactMarkdown from 'react-markdown';

import CodeBlock from './CodeBlock';

class Markdown extends React.Component {
  render() {
    return (
      <ReactMarkdown
        source={this.props.text}
        renderers={{ code: CodeBlock }}
      />
    );
  }
}

export default Markdown;
