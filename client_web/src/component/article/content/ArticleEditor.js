import React from 'react'
import ReactMde, { ReactMdeCommands } from 'react-mde';
import {connect} from 'react-redux'
import { Field,reduxForm,change } from 'redux-form'
import {Button, ButtonGroup, Col, ControlLabel, FormGroup, Row} from "react-bootstrap";

import {FORM_ARTICLE} from "../../../Form";
import FieldGroup from "../../common/FieldGroup";

import '../../../static/css/article/editor.css'
import {editContent, setArticle} from "../../../action/article/ContentAction";

import 'react-mde/lib/styles/css/react-mde.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import 'react-mde/lib/styles/css/react-mde-textarea.css';
import {insertArticle, listArticles, updateArticle} from "../../../action/ArticlesAction";

class ArticleEditor extends React.Component{

    componentDidMount(){
        const {article,setArticleForm} = this.props;
        setArticleForm(article);
    }

    render(){
        const {submitting,handleSubmit,editContent} = this.props;
        return (
            <div>
                <ButtonGroup>
                    <Button disabled={submitting} bsStyle="success"
                            onClick={handleSubmit}>保存</Button>
                    <Button disabled={submitting} bsStyle="success"
                            onClick={() => {
                                handleSubmit();
                                editContent(false)
                            }}>保存并退出</Button>
                </ButtonGroup>
                <div className="editor">
                    <form>
                        <Field name="id" component="input" type="hidden"/>
                        <FieldGroup
                            name="title"
                            type="text"
                            label="文章标题"
                            placeholder="请输入文章标题"
                        />
                        <FieldGroup
                            name="sub_title"
                            type="text"
                            label="文章副标题"
                            placeholder="请输入文章副标题"
                        />
                        <Row>
                            <Col md={8} sm={12}>
                                <FormGroup controlId="classify">
                                    <ControlLabel>文章分类</ControlLabel>
                                    <Field name="classify" component="select" className="form-control">
                                        <option value="">未分类</option>
                                        <option value={1}>分类1</option>
                                        <option value={2}>分类2</option>
                                        <option value={3}>分类3</option>
                                    </Field>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Field name="content" component={editor}/>
                    </form>
                </div>
            </div>
        )
    }
}

const editor = ({ input: { value, onChange }}) => {
    return (
        <FormGroup>
            <ControlLabel>文章内容</ControlLabel>
            <ReactMde value={value}
                      onChange={onChange}
                      commands={ReactMdeCommands.getDefaultCommands()}/>
        </FormGroup>
    )
};

const onSubmit = (values,dispatch) => {
    const {id,title,sub_title,content} = values;
    const article = {
        id : id,
        title : title,
        sub_title : sub_title,
        content : content.text
    };

    if(values.id === 0){
        dispatch(insertArticle(article));
    }
    else {
        dispatch(updateArticle(article));
    }
};

const validate = values => {
    const errors = {};
    const {title,content} = values;

    if(!title || title.length === 0){
        errors.title = "文章标题不能为空";
    }

    if(!content || content.text.length === 0){
        errors.content = "文章内容不能为空";
    }

    return errors;
};

const onChange = (values,dispatch) => {
    dispatch(setArticle(values));
};

const ArticleEditorForm = reduxForm({
    form : FORM_ARTICLE,
    onSubmit : onSubmit,
    onChange : onChange,
    validate : validate
})(ArticleEditor);

const mapStateToProps = state => {
    return {
        article : state.article.article
    }
};

const mapDispatchToProps = dispatch => {
    return {
        editContent : editing =>{
            dispatch(editContent(editing))
        },
        setArticleForm : (article) => {
            dispatch(change(FORM_ARTICLE,"id",article.id));
            dispatch(change(FORM_ARTICLE,"title",article.title));
            dispatch(change(FORM_ARTICLE,"sub_title",article.sub_title));
            dispatch(change(FORM_ARTICLE,"content",article.content));
        }
    }
};

const ArticleEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleEditorForm);

export default ArticleEditorContainer