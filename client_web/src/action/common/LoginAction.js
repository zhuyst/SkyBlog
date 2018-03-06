import fetch from 'isomorphic-fetch'
import {change, startSubmit, stopSubmit} from 'redux-form'

import {
    LOGIN_URL, HttpMethod, ContentType, FAIL_RESULT, checkStatus, removeToken, REFRESH_URL,
    getToken, setToken
} from "../../Api";
import {FORM_LOGIN, FORM_USERINFO} from "../../Constant";
import {error, info, success} from "./NotifyAction";
import {setLoginModalShow} from "./ModalAction";

export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export const LOGIN_CLEAR = "LOGIN_CLEAR";
export const SET_MANAGEMENT = "SET_MANAGEMENT";
export const SET_LOGIN_USER = "SET_LOGIN_USER";

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

export const setManagement = management => {
    return {
        type : SET_MANAGEMENT,
        management : management
    }
};


export const checkUserLoginState = () => dispatch => {
    let token = getToken();

    return fetch(REFRESH_URL,{
        method: HttpMethod.POST,
        headers: {
            "Content-Type": ContentType.FORM
        },
        body: `token=${token}`
    }).then(response => checkStatus(response))
        .then(result => afterLogin(result,dispatch,false))
        .catch(() => afterLogin(FAIL_RESULT,dispatch,false))
};

export const afterLogin = (result,dispatch,alert) => {
    let ok = false;
    let message = null;

    if(result.code === 200){
        dispatch(setLoginModalShow(false));

        const entity = result.entity;

        const user = entity.user;
        dispatch(setLoginUser(user));

        setToken(entity);

        dispatch(change(FORM_USERINFO,"id",user.id));
        dispatch(change(FORM_USERINFO,"username",user.username));
        dispatch(change(FORM_USERINFO,"nickname",user.nickname));

        if(alert){
            dispatch(success("登录成功"));
        }

        ok = true;
    }
    else if(result.code === 401){
        ok = null;
    }
    else {
        dispatch(error(result.message));
        message = result.message
    }

    dispatch(loginResponse(ok,message))
};

export const setLoginUser = user => {
    user.password = null;
    return {
        type : SET_LOGIN_USER,
        user : user
    }
};