import React from 'react'
import ReactMde, { ReactMdeCommands } from 'react-mde';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import { Field,reduxForm,change } from 'redux-form'
import {Button, ButtonGroup, ButtonToolbar, Col, ControlLabel, FormGroup, Glyphicon, Row} from "react-bootstrap";

import {FORM_ARTICLE} from "../../../../Constant";
import FieldGroup from "../../../common/FieldGroup";
import NewClassify from "./NewClassify";

import {setArticle} from "../../../../action/article/ContentAction";
import {deleteArticle, insertArticle, updateArticle} from "../../../../action/article/ArticlesAction";

import 'react-mde/lib/styles/css/react-mde.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import 'react-mde/lib/styles/css/react-mde-textarea.css';

import '../../../../static/css/article/editor.css'
import {setClassifyShow} from "../../../../action/article/ClassifyAction";

class ArticleEditor extends React.Component{

    componentWillMount(){
        this.init();
    }

    componentDidUpdate(){
        this.init();
    }

    init = () => {
        const {article,setArticleForm} = this.props;
        setArticleForm(article);
    };

    submit = (data,back) => {
        const article = {
            ...data,
            content : data.content.text
        };
        if(data.id === 0){
            this.props.insertArticle(article,back);
        }
        else {
            this.props.updateArticle(article,back);
        }
    };

    toolbar = () => {
        const {submitting, handleSubmit,goBack,
            deleteArticle} = this.props;

        const id = this.props.article.id;
        const isNew = (id === 0);
        const action = isNew ? "新增" : "修改";

        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Button disabled={submitting} bsStyle="success"
                            onClick={handleSubmit(data => this.submit(data,false))}>
                        <Glyphicon glyph="floppy-disk" />
                        &nbsp;&nbsp;保存&nbsp;
                    </Button>
                    <Button disabled={submitting} bsStyle="success"
                            onClick={handleSubmit(data => this.submit(data,true))}>
                        <Glyphicon glyph="floppy-saved" />
                        &nbsp;&nbsp;保存并退出编辑&nbsp;
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button disabled={submitting} bsStyle="primary"
                            onClick={() => goBack(isNew,id)}>
                        <Glyphicon glyph="circle-arrow-left" />
                        &nbsp;&nbsp;放弃{action}并返回&nbsp;
                    </Button>
                </ButtonGroup>
                {
                    !isNew &&
                    <ButtonGroup>
                        <Button disabled={submitting} bsStyle="danger"
                                onClick={() => deleteArticle(id)}>
                            <Glyphicon glyph="trash" />
                            &nbsp;&nbsp;删除&nbsp;
                        </Button>
                    </ButtonGroup>
                }
            </ButtonToolbar>
        )
    };

    render(){
        const {classifyList,classifyShow,
            setClassifyShow} = this.props;

        const classifyOptions = [];
        classifyList.forEach(classify => {
            classifyOptions.push(
                <option key={classify.id}
                        value={classify.id}>
                    {classify.name}</option>
            )
        });

        return (
            <div>
                {this.toolbar()}
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
                                <FormGroup controlId="classify_id">
                                    <ControlLabel>文章分类</ControlLabel>
                                    <Field name="classify_id" component="select" className="form-control">
                                        {classifyOptions}
                                    </Field>
                                </FormGroup>
                            </Col>
                            <Col md={4} smHidden xsHidden>
                                {classifyButton(classifyShow,setClassifyShow,false)}
                            </Col>
                            <Col sm={12} lgHidden mdHidden>
                                {classifyButton(classifyShow,setClassifyShow,true)}
                            </Col>
                        </Row>
                        <Row>
                            <NewClassify/>
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

const classifyButton = (classifyShow,setClassifyShow,sm) => {
    let classifyIcon;
    let classifyClass;
    if(classifyShow) {
        classifyIcon = (
            <i className="fa fa-arrow-circle-up" />
        );
        classifyClass = "classify_button classify_button_not_show";
    }
    else {
        classifyIcon = (
            <i className="fa fa-arrow-circle-down" />
        );
        classifyClass = "classify_button"
    }

    let props = {
        bsStyle:"success",
        block : true,
        className : classifyClass,
        onClick : () => setClassifyShow(!classifyShow)
    };

    if(sm){
        props = {
            ...props,
            style : {
                marginTop:0
            }
        }
    }

    return (
        <Button {...props}>
            <span>
                <span className="more_left">{classifyIcon}</span>
                新增分类
                <span className="more_right">{classifyIcon}</span>
            </span>
        </Button>
    )
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
    onChange : onChange,
    validate : validate
})(ArticleEditor);

const mapStateToProps = state => {
    return {
        article : state.content.article,
        classifyList : state.classify.list,
        classifyShow : state.classify.show
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setArticleForm : article => {
            dispatch(change(FORM_ARTICLE,"id",article.id));
            dispatch(change(FORM_ARTICLE,"title",article.title));
            dispatch(change(FORM_ARTICLE,"sub_title",article.sub_title));
            dispatch(change(FORM_ARTICLE,"content",article.content));
        },
        insertArticle : (article,back) => {
            dispatch(insertArticle(article,back))
        },
        updateArticle : (article,back) => {
            dispatch(updateArticle(article,back));
        },
        deleteArticle : id => {
            dispatch(deleteArticle(id))
        },
        goBack : (isNew,id) => {
            if(isNew){
                dispatch(push("/article"))
            }
            else {
                dispatch(push(`/article/content/${id}/full`))
            }
        },

        setClassifyShow : show => {
            dispatch(setClassifyShow(show));
        }
    }
};

const ArticleEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleEditorForm);

export default ArticleEditorContainer