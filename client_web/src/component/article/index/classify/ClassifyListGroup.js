import React from 'react'
import {TransitionGroup} from "react-transition-group";
import {connect} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Badge, ListGroup, ListGroupItem} from "react-bootstrap";

import ClassifyButtonGroup from "./ClassifyButtonGroup";
import FadeTransition from "../../../common/FadeTransition";

class ClassifyListGroup extends React.Component{
    render(){
        const {management,classify} = this.props;
        const articles = classify.articles;

        return (
            <ListGroup key={classify.id}>
                <LinkContainer to={`/article/classify/${classify.id}`}>
                    <ListGroupItem active>
                        {classify.name}
                        <Badge>{articles.length}</Badge>
                    </ListGroupItem>
                </LinkContainer>
                {
                    management &&
                    <ClassifyButtonGroup classify={classify}/>
                }
                <TransitionGroup>
                    {
                        articles.map(article => (
                            <FadeTransition key={article.id}>
                                <LinkContainer to={`/article/content/${article.id}/full`}>
                                    <ListGroupItem>{article.title}</ListGroupItem>
                                </LinkContainer>
                            </FadeTransition>
                        ))
                    }
                </TransitionGroup>
            </ListGroup>
        )
    }
}

const mapStateToProps = state => {
    return {
        management : state.login.management
    }
};

const ClassifyListGroupContainer = connect(
    mapStateToProps,
    null
)(ClassifyListGroup);

export default ClassifyListGroupContainer