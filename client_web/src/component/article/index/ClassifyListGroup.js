import React from 'react'
import {LinkContainer} from "react-router-bootstrap";
import {Badge, Button, ListGroup, ListGroupItem} from "react-bootstrap";

class ClassifyListGroup extends React.Component{
    render(){
        const classify = this.props.classify;
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
                {articleList}
            </ListGroup>
        )
    }
}

export default ClassifyListGroup