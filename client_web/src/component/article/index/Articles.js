import React from 'react'
import {TransitionGroup} from "react-transition-group";
import {Alert, PanelGroup} from 'react-bootstrap'
import { connect } from 'react-redux'

import Preview from './Preview'
import Pager from "./Pager";

import {listArticles} from "../../../action/article/ArticlesAction";
import {ARTICLE_PAGE_SIZE} from "../../../Constant";
import FadeTransition from "../../common/FadeTransition";
import Loading from "../../common/Loading";

class Articles extends React.Component{

    componentWillMount(){
        const {page, listArticles} = this.props;
        if(page.total === 0){
            listArticles(1);
        }
    }

    render(){
        const {page, loading, listArticles} = this.props;
        const {list,page_num} = page;

        if(page.total === 0 && loading){
            return (
                <Alert bsStyle="warning" className="articles_loading">
                    <Loading/>
                </Alert>
            )
        }

        return(
            <div>
                <PanelGroup id="articles">
                    <TransitionGroup>
                        {
                            list.map(article => (
                                <FadeTransition key={article.id}>
                                    <Preview article={article}/>
                                </FadeTransition>
                            ))
                        }
                    </TransitionGroup>
                </PanelGroup>
                <div className="pager">
                    <Pager page={page} loading={loading}
                           onClick={() => listArticles(page_num + 1)} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        page : state.articles.page,
        loading : state.articles.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listArticles : pageNum => {
            dispatch(listArticles(pageNum,ARTICLE_PAGE_SIZE))
        }
    }
};

const ArticlesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Articles);

export default ArticlesContainer