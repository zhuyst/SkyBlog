import React from 'react'
import {TransitionGroup} from "react-transition-group";
import {PanelGroup} from 'react-bootstrap'
import { connect } from 'react-redux'

import Preview from './Preview'
import Pager from "./Pager";

import {listArticles} from "../../../action/article/ArticlesAction";
import {ARTICLE_PAGE_SIZE} from "../../../Constant";
import FadeTransition from "../../common/FadeTransition";

class Articles extends React.Component{

    componentWillMount(){
        const {page, listArticles} = this.props;
        if(page.total === 0){
            listArticles(1);
        }
    }

    render(){
        const {page, listArticles} = this.props;
        const {list,page_num} = page;

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
                    <Pager page={page} onClick={() => listArticles(page_num + 1)} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        page : state.articles.page
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