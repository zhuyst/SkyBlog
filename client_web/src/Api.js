import * as Cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'

import {dispatch} from "./store/Store";
import {error, info} from "./action/common/NotifyAction";

import {loginClear} from "./action/common/LoginAction";

const API_BASE_URL = "https://api.zhuyst.cc";

export const LOGIN_URL = API_BASE_URL + "/auth/login";
export const REFRESH_URL = API_BASE_URL + "/auth/refresh";

export const USER_API_URL = API_BASE_URL + "/users";
export const ARTICLE_API_URL = API_BASE_URL + "/articles";
export const CLASSIFY_API_URL = API_BASE_URL + "/classifies";
export const MSG_BOARD_API_URL = API_BASE_URL + "/msg_board";
export const ABOUT_API_URL = API_BASE_URL + "/about";
export const SYS_LOG_URL = API_BASE_URL + "/sys_log";
export const ACCESS_LOG_URL = API_BASE_URL + "/access_log";
export const OSS_URL = API_BASE_URL + "/oss";

const COOKIE_TOKEN = "Token";

export const removeToken = () => {
    Cookies.remove(COOKIE_TOKEN);
};

export const setToken = entity => {
    Cookies.set(COOKIE_TOKEN,entity.token,{ expires: entity.expire });
};

export const getToken = () => {
    let token = Cookies.get(COOKIE_TOKEN);
    if(typeof(token) === "undefined"){
        token = "";
    }
    return token;
};

export const ContentType = {
    JSON : "application/json;charset=UTF-8",
    FORM : "application/x-www-form-urlencoded; charset=UTF-8"
};

export const HttpMethod = {
    GET : "GET",
    POST : "POST",
    PUT : "PUT",
    PATCH : "PATCH",
    DELETE : "DELETE"
};

const getHeaders = () => {
    let headers = {
        "Content-Type": ContentType.JSON
    };

    const token = Cookies.get(COOKIE_TOKEN);
    if(token) {
        headers["Token"] = token;
    }

    return headers;
};

export const _get = (url,body = null) => {
    if(body !== null){
        url = new URL(url);
        Object.keys(body).forEach(key => url.searchParams.append(key, body[key]));
    }

    const promise = fetch(url,{
        method : HttpMethod.GET,
        headers: getHeaders(),
    });
    return handleFetch(promise);
};

export const _post = (url,body) => {
    const promise = fetch(url,{
        method : HttpMethod.POST,
        headers: getHeaders(),
        body : JSON.stringify(body)
    });
    return handleFetch(promise);
};

export const _put = (url,body) => {
    const promise = fetch(url,{
        method : HttpMethod.PUT,
        headers: getHeaders(),
        body : JSON.stringify(body)
    });
    return handleFetch(promise);
};

export const _patch = (url,body) => {
    const promise = fetch(url,{
        method : HttpMethod.PATCH,
        headers: getHeaders(),
        body : JSON.stringify(body)
    });
    return handleFetch(promise);
};

export const _delete = (url,body) => {
    const promise = fetch(url,{
        method : HttpMethod.DELETE,
        headers: getHeaders(),
        body : JSON.stringify(body)
    });
    return handleFetch(promise);
};

export const checkStatus = response => {
    if(response.status === 200){
        return response.json();
    }
    else {
        throw new Error();
    }
};

const handleFetch = promise => {
    return promise
        .then(response => checkStatus(response))
        .then(result => {
            if(result.code === 401){
                info(result.message);
                removeToken();
                dispatch(loginClear());
            }
            return result;
        }).catch(() => dispatch(error(FAIL_RESULT.message)))
};

export const FAIL_RESULT = {
    code: 500,
    message: "网络请求失败，请检查网络状态"
};
