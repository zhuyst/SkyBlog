import fetch from 'isomorphic-fetch'
import {startSubmit,stopSubmit} from 'redux-form'

import {LOGIN_URL, HttpMethod, ContentType, FAIL_RESULT, checkStatus, removeToken} from "../../Api";
import {FORM_LOGIN} from "../../Constant";
import {info} from "./NotifyAction";
import {afterLogin} from "../user/UsersAction";

export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export const LOGIN_CLEAR = "LOGIN_CLEAR";
export const SET_ADMIN = "SET_ADMIN";

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
            "Content-Type": ContentType.FORM
        },
        body: `username=${user.username}&password=${user.password}`
    }).then(response => checkStatus(response))
        .then(result => {
            dispatch(stopSubmit(FORM_LOGIN));
            afterLogin(result,dispatch,true);
        }).catch(() => afterLogin(FAIL_RESULT,dispatch,true));
};

export const loginResponse = (ok,message) => {
    return {
        type : LOGIN_RESPONSE,
        ok : ok,
        message : message
    }
};

export const logout = () => (dispatch) =>{
    removeToken();

    dispatch(info("登出成功"));
    dispatch(loginClear());
};

export const setAdmin = admin => {
    return {
        type : SET_ADMIN,
        admin : admin
    }
};