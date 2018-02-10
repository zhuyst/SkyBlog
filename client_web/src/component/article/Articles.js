import React from 'react'
import {Alert, PanelGroup} from 'react-bootstrap'
import { connect } from 'react-redux'

import Preview from './Preview'
import {listArticles} from "../../action/ArticlesAction";

class Articles extends React.Component{

    render(){
        const {list,page_num,pages} = this.props;

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

        let pager;
        if(page_num === pages){
            pager = (
                <Alert bsStyle="info">
                    &nbsp;&nbsp;已经没有更多文章啦！&nbsp;&nbsp;
                </Alert>
            )
        }
        else {
            pager = (
                <div className="more_articles">
                    <div onClick={() => this.props.listArticles(page_num + 1)}>
                        <Alert bsStyle="warning">
                            <p>
                            <span className="more_articles_left">
                                <i className="fa fa-angle-double-down fa-lg"/>
                            </span>

                                <i className="fa fa-toggle-down" />
                                &nbsp;&nbsp;点击查看更多文章&nbsp;&nbsp;
                                <i className="fa fa-toggle-down" />

                                <span className="more_articles_right">
                                <i className="fa fa-angle-double-down fa-lg"/>
                            </span>
                            </p>
                        </Alert>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <PanelGroup id="articles">
                    {articles}
                </PanelGroup>
                <div className="pager">
                    {pager}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list : state.articles.list,
        page_num : state.articles.page_num,
        pages : state.articles.pages
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