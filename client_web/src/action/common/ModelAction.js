import fetch from 'isomorphic-fetch'
import {startSubmit,stopSubmit,change} from 'redux-form'

import {LOGIN_URL,LOGOUT_URL,HttpMethod,ContentType,FAIL_CONDITION,checkStatus} from "../../Api";
import {FORM_LOGIN,FORM_USERINFO} from "../../Form";
import {dispatch} from "../../store/Store";
import {success,info,error} from "./NotifyAction";
import {setLoginUser} from "../UsersAction";

export const SET_LOGIN_MODEL_SHOW = "SET_LOGIN_MODEL_SHOW";
export const SET_REGISTER_MODEL_SHOW = "SET_REGISTER_MODEL_SHOW";
export const SET_USERINFO_MODEL_SHOW = "SET_USERINFO_MODEL_SHOW";

export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export const LOGIN_CLEAR = "LOGIN_CLEAR";

export const setLoginModelShow = loginModel_show =>{
    return {
        type : SET_LOGIN_MODEL_SHOW,
        loginModel_show : loginModel_show
    }
};

export const setRegisterModelShow = registerModel_show => {
    return {
        type : SET_REGISTER_MODEL_SHOW,
        registerModel_show : registerModel_show
    }
};

export const setUserInfoModelShow = userInfoModel_show => {
    return {
        type : SET_USERINFO_MODEL_SHOW,
        userInfoModel_show : userInfoModel_show
    }
};

export const loginClear = () => {
    return {
        type : LOGIN_CLEAR
    }
};

export const login = (user) => (dispatch) => {
    dispatch(startSubmit(FORM_LOGIN));
    return fetch(LOGIN_URL,{
        method: HttpMethod.POST,
        credentials: "include",
        headers: {
            "Content-type": ContentType.FORM
        },
        body: `username=${user.username}&password=${user.password}`
    }).then(response => checkStatus(response))
        .then(condition => dispatch(loginResponse(condition)))
        .catch(() => dispatch(loginResponse(FAIL_CONDITION)));
};

export const loginResponse = (condition) => {
    dispatch(stopSubmit(FORM_LOGIN));

    if(condition.code === 200){
        dispatch(setLoginModelShow(false));

        const user = condition.entity;
        dispatch(setLoginUser(user));

        dispatch(change(FORM_USERINFO,"id",user.id));
        dispatch(change(FORM_USERINFO,"username",user.username));
        dispatch(change(FORM_USERINFO,"nickname",user.nickname));

        dispatch(success("登陆成功"));
    }
    else {
        dispatch(error(condition.message));
    }

    return {
        type : LOGIN_RESPONSE,
        condition : condition
    }
};

export const logout = () => (dispatch) =>{
    dispatch(info("登出成功"));

    return fetch(LOGOUT_URL,{
        method : HttpMethod.POST,
        credentials: "include",
    }).then(response => checkStatus(response))
        .then(() => dispatch(loginClear()));
};