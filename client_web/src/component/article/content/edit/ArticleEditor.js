import React from 'react'
import ReactMde, { ReactMdeCommands } from 'react-mde';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import { Field,reduxForm,change } from 'redux-form'
import {
    Button, ButtonGroup, ButtonToolbar, Col, ControlLabel, FormControl, FormGroup, Glyphicon,
    Row
} from "react-bootstrap";

import {FORM_ARTICLE} from "../../../../Constant";
import FieldGroup from "../../../common/FieldGroup";
import NewClassify from "./NewClassify";

import {getArticleInfo, setArticle} from "../../../../action/article/ContentAction";
import {deleteArticle, insertArticle, updateArticle} from "../../../../action/article/ContentAction";

import 'react-mde/lib/styles/css/react-mde.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import 'react-mde/lib/styles/css/react-mde-textarea.css';

import '../../../../static/css/article/editor.css'
import {listClassify, setClassifyShow} from "../../../../action/article/ClassifyAction";
import {setUploadModalShow} from "../../../../action/article/UploadAction";
import {confirm} from "../../../Util";

class ArticleEditor extends React.Component{

    componentWillMount(){
        this.init();

        const {classifyList,listClassify} = this.props;

        if(classifyList.length === 0){
            listClassify();
        }
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
        const action = isNew ? "发布" : "修改";

        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Button disabled={submitting} bsStyle="success"
                            onClick={handleSubmit(data => this.submit(data,false))}>
                        <Glyphicon glyph="floppy-disk" />
                        `发布&nbsp;
                    </Button>
                    <Button disabled={submitting} bsStyle="success"
                            onClick={handleSubmit(data => this.submit(data,true))}>
                        <Glyphicon glyph="floppy-saved" />
                        &nbsp;&nbsp;发布并退出编辑&nbsp;
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
        const {submitting,classifyList,classifyShow,
            setClassifyShow,showUploadModal} = this.props;

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
                            disabled={submitting}
                        />
                        <FieldGroup
                            name="sub_title"
                            type="text"
                            label="文章副标题"
                            placeholder="请输入文章副标题"
                            disabled={submitting}
                        />
                        <Row>
                            <Col md={8} sm={12}>
                                <Field name="classify_id" component={classifySelect}
                                       classifyList={classifyList}>
                                </Field>
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

                        <Field name="content" component={editor} showUploadModal={showUploadModal}/>
                    </form>
                </div>
            </div>
        )
    }
}

class editor extends React.Component{

    render(){
        const { input: { value, onChange },
            meta: {submitting},
            showUploadModal} = this.props;

        let commands = ReactMdeCommands.getDefaultCommands();

        const uploadCommand = {
            icon: 'upload',
            tooltip:
                '上传文件',
            execute: (text, selection) => {
                showUploadModal();

                return {
                    text: text,
                    selection: selection
                };
            },
        };

        commands.push([uploadCommand]);

        return (
            <FormGroup>
                <ControlLabel>文章内容</ControlLabel>
                <ReactMde value={value} onChange={onChange}
                          commands={commands}
                          textAreaProps={{
                              disabled : submitting,
                              id : "mde-editor"
                          }}
                          visibility={{preview:false}}/>
            </FormGroup>
        )
    }

}

class classifySelect extends React.Component{
    render(){
        const {input: { value, onChange },
            meta: {submitting},
            classifyList} = this.props;

        return(
            <FormGroup controlId="classify_id">
                <ControlLabel>文章分类</ControlLabel>
                <FormControl componentClass="select" disabled={submitting}
                             value={value} onChange={onChange}>
                    {
                        classifyList.map(classify =>
                            <option key={classify.id}
                                    value={classify.id}>
                                {classify.name}</option>
                        )
                    }
                </FormControl>
            </FormGroup>
        )
    }
}

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
    dispatch(setArticle({
        ...values,
        content : values.content.text
    }));
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
            dispatch(change(FORM_ARTICLE,"classify_id",article.classify_id));
            dispatch(change(FORM_ARTICLE,"sub_title",article.sub_title));
            dispatch(change(FORM_ARTICLE,"content",article.content));
        },
        insertArticle : (article,back) => {
            confirm("确定要发布文章吗？").then(() => {
                dispatch(insertArticle(article,back))
            });
        },
        updateArticle : (article,back) => {
            confirm("确定要更新文章吗？").then(() => {
                dispatch(updateArticle(article,back));
            });
        },
        deleteArticle : id => {
            confirm("确定要删除文章吗？").then(() => {
                dispatch(deleteArticle(id))
            });
        },
        goBack : (isNew,id) => {
            confirm("确定要放弃编辑吗？").then(() => {
                if(isNew){
                    dispatch(push("/article"))
                }
                else {
                    dispatch(getArticleInfo(id));
                    dispatch(push(`/article/content/${id}/justify`))
                }
            });
        },

        listClassify : () => {
            dispatch(listClassify());
        },
        setClassifyShow : show => {
            dispatch(setClassifyShow(show));
        },
        showUploadModal : () => {
            dispatch(setUploadModalShow(true))
        }
    }
};

const ArticleEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleEditorForm);

export default ArticleEditorContainer