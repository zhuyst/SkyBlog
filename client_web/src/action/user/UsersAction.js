import * as Cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import {change, startSubmit, stopSubmit} from 'redux-form'

import {
    USER_API_URL, FAIL_RESULT, _post, checkStatus, _put, REFRESH_URL, ContentType, HttpMethod,
    COOKIE_TOKEN, _get, _delete
} from "../../Api";
import {FORM_REGISTER,FORM_USERINFO} from "../../Constant";
import {login, loginResponse, setLoginModelShow, setUserInfoModelShow} from "../common/ModelAction";
import {success, error, info} from "../common/NotifyAction";

export const LIST_USERS_RESPONSE = "LIST_USERS_RESPONSE";
export const GET_USER_INFO_RESPONSE = "GET_USER_INFO_RESPONSE";

export const REGISTER_USER_RESPONSE = "REGISTER_USER_RESPONSE";
export const DELETE_USER_RESPONSE = "DELETE_USER_RESPONSE";
export const UPDATE_USER_INFO_RESPONSE = "UPDATE_USER_INFO_RESPONSE";

export const SET_LOGIN_USER = "SET_LOGIN_USER";

export const registerUser = (user) => (dispatch) => {
    const url = USER_API_URL + "/public/";

    dispatch(startSubmit(FORM_REGISTER));
    return fetch(url,_post(user))
        .then(response => checkStatus(response))
        .then(result => {
            dispatch(stopSubmit(FORM_REGISTER,result.errors));

            if(result.code === 200){
                dispatch(setLoginModelShow(false));
                dispatch(success("注册成功，开始登陆"));
                dispatch(login(result.entity));
            }
            else {
                dispatch(error(result.message));
            }

            dispatch(registerUserResponse(result))
        }).catch(() => dispatch(error(FAIL_RESULT.message)));
};

const registerUserResponse = (result) => {
    return {
        type : REGISTER_USER_RESPONSE,
        result : result
    }
};

export const listUsers = (pageNum,pageSize) => dispatch => {
    const url = USER_API_URL + `/list/${pageNum}`;
    return _get(url,{
        pageNum : pageNum,
        pageSize : pageSize
    }).then(result => dispatch(listUsersResponse(result)))
};

const listUsersResponse = result => {
    return {
        type : LIST_USERS_RESPONSE,
        users : result.entity
    }
};

export const deleteUser = id => dispatch => {
    const url =  USER_API_URL + `/${id}`;
    return _delete(url)
        .then(result => dispatch(deleteUserResponse(result)))
};

const deleteUserResponse = result => {
    return {
        type : DELETE_USER_RESPONSE,
        result : result
    }
};

export const getUserInfo = id => dispatch => {
    const url = USER_API_URL + `/${id}`;
    return _get(url)
        .then(result => dispatch(getUserInfoResponse(result)))
};

const getUserInfoResponse = result => {
    return {
        type : GET_USER_INFO_RESPONSE,
        user : result.entity
    }
};

export const updateUserInfo = (user) => dispatch => {
    const url = USER_API_URL + `/${user.id}`;

    dispatch(startSubmit(FORM_USERINFO));
    return fetch(url,_put(user))
        .then(response => checkStatus(response))
        .then(result => {
            dispatch(stopSubmit(FORM_USERINFO,result.errors));

            if(result.code === 200){
                dispatch(setUserInfoModelShow(false));
                dispatch(setLoginUser(result.entity));
                dispatch(info("修改个人信息成功"));
            }
            else{
                dispatch(error(result.message));
            }

            dispatch(updateUserInfoResponse(result))
        }).catch(() => dispatch(error(FAIL_RESULT.message)))
};

const updateUserInfoResponse = user =>{
    return {
        type : UPDATE_USER_INFO_RESPONSE,
        user : user
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
        .then(result => afterLogin(result,dispatch))
        .catch(() => afterLogin(FAIL_RESULT,dispatch))
};

export const afterLogin = (result,dispatch) => {
    if(result.code === 200){
        dispatch(setLoginModelShow(false));

        const entity = result.entity;

        const user = entity.user;
        dispatch(setLoginUser(user));

        Cookies.set(COOKIE_TOKEN,entity.token,{ expires: entity.expire });

        dispatch(change(FORM_USERINFO,"id",user.id));
        dispatch(change(FORM_USERINFO,"username",user.username));
        dispatch(change(FORM_USERINFO,"nickname",user.nickname));

        dispatch(success("登陆成功"));
    }
    else if(result.code !== 403){
        dispatch(error(result.message));
    }
    dispatch(loginResponse(result))
};

export const setLoginUser = user => {
    user.password = null;
    return {
        type : SET_LOGIN_USER,
        user : user
    }
};






