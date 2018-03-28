import React from 'react'
import hljs from 'highlight.js'

class CodeBlock extends React.Component{
    constructor() {
        super();
        this.setRef = this.setRef.bind(this)
    }

    setRef(el) {
        this.codeEl = el
    }

    componentDidMount() {
        this.highlightCode()
    }

    componentDidUpdate() {
        this.highlightCode()
    }

    highlightCode() {
        hljs.highlightBlock(this.codeEl)
    }

    render() {
        return (
            <pre>
                <code ref={this.setRef} className={this.props.language}>
                    {this.props.value}
                </code>
            </pre>
        )
    }
}

CodeBlock.defaultProps = {
    language: ''
};

export default CodeBlock