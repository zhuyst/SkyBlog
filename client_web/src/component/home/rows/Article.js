import React from 'react'
import {connect} from "react-redux";
import { Panel } from 'react-bootstrap'

import Preview from './ArticlePreview'

class Article extends React.Component{
    render(){
        const list = this.props.list;

        const MAX_LENGTH = 3;
        let length;
        if(list.length >= MAX_LENGTH){
            length = MAX_LENGTH;
        }
        else {
            length = list.length;
        }

        const articles = [];
        for(let i = 0;i < length;i++){
            const article = list[i];
            if(i === length - 1){
                articles.push(
                    <Preview key={article.id} article={article} isLast={true}/>
                )
            }
            else {
                articles.push(
                    <Preview key={article.id} article={article}/>
                )
            }
        }

        return(
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">最近更新的文章</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {articles}
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        list : state.articles.list
    }
};

const ArticleContainer = connect(
    mapStateToProps,
    null,
)(Article);

export default ArticleContainer