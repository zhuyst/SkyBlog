import fetch from 'isomorphic-fetch'
import {change, startSubmit, stopSubmit} from 'redux-form'

import {
    USER_API_URL, FAIL_RESULT, _post, checkStatus, _put, REFRESH_URL, ContentType, HttpMethod,
     _get, _delete, setToken, getToken
} from "../../Api";
import {FORM_REGISTER,FORM_USERINFO} from "../../Constant";
import {setLoginModalShow, setRegisterModalShow, setUserInfoModalShow} from "../common/ModalAction";
import {loginResponse} from  "../common/LoginAction"
import {success, error} from "../common/NotifyAction";

export const LIST_USERS_RESPONSE = "LIST_USERS_RESPONSE";
export const GET_USER_INFO_RESPONSE = "GET_USER_INFO_RESPONSE";

export const REGISTER_USER_RESPONSE = "REGISTER_USER_RESPONSE";
export const DELETE_USER_RESPONSE = "DELETE_USER_RESPONSE";
export const UPDATE_USER_INFO_RESPONSE = "UPDATE_USER_INFO_RESPONSE";

export const SET_LOGIN_USER = "SET_LOGIN_USER";

export const registerUser = (user) => (dispatch) => {
    const url = USER_API_URL + "/public/";

    dispatch(startSubmit(FORM_REGISTER));
    return _post(url,user)
        .then(result => {
            dispatch(stopSubmit(FORM_REGISTER,result.errors));

            if(result.code === 200){
                dispatch(setRegisterModalShow(false));
                dispatch(success("注册成功，开始登陆"));
                dispatch(registerUserResponse(result));
                afterLogin(result,dispatch,true);
            }
            else {
                dispatch(error(result.message));
            }
        })
};

const registerUserResponse = (result) => {
    return {
        type : REGISTER_USER_RESPONSE,
        result : result
    }
};

export const listUsers = (pageNum,pageSize) => dispatch => {
    const url = USER_API_URL + "/list/";
    return _get(url,{
        pageNum : pageNum,
        pageSize : pageSize
    }).then(result => dispatch(listUsersResponse(result)))
};

const listUsersResponse = result => {
    return {
        type : LIST_USERS_RESPONSE,
        page : result.entity
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

export const updateUserInfo = user => dispatch => {
    const url = USER_API_URL + `/${user.id}`;

    dispatch(startSubmit(FORM_USERINFO));
    return _put(url,user)
        .then(result => {
            dispatch(stopSubmit(FORM_USERINFO,result.errors));

            if(result.code === 200){
                dispatch(setUserInfoModalShow(false));
                dispatch(setLoginUser(result.entity));
                dispatch(success("修改个人信息成功"));
                dispatch(updateUserInfoResponse(result))
            }
            else{
                dispatch(error(result.message));
            }

        });
};

const updateUserInfoResponse = result =>{
    return {
        type : UPDATE_USER_INFO_RESPONSE,
        user : result.entity
    }
};

export const checkUserLoginState = () => dispatch => {
    let token = getToken();

    return fetch(REFRESH_URL,{
            method: HttpMethod.POST,
            headers: {
                "Content-type": ContentType.FORM
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
            dispatch(success("登陆成功"));
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






