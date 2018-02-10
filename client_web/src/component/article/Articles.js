import React from 'react'
import {PanelGroup} from 'react-bootstrap'
import { connect } from 'react-redux'

import Preview from './Preview'
import {listArticles} from "../../action/ArticlesAction";

class Articles extends React.Component{

    render(){
        const list = this.props.list;
        const articles = [];
        list.forEach((article,i) => {
            if(i === 0){
                articles.push(
                    <Preview key={article.id} article={article} isFirst={true}/>
                )
            }
            else{
                articles.push (
                    <Preview key={article.id} article={article}/>
                )
            }
        });

        return(
            <div>
                <PanelGroup id="articles">
                    {articles}
                </PanelGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list : state.articles.list
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listArticles : pageNum => {
            dispatch(listArticles(pageNum,5))
        }
    }
};

const ArticlesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Articles);

export default ArticlesContainer