import React from 'react'
import {Button,Modal} from "react-bootstrap";
import { reduxForm } from 'redux-form'

import {registerUser} from "../../action/UsersAction";

import {FORM_REGISTER} from "../../Form";
import FieldGroup,{MODE_SUCCESS} from './FieldGroup'

class RegisterModel extends React.Component{
    render(){
        const {show,submitting,
            onHide,handleSubmit} = this.props;

        return (
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">注册</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <FieldGroup
                            name="username"
                            type="text"
                            label="用户名"
                            placeholder="请输入用户名"
                            mode={MODE_SUCCESS}/>
                        <FieldGroup
                            name="nickname"
                            type="text"
                            label="昵称"
                            placeholder="请输入昵称"
                            mode={MODE_SUCCESS}/>
                        <FieldGroup
                            name="password"
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            mode={MODE_SUCCESS}/>
                        <FieldGroup
                            name="repeatPassword"
                            type="password"
                            label="重复密码"
                            placeholder="请再次输入密码"
                            mode={MODE_SUCCESS}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={submitting} onClick={onHide}> 关闭 </Button>
                        <Button disabled={submitting} type="submit" bsStyle="primary"> 注册 </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

const validateLength = (field,limit) => {
    return (field.length > limit.max || field.length < limit.min);
};

export const validate = values => {
    const errors = {};
    const {username,password,repeatPassword,nickname} = values;

    const check = {
        username: {
            min : 4,
            max : 10,
            regex : /^[0-9a-zA-Z]*$/g
        },
        password: {
            min : 6,
            max : 20,
            regex : /^[0-9a-zA-Z]*$/g
        },
        nickname: {
            min : 2,
            max : 8
        }
    };

    if(!username){
        errors.username = "请输入用户名";
    }
    else{
        if(validateLength(username,check.username)){
            errors.username = `用户名长度应在${check.username.min}与${check.username.max}之间`;
        }
        else if(!check.username.regex.test(username)){
            errors.username = "用户名应为字母或数字的组合";
        }
    }

    if(!password){
        errors.password = "请输入密码";
    }
    else{
        if(validateLength(password,check.password)){
            errors.password = `密码长度应在${check.password.min}与${check.password.max}之间`;
        }
        else if(!check.password.regex.test(password)){
            errors.password = "密码应为字母或数字的组合";
        }
    }

    if(!repeatPassword){
        errors.repeatPassword = "请再次输入密码";
    }
    else if(password !== repeatPassword){
        errors.repeatPassword = "两次输入的密码不一致";
    }

    if(!nickname){
        errors.nickname = "请输入昵称";
    }
    else if(validateLength(nickname,check.nickname)){
        errors.nickname = `昵称长度应在${check.nickname.min}与${check.nickname.max}之间`
    }

    return errors;
};

const onSubmit = (values,dispatch) => {
    const user = {
        username : values.username,
        password : values.password,
        nickname : values.nickname
    };
    dispatch(registerUser(user));
};

const RegisterModelForm = reduxForm({
    form : FORM_REGISTER,
    validate : validate,
    onSubmit : onSubmit
})(RegisterModel);

export default RegisterModelForm;