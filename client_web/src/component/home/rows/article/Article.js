import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Badge, Panel} from 'react-bootstrap'
import {Link} from "react-router-dom";

import Preview from './ArticlePreview'
import {getLength} from "../Util";
import {FADE_ENTER, FADE_LEAVE} from "../../../../Constant";

class Article extends React.Component{
    render(){
        const page = this.props.page;
        const {total,list} = page;

        const MAX_LENGTH = 3;
        const length = getLength(list,MAX_LENGTH);

        const articles = [];
        for(let i = 0;i < length;i++){
            const article = list[i];
            articles.push(
                <Preview key={article.id} article={article}/>
            )
        }

        return(
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        最近更新的文章&nbsp;&nbsp;<Badge>{total}</Badge>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <ReactCSSTransitionGroup
                        transitionName='fade'
                        transitionEnterTimeout={FADE_ENTER}
                        transitionLeaveTimeout={FADE_LEAVE}>
                        {articles}
                    </ReactCSSTransitionGroup>
                    <Link className="more_link"
                          to="/article">
                        查看更多文章
                    </Link>
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        page : state.articles.page
    }
};

const ArticleContainer = connect(
    mapStateToProps,
    null,
)(Article);

export default ArticleContainer