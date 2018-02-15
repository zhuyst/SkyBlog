import React from 'react'
import { connect } from 'react-redux'
import {Badge, Button, Col, ListGroup,
    ListGroupItem, Well} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

class Navigation extends React.Component{
    render(){
        const {admin,total,classifyList} = this.props;

        let list = [];
        classifyList.forEach(classify => {
            const articles = classify.articles;
            const articleList = [];
            articles.forEach(article => {
                articleList.push(
                    <LinkContainer key={article.id} to={`/article/${article.id}`}>
                        <ListGroupItem>{article.title}</ListGroupItem>
                    </LinkContainer>
                )
            });

            list.push(
                <ListGroup key={classify.id}>
                    <LinkContainer to="/article">
                        <ListGroupItem href="#" active>
                            {classify.name}
                            <Badge>{articles.length}</Badge>
                        </ListGroupItem>
                    </LinkContainer>
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
                    <LinkContainer to="/article/new/edit">
                        <Button bsStyle="success" bsSize="large" block
                                className="navigation_button">新增文章</Button>
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

const NavigationContainer = connect(
    mapStateToProps,
    null
)(Navigation);

export default NavigationContainer