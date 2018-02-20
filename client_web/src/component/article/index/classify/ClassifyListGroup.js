import React from 'react'
import {connect} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Badge, ListGroup, ListGroupItem} from "react-bootstrap";

import ClassifyButtonGroup from "./ClassifyButtonGroup";

class ClassifyListGroup extends React.Component{
    render(){
        const {admin,classify} = this.props;
        const articles = classify.articles;

        const articleList = [];
        articles.forEach(article => {
            articleList.push(
                <LinkContainer key={article.id} to={`/article/content/${article.id}`}>
                    <ListGroupItem>{article.title}</ListGroupItem>
                </LinkContainer>
            )
        });

        return (
            <ListGroup key={classify.id}>
                <LinkContainer to={`/article/classify/${classify.id}`}>
                    <ListGroupItem active>
                        {classify.name}
                        <Badge>{articles.length}</Badge>
                    </ListGroupItem>
                </LinkContainer>
                {
                    admin &&
                    <ClassifyButtonGroup classify={classify}/>
                }
                {articleList}
            </ListGroup>
        )
    }
}

const mapStateToProps = state => {
    return {
        admin : state.login.user.admin
    }
};

const ClassifyListGroupContainer = connect(
    mapStateToProps,
    null
)(ClassifyListGroup);

export default ClassifyListGroupContainer