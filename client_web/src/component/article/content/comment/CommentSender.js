import React from 'react'
import {connect} from "react-redux";
import {FormControl, ControlLabel, FormGroup, Row, Col, Button, HelpBlock, Alert} from 'react-bootstrap'
import {change,untouch, Field, reduxForm} from "redux-form";

import {FORM_COMMENT} from "../../../../Constant";
import {insertComment, setPreviousComment} from "../../../../action/article/ContentAction";
import {initialPreviousComment} from "../../../../reducer/article/ContentReducer";
import {convertBr} from "../../../Util";

class CommentSender extends React.Component{

    submit = data => {
        const {insertComment,clear} = this.props;

        const comment = {
            article_id : data.article_id,
            previous_comment_id : data.previous_comment_id,
            content : data.content
        };
        insertComment(comment);
        clear();
    };

    render(){
        const {handleSubmit,submitting, login,
            cancelReply,previous_comment} = this.props;

        if(login.ok){
            return (
                <div className="comment_send">
                    {
                        previous_comment.id !== 0 &&
                        <Alert bsStyle="info" onDismiss={cancelReply}>
                            <p>
                                您正在回复&nbsp;
                                <strong>{previous_comment.author.nickname}</strong>
                                &nbsp;的回复：
                            </p>
                            <p dangerouslySetInnerHTML={{
                                __html : convertBr(previous_comment.content)
                            }} />
                        </Alert>
                    }
                    <form>
                        <Field name="article_id" component="input" type="hidden"/>
                        <Field name="previous_comment_id" component="input" type="hidden"/>
                        <Row>
                            <Col md={10} sm={12}>
                                <Field name="content" component={textArea}/>
                            </Col>
                            <Col md={2} smHidden xsHidden>
                                {submitButton(handleSubmit,submitting,this.submit,false)}
                            </Col>
                            <Col sm={12} lgHidden mdHidden>
                                {submitButton(handleSubmit,submitting,this.submit,true)}
                            </Col>
                        </Row>
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="pager">
                    <Alert bsStyle="info">
                        <span className="more_left">
                            <i className="fa fa-warning fa-lg"/>
                        </span>
                        需要登录后才能进行评论
                        <span className="more_right">
                            <i className="fa fa-warning fa-lg"/>
                        </span>
                    </Alert>
                </div>
            )
        }
    }
}

const textArea = (field) => {
    const error = field.meta.touched && field.meta.error;

    let state = null;
    if(error){
        state = "error";
    }

    return (
        <FormGroup controlId="comment" validationState={state}>
            <ControlLabel>发表评论</ControlLabel>
            <FormControl componentClass="textarea" placeholder="请输入评论......"
                         style={{
                             height : '60px'
                         }}
                         {...field.input}
            />
            <FormControl.Feedback/>
            {
                error &&
                <HelpBlock>{field.meta.error}</HelpBlock>
            }
        </FormGroup>
    )
};

const submitButton = (handleSubmit,submitting,submit,sm) => {
    let props = {
        bsStyle : "primary",
        block : true,
        onClick : handleSubmit(data => submit(data))
    };

    if(!sm) {
        props = {
            ...props,
            style : {
                height : '60px',
                marginTop : '24px'
            }
        }
    }

    return (
        <Button {...props} disabled={submitting}>提交</Button>
    )
};

const validate = values => {
    const errors = {};
    const {content} = values;

    if(!content || content.length === 0){
        errors.content = "评论内容不能为空"
    }

    return errors;
};

const CommentSenderForm = reduxForm({
    form : FORM_COMMENT,
    validate : validate
})(CommentSender);

const mapStateToProps = state => {
    return {
        previous_comment : state.content.previous_comment,
        login : state.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        insertComment : comment => {
            dispatch(insertComment(comment))
        },
        clear : () => {
            dispatch(untouch(FORM_COMMENT,"content"));
            dispatch(change(FORM_COMMENT,"content",""));
            dispatch(change(FORM_COMMENT,"previous_comment_id",""))
        },
        cancelReply : () => {
            dispatch(setPreviousComment(initialPreviousComment));
            dispatch(change(FORM_COMMENT,"previous_comment_id",""))
        }
    }
};

const CommentSenderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentSenderForm);

export default CommentSenderContainer