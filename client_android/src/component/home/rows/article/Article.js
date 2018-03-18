import React from 'react'
import {TransitionGroup} from "react-transition-group";
import {connect} from "react-redux";
import {Badge, Panel} from 'react-bootstrap'
import {Link} from "react-router-dom";

import Preview from './ArticlePreview'
import {getLength} from "../Util";
import FadeTransition from "../../../common/FadeTransition";
import {LinkContainer} from "react-router-bootstrap";
import Loading from "../../../common/Loading";
import {ARTICLE_PAGE_SIZE} from "../../../../Constant";
import {listArticles} from "../../../../action/article/ArticlesAction";

class Article extends React.Component{

    componentWillMount(){
        const {page,listArticles} = this.props;
        if(page.total === 0){
            listArticles(1);
        }
    }

    render(){
        const {page,loading} = this.props;
        const {total,list} = page;

        const MAX_LENGTH = 3;
        const length = getLength(list,MAX_LENGTH);

        const articles = [];
        for(let i = 0;i < length;i++){
            const article = list[i];
            articles.push(
                <FadeTransition key={article.id}>
                    <Preview article={article}/>
                </FadeTransition>
            )
        }

        const url = "/article";

        const content = loading ? <Loading/> :
            (
                [
                    <TransitionGroup key={1}>
                        {articles}
                    </TransitionGroup>,
                    <Link key={2} className="more_link" to={url}>
                    查看更多文章
                    </Link>
                ]
            );

        return(
            <Panel bsStyle="primary">
                <LinkContainer to={url}>
                    <Panel.Heading className="rows_title">
                        <Panel.Title componentClass="h3">
                            最近更新的文章&nbsp;&nbsp;<Badge>{total}</Badge>
                        </Panel.Title>
                    </Panel.Heading>
                </LinkContainer>
                <Panel.Body>
                    {content}
                </Panel.Body>
            </Panel>
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
            dispatch(listArticles(pageNum,ARTICLE_PAGE_SIZE));
        }
    }
};

const ArticleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Article);

export default ArticleContainer