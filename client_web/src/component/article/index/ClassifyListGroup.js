import React from 'react'
import {connect} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Badge, Button, ButtonGroup, Glyphicon, ListGroup, ListGroupItem} from "react-bootstrap";

import {deleteClassify, updateClassify} from "../../../action/article/ClassifyAction";

class ClassifyListGroup extends React.Component{
    render(){
        const {admin,classify,deleteClassify} = this.props;
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
                    <ButtonGroup className="btn-block">
                        <Button className="navigation_classify_button">
                            <Glyphicon glyph="edit" />
                            &nbsp;&nbsp;编辑分类名&nbsp;
                        </Button>
                        <Button bsStyle="danger"
                                className="navigation_classify_button"
                                onClick={() => deleteClassify(classify.id)}>
                            <Glyphicon glyph="trash" />
                            &nbsp;&nbsp;删除分类&nbsp;
                        </Button>
                    </ButtonGroup>
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

const mapDispatchToProps = dispatch => {
    return {
        updateClassify : classify => {
            dispatch(updateClassify(classify))
        },
        deleteClassify : id => {
            dispatch(deleteClassify(id))
        }
    }
};

const ClassifyListGroupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassifyListGroup);

export default ClassifyListGroupContainer