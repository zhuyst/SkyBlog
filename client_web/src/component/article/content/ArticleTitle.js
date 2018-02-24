import React from 'react'
import {Button, ButtonGroup, ButtonToolbar, Glyphicon, PageHeader} from "react-bootstrap";
import {connect} from "react-redux";
import {deleteArticle} from "../../../action/article/ArticlesAction";
import {LinkContainer} from "react-router-bootstrap";

class ArticleTitle extends React.Component{
    render(){
        const {article,login,
            deleteArticle,hasButton} = this.props;
        const user = login.user;
        const {id,title,sub_title} = article;

        const className = hasButton ? "page-header-has-button" : "";

        return (
            <PageHeader className={className}>
                {title}
                <br/>
                <small>{sub_title}</small>
                {
                    hasButton &&
                    <div>
                        <ButtonToolbar className="edit_button">
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
                }
            </PageHeader>
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

const ArticleTitleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleTitle);

export default ArticleTitleContainer