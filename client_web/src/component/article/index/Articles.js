import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {PanelGroup} from 'react-bootstrap'
import { connect } from 'react-redux'

import Preview from './Preview'
import Pager from "./Pager";

import {listArticles} from "../../../action/article/ArticlesAction";
import {ARTICLE_PAGE_SIZE, FADE_ENTER, FADE_LEAVE} from "../../../Constant";

class Articles extends React.Component{

    componentWillMount(){
        this.props.listArticles(1);
    }

    render(){
        const {page, listArticles} = this.props;
        const {list,page_num} = page;

        return(
            <div>
                <PanelGroup id="articles">
                    <ReactCSSTransitionGroup
                        transitionName='fade'
                        transitionEnterTimeout={FADE_ENTER}
                        transitionLeaveTimeout={FADE_LEAVE}>
                        {
                            list.map(article => <Preview key={article.id} article={article}/>)
                        }
                    </ReactCSSTransitionGroup>
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