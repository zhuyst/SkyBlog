import React from 'react'
import ReactMde, { ReactMdeCommands } from 'react-mde';
import {connect} from 'react-redux'
import { Field,reduxForm,change } from 'redux-form'
import {Col, ControlLabel, FormGroup, Row} from "react-bootstrap";

import {FORM_ARTICLE} from "../../../Form";
import FieldGroup from "../../common/FieldGroup";

import '../../../static/css/article/editor.css'
import {setArticle} from "../../../action/article/ContentAction";

import 'react-mde/lib/styles/css/react-mde.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import 'react-mde/lib/styles/css/react-mde-textarea.css';

class ArticleEditor extends React.Component{

    componentDidMount(){
        const {article,setArticleForm} = this.props;
        setArticleForm(article);
    }

    render(){
        const handleSubmit = this.props.handleSubmit;
        return (
            <div className="editor">
                <form onSubmit={handleSubmit}>
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

};

const validate = values => {
    const errors = {};
    const {title,content} = values;

    if(!title || title.length === 0){
        errors.title = "文章标题不能为空";
    }

    if(!content || content.length === 0){
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
        setArticleForm : (article) => {
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