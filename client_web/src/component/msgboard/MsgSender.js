import React from 'react'
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import {change, untouch ,Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

import {FORM_MSG} from "../../Constant";
import {insertMsg} from "../../action/msgboard/MsgBoardAction";

class MsgSender extends React.Component{

    submit = data => {
        const {page, insertMsg,clear} = this.props;

        const msg = {
            previous_comment_id : data.previous_comment_id,
            content : data.content
        };
        insertMsg(msg,page.page_num);
        clear();
    };

    render(){
        const {handleSubmit} = this.props;

        return (
            <form>
                <Field name="previous_comment_id" component="input" type="hidden"/>
                <Field name="content" component={textArea}/>
                <Button bsStyle="primary" bsSize="large" block
                        onClick={handleSubmit(data => this.submit(data))}>
                    发表留言
                </Button>
            </form>
        )
    }
}

const textArea = (field) => {
    const error = field.meta.touched && field.meta.error;

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
            />
            <FormControl.Feedback/>
            {
                error &&
                <HelpBlock>{field.meta.error}</HelpBlock>
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
        page : state.msg
    }
};

const mapDispatchToProps = dispatch => {
    return {
        insertMsg : (msg,pageNum) => {
            dispatch(insertMsg(msg,pageNum))
        },
        clear : () => {
            dispatch(untouch(FORM_MSG,"content"));
            dispatch(change(FORM_MSG,"content",""));
        }
    }
};

const MsgSenderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MsgSenderForm);

export default MsgSenderContainer