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

class Article extends React.Component{
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
                    <TransitionGroup>
                        {articles}
                    </TransitionGroup>,
                    <Link className="more_link" to={url}>
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

const ArticleContainer = connect(
    mapStateToProps,
    null,
)(Article);

export default ArticleContainer