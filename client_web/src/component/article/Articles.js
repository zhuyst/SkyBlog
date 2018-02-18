import React from 'react'
import {Alert, PanelGroup} from 'react-bootstrap'
import { connect } from 'react-redux'

import Preview from './Preview'
import Pager from "./Pager";

import {listArticles, listArticlesByClassify} from "../../action/article/ArticlesAction";
import {ARTICLE_PAGE_SIZE} from "../../Constant";

class Articles extends React.Component{

    componentWillMount(){
        const classify = this.props.classify;
        if(classify.id === 0){
            this.props.listArticles(1);
        }
        else {
            this.props.listArticlesByClassify(classify.id,1)
        }
    }

    render(){
        const {page, classify,
            listArticles,listArticlesByClassify} = this.props;
        const {list,page_num} = page;

        const readClassify = (classify.id !== 0);

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

        let onClick;
        if(readClassify){
            onClick = () => listArticlesByClassify(classify.id,page_num + 1)
        }
        else {
            onClick = () => listArticles(page_num + 1)
        }

        return(
            <div>
                <PanelGroup id="articles">
                    {
                        readClassify &&
                        <Alert bsStyle="info">
                            您正在查看文章分类&nbsp;-&nbsp;
                            <strong>{classify.name}</strong>
                            &nbsp;下的文章
                        </Alert>
                    }
                    {articles}
                </PanelGroup>
                <div className="pager">
                    <Pager page={page} onClick={onClick} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        page : state.articles.page,
        classify : state.articles.classify
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listArticles : pageNum => {
            dispatch(listArticles(pageNum,ARTICLE_PAGE_SIZE))
        },
        listArticlesByClassify : (classifyId,pageNum) => {
            dispatch(listArticlesByClassify(classifyId,pageNum,ARTICLE_PAGE_SIZE))
        }
    }
};

const ArticlesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Articles);

export default ArticlesContainer