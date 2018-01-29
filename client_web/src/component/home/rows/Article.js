import React from 'react'

import { Panel } from 'react-bootstrap'

import Preview from './ArticlePreview'

class Article extends React.Component{
    render(){
        const title = (
            <h3>最近更新的文章</h3>
        );

        return(
            <Panel header={title} bsStyle="primary">
                <Preview id={1}/>
                <Preview id={2}/>
                <Preview id={3} isLast={true}/>
            </Panel>
        )
    }
}

export default Article