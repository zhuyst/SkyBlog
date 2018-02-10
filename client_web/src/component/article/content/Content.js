import React from 'react'
import {Breadcrumb, Button, ButtonGroup, Col, PageHeader, Row} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'

import {editContent} from "../../../action/article/ContentAction";

import CommentSender from './CommentSender'
import CommentList from './CommentList'
import ArticleEditor from './ArticleEditor'

import '../../../static/css/article/content.css'
import {getArticleInfo} from "../../../action/ArticlesAction";

class Content extends React.Component{
    componentWillMount(){
        document.title = `${this.props.article.title} - 博客文章 - 青云的小窝`;
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        const editContent = this.props.editContent;

        if(id === "new"){
            editContent(true);
        }
        else {
            this.props.getArticle(id);
            editContent(false);
        }
    }

    render(){
        const {editing,article,editContent} = this.props;
        const {title,sub_title,content} = article;

        const markdown = (<ReactMarkdown source={content.text}/>);

        let contentArea;
        let right;
        if(editing){
            contentArea = (
                <div>
                    <ButtonGroup>
                        <Button bsStyle="success">保存</Button>
                        <Button bsStyle="success" onClick={() => editContent(false)}>保存并退出</Button>
                    </ButtonGroup>
                    <ArticleEditor article={article} />
                </div>
            );
            right = (
                <div>
                    <PageHeader>{title}  <small>{sub_title}</small></PageHeader>
                    {markdown}
                </div>
            )
        }
        else {
            contentArea = (
                <div>
                    <PageHeader>{title}  <small>{sub_title}</small></PageHeader>
                    <Button bsStyle="primary" className="edit_button"
                            onClick={() => editContent(true)}>编辑</Button>
                    {markdown}
                </div>
            );
            right = (
                <div>
                    <CommentList/>
                    <CommentSender/>
                </div>
            )
        }

        return (
            <Row>
                <Col mdOffset={1} md={5}>
                    <Breadcrumb>
                        <LinkContainer to="/article">
                            <Breadcrumb.Item>
                                博客文章
                            </Breadcrumb.Item>
                        </LinkContainer>
                        <LinkContainer to="#">
                            <Breadcrumb.Item>
                                分类
                            </Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>
                            {title}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    {contentArea}
                </Col>
                <Col md={5}>
                    {right}
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        article : state.article.article,
        editing : state.article.editing
    }
};

const mapDispatchToProps = dispatch => {
    return {
        editContent : editing =>{
            dispatch(editContent(editing))
        },
        getArticle : id =>{
            dispatch(getArticleInfo(id))
        }
    }
};

const ContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);

export default ContentContainer