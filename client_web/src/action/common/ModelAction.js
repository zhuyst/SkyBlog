import * as Cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import {startSubmit,stopSubmit} from 'redux-form'

import {LOGIN_URL, HttpMethod, ContentType, FAIL_RESULT, checkStatus, COOKIE_TOKEN} from "../../Api";
import {FORM_LOGIN} from "../../Constant";
import {info} from "./NotifyAction";
import {afterLogin} from "../UsersAction";

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
        headers: {
            "Content-type": ContentType.FORM
        },
        body: `username=${user.username}&password=${user.password}`
    }).then(response => checkStatus(response))
        .then(result => {
            dispatch(stopSubmit(FORM_LOGIN));
            afterLogin(result,dispatch);
        }).catch(() => dispatch(afterLogin(FAIL_RESULT,dispatch)));
};

export const loginResponse = (result) => {
    return {
        type : LOGIN_RESPONSE,
        result : result
    }
};

export const logout = () => (dispatch) =>{
    Cookies.remove(COOKIE_TOKEN);

    dispatch(info("登出成功"));
    dispatch(loginClear());
};