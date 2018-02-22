import React from 'react'
import {Alert, Button, Modal} from "react-bootstrap";
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import {login, loginClear} from "../../../action/common/LoginAction";

import {FORM_LOGIN} from "../../../Constant";
import FieldGroup,{MODE_NULL} from '../FieldGroup'
import {setLoginModalShow} from "../../../action/common/ModalAction";

class LoginModal extends React.Component{
    render(){
        const {show,onHide,
            submitting,handleSubmit,
            login,loginClear} = this.props;

        return (
            <Modal show={show} onHide={onHide}
                   bsSize="small" aria-labelledby="contained-modal-title-lg" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">登陆</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {login.ok === false &&
                        <Alert bsStyle="danger" onDismiss={loginClear}>
                            <p>{login.message}</p>
                        </Alert>
                        }
                        <FieldGroup
                            name="username"
                            type="text"
                            label="用户名"
                            placeholder="请输入用户名"
                            mode={MODE_NULL}
                            error={login.ok}/>
                        <FieldGroup
                            name="password"
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            mode={MODE_NULL}
                            error={login.ok}/>
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

const LoginModalForm = reduxForm({
    form : FORM_LOGIN,
    validate : validate,
    onSubmit : onSubmit
})(LoginModal);

const mapStateToProps = state => {
    return {
        show : state.navigation.modal.loginModal_show,
        login : state.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loginClear: () => {
            dispatch(loginClear())
        },
        onHide: () => {
            dispatch(setLoginModalShow(false))
        },
    }
};

const LoginModalContainer = connect(mapStateToProps,mapDispatchToProps)(LoginModalForm);

export default LoginModalContainer;