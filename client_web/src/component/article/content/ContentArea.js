import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Button, ButtonGroup, ButtonToolbar, Clearfix, Glyphicon} from "react-bootstrap";
import {connect} from "react-redux";

import ArticleTitle from "./ArticleTitle";
import {deleteArticle} from "../../../action/article/ArticlesAction";
import {LinkContainer} from "react-router-bootstrap";

class ContentArea extends React.Component{

    render(){
        const {article,login,
            deleteArticle} = this.props;
        const user = login.user;
        const {id,content} = article;

        return (
            <div className="content_main">
                <ArticleTitle article={article}/>
                <div className="edit_button">
                    <ButtonToolbar>
                        <ButtonGroup className="hidden-sm hidden-xs">
                            <LinkContainer to={`/article/content/${id}/justify`}>
                                <Button>
                                    <Glyphicon glyph="align-left" />
                                    &nbsp;&nbsp;左右布局&nbsp;
                                </Button>
                            </LinkContainer>
                            <LinkContainer to={`/article/content/${id}/full`}>
                                <Button>
                                    <Glyphicon glyph="align-justify" />
                                    &nbsp;&nbsp;居中布局&nbsp;
                                </Button>
                            </LinkContainer>
                        </ButtonGroup>
                {
                    user.admin &&
                        <ButtonGroup>
                            <LinkContainer to={`/article/content/${id}/edit`}>
                                <Button bsStyle="primary">
                                    <Glyphicon glyph="edit" />&nbsp;&nbsp;编辑&nbsp;
                                </Button>
                            </LinkContainer>
                            <Button bsStyle="danger"
                                    onClick={() => deleteArticle(id)}>
                                <Glyphicon glyph="trash" />
                                &nbsp;&nbsp;删除&nbsp;
                            </Button>
                        </ButtonGroup>
                }
                    </ButtonToolbar>
                </div>
                <Clearfix>
                    <ReactMarkdown source={content.text}/>
                </Clearfix>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        article : state.content.article,
        login : state.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteArticle : id => {
            dispatch(deleteArticle(id))
        }
    }
};

const ContentAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentArea);

export default ContentAreaContainer