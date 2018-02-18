import React from 'react'
import { connect } from 'react-redux'
import {Badge, Button, Col, ListGroup,
    ListGroupItem, Well} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {push} from 'react-router-redux'

import {listArticlesByClassify} from "../../action/article/ArticlesAction";
import {ARTICLE_PAGE_SIZE} from "../../Constant";

class Navigation extends React.Component{
    render(){
        const {admin,total,classifyList,
            goClassify} = this.props;

        let list = [];
        classifyList.forEach(classify => {
            const articles = classify.articles;
            const articleList = [];
            articles.forEach(article => {
                articleList.push(
                    <LinkContainer key={article.id} to={`/article/content/${article.id}`}>
                        <ListGroupItem>{article.title}</ListGroupItem>
                    </LinkContainer>
                )
            });

            list.push(
                <ListGroup key={classify.id}>
                    <ListGroupItem active onClick={() => goClassify(classify.id)}>
                        {classify.name}
                        <Badge>{articles.length}</Badge>
                    </ListGroupItem>
                    {articleList}
                </ListGroup>
            )
        });

        return(
            <Well>
                <div className="navigation_title">
                    <Col mdOffset={4}>
                        <h2>博客分类</h2>
                    </Col>
                </div>

                {
                    admin &&
                    <LinkContainer to="/article/content/new/edit">
                        <Button bsStyle="success" bsSize="large" block
                                className="navigation_button">发布文章</Button>
                    </LinkContainer>
                }

                <ListGroup>
                    <LinkContainer to="/article">
                        <ListGroupItem active>
                            所有文章
                            <Badge>{total}</Badge>
                        </ListGroupItem>
                    </LinkContainer>
                </ListGroup>

                {list}
            </Well>
        )
    }
}

const mapStateToProps = state => {
    return {
        total : state.articles.total,
        classifyList : state.classify.list,
        admin : state.login.user.admin
    }
};

const mapDispatchToProps = dispatch => {
    return {
        goClassify : id => {
            dispatch(listArticlesByClassify(id,1,ARTICLE_PAGE_SIZE));
            dispatch(push(`/article/classify/${id}`));
        }
    }
};

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);

export default NavigationContainer