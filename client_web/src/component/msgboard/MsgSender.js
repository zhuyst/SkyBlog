import React from 'react'
import {Alert, Button, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import {change, untouch ,Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

import {FORM_MSG} from "../../Constant";
import {insertMsg, setPreviousMsg} from "../../action/msgboard/MsgBoardAction";
import {initialPreviousComment} from "../../reducer/article/ContentReducer";
import {convertBr} from "../Util";

class MsgSender extends React.Component{

    submit = data => {
        const {insertMsg,clear} = this.props;

        const msg = {
            previous_comment_id : data.previous_comment_id,
            content : data.content
        };
        insertMsg(msg);
        clear();
    };

    render(){
        const {handleSubmit,submitting,cancelReply,
            previous_comment, login} = this.props;

        if(login.ok){
            return (
                <div className="msg_sender">
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
                    <Field name="previous_comment_id" component="input" type="hidden"/>
                    <Field name="content" component={textArea}/>
                    <Button bsStyle="primary" bsSize="large" block
                            className="msg_sender_button" disabled={submitting}
                            onClick={handleSubmit(data => this.submit(data))}>
                        发表留言
                    </Button>
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
                        需要登录后才能进行留言
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
    const meta = field.meta;
    const error = meta.touched && meta.error;

    let state = null;
    if(error){
        state = "error";
    }

    return (
        <FormGroup controlId="msg" validationState={state}>
            <ControlLabel>发表留言</ControlLabel>
            <FormControl componentClass="textarea" placeholder="请输入留言......"
                         style={{height : '100px'}}
                         {...field.input}
                         disabled={meta.submitting}
            />
            <FormControl.Feedback/>
            {
                error &&
                <HelpBlock>{meta.error}</HelpBlock>
            }
        </FormGroup>
    )
};

const validate = values => {
    const errors = {};
    const {content} = values;

    if(!content || content.length === 0){
        errors.content = "留言内容不能为空"
    }

    return errors;
};

const MsgSenderForm = reduxForm({
    form : FORM_MSG,
    validate : validate
})(MsgSender);

const mapStateToProps = state => {
    return {
        previous_comment : state.msg.previous_comment,
        login : state.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        insertMsg : msg => {
            dispatch(insertMsg(msg))
        },
        clear : () => {
            dispatch(untouch(FORM_MSG,"content"));
            dispatch(change(FORM_MSG,"content",""));
            dispatch(change(FORM_MSG,"previous_comment_id",""))
        },
        cancelReply : () => {
            dispatch(setPreviousMsg(initialPreviousComment));
            dispatch(change(FORM_MSG,"previous_comment_id",""))
        }
    }
};

const MsgSenderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MsgSenderForm);

export default MsgSenderContainer