import React from 'react'
import {Alert, Button, Modal} from "react-bootstrap";
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import {login,loginClear} from "../../action/common/ModelAction";

import {FORM_LOGIN} from "../../Form";
import FieldGroup,{MODE_NULL} from './FieldGroup'

class LoginModel extends React.Component{
    render(){
        const {show,onHide,
            submitting,handleSubmit,
            login_state,loginClear} = this.props;

        return (
            <Modal show={show} onHide={onHide}
                   bsSize="small" aria-labelledby="contained-modal-title-lg" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">登陆</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {login_state.ok === false &&
                        <Alert bsStyle="danger" onDismiss={loginClear}>
                            <p>{login_state.message}</p>
                        </Alert>
                        }
                        <FieldGroup
                            name="username"
                            type="text"
                            label="用户名"
                            placeholder="请输入用户名"
                            mode={MODE_NULL}
                            error={login_state.ok}/>
                        <FieldGroup
                            name="password"
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            mode={MODE_NULL}
                            error={login_state.ok}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={submitting} onClick={onHide}> 关闭 </Button>
                        <Button disabled={submitting} type="submit" bsStyle="primary"> 登陆 </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        login_state : state.login.login_state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loginClear : () => {
            dispatch(loginClear())
        },
    }
};

const validate = values => {
    const errors = {};
    const {username,password} = values;

    if(!username || username.length === 0){
        errors.username = "用户名不能为空"
    }
    else if(!password || password.length === 0){
        errors.password = "密码不能为空"
    }

    return errors;
};

const onSubmit = (values,dispatch) => {
    const user = {
        username : values.username,
        password : values.password
    };

    dispatch(login(user))
};

const LoginModelForm = reduxForm({
    form : FORM_LOGIN,
    validate : validate,
    onSubmit : onSubmit
})(LoginModel);

const LoginModelContainer = connect(mapStateToProps,mapDispatchToProps)(LoginModelForm);

export default LoginModelContainer;