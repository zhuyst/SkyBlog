import * as Cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import {startSubmit,stopSubmit} from 'redux-form'

import {
    USER_API_URL, FAIL_RESULT, _insert, checkStatus, _update, REFRESH_URL, ContentType, HttpMethod,
    COOKIE_TOKEN
} from "../Api";
import {FORM_REGISTER,FORM_USERINFO} from "../Form";
import {dispatch} from "../store/Store";
import {login, loginResponse, setLoginModelShow, setUserInfoModelShow} from "./common/ModelAction";
import {success, error, info} from "./common/NotifyAction";

export const LIST_USERS = "LIST_USERS";
export const REGISTER_USER_RESPONSE = "REGISTER_USER_RESPONSE";
export const DELETE_USER = "DELETE_USER";
export const GET_USER_INFO = "GET_USER_INFO";
export const UPDATE_USER_INFO_RESPONSE = "UPDATE_USER_INFO_RESPONSE";
export const CHECK_USER_LOGIN_STATE = "CHECK_USER_LOGIN_STATE";
export const SET_LOGIN_USER = "SET_LOGIN_USER";

export const registerUser = (user) => (dispatch) => {
    const url = USER_API_URL + "/public/";

    dispatch(startSubmit(FORM_REGISTER));
    return fetch(url,_insert(user))
        .then(response => checkStatus(response))
        .then(result => dispatch(registerUserResponse(result)))
        .catch(() => dispatch(registerUserResponse(FAIL_RESULT)));
};

const registerUserResponse = (result) => {
    dispatch(stopSubmit(FORM_REGISTER,result.errors));

    if(result.code === 200){
        dispatch(setLoginModelShow(false));
        dispatch(success("注册成功，开始登陆"));
        dispatch(login(result.entity));
    }
    else {
        dispatch(error(result.message));
    }

    return {
        type : REGISTER_USER_RESPONSE,
        result : result
    }
};

export const listUsers = (pageNum) => {
    return {
        type : LIST_USERS,
        url : USER_API_URL + `/list/${pageNum}`,
    }
};

export const deleteUser = (id) => {
    return {
        type : DELETE_USER,
        url : USER_API_URL + `/${id}`,
    }
};

export const getUserInfo = (id) => {
    return {
        type : GET_USER_INFO,
        url : USER_API_URL + `/${id}`,
    }
};

export const updateUserInfo = (user) => dispatch => {
    const url = USER_API_URL + `/${user.id}`;

    dispatch(startSubmit(FORM_USERINFO));
    return fetch(url,_update(user))
        .then(response => checkStatus(response))
        .then(result => dispatch(updateUserInfoResponse(result)))
        .catch(() => dispatch(updateUserInfoResponse(FAIL_RESULT)))
};

const updateUserInfoResponse = (result) =>{
    dispatch(stopSubmit(FORM_USERINFO,result.errors));

    if(result.code === 200){
        dispatch(setUserInfoModelShow(false));
        dispatch(setLoginUser(result.entity));
        dispatch(info("修改个人信息成功"));
    }
    else{
        dispatch(error(result.message));
    }

    return {
        type : UPDATE_USER_INFO_RESPONSE,
        result : result
    }
};

export const checkUserLoginState = () => dispatch => {
    let token = Cookies.get(COOKIE_TOKEN);
    if(typeof(token) === "undefined"){
        token = "";
    }

    return fetch(REFRESH_URL,{
            method: HttpMethod.POST,
            headers: {
                "Content-type": ContentType.FORM
            },
            body: `token=${token}`
        }).then(response => checkStatus(response))
        .then(result => dispatch(loginResponse(result)))
        .catch(() => dispatch(loginResponse(FAIL_RESULT)))
};

export const setLoginUser = user => {
    user.password = null;
    return {
        type : SET_LOGIN_USER,
        user : user
    }
};






