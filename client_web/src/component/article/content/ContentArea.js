import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Button, ButtonGroup, Glyphicon} from "react-bootstrap";
import {push} from "react-router-redux";
import {connect} from "react-redux";

import ArticleTitle from "./ArticleTitle";
import {deleteArticle} from "../../../action/article/ArticlesAction";

class ContentArea extends React.Component{

    render(){
        const {article,login,
            editContent, deleteArticle} = this.props;
        const user = login.user;
        const {id,content} = article;

        return (
            <div className="content_main">
                <ArticleTitle article={article}/>
                {
                    user.admin &&
                    <div className="edit_button">
                        <ButtonGroup className="edit_button_group">
                            <Button bsStyle="primary"
                                    onClick={() => editContent(id)}>
                                <Glyphicon glyph="edit" />&nbsp;&nbsp;编辑&nbsp;
                            </Button>
                            <Button bsStyle="danger"
                                    onClick={() => deleteArticle(id)}>
                                <Glyphicon glyph="trash" />
                                &nbsp;&nbsp;删除&nbsp;
                            </Button>
                        </ButtonGroup>
                    </div>
                }
                <ReactMarkdown source={content.text}/>
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
        },
        editContent : id => {
            dispatch(push(`/article/content/${id}/edit`))
        }
    }
};

const ContentAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentArea);

export default ContentAreaContainer