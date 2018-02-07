import React from 'react'

import { Panel } from 'react-bootstrap'

import Preview from './ArticlePreview'

class Article extends React.Component{
    render(){
        return(
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">最近更新的文章</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Preview id={1}/>
                    <Preview id={2}/>
                    <Preview id={3} isLast={true}/>
                </Panel.Body>
            </Panel>
        )
    }
}

export default Article