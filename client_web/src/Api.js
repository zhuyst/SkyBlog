import * as Cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'

import {dispatch} from "./store/Store";
import {error} from "./action/common/NotifyAction";

const SERVER_BASE_URL = "http://localhost:8080";
const API_URL = SERVER_BASE_URL + "/api";

export const LOGIN_URL = SERVER_BASE_URL + "/auth/login";
export const REFRESH_URL = SERVER_BASE_URL + "/auth/refresh";

export const USER_API_URL = API_URL + "/users";
export const ARTICLE_API_URL = API_URL + "/articles";
export const CLASSIFY_API_URL = API_URL + "/classifies";
export const MSG_BOARD_API_URL = API_URL + "/msg_board";

export const COOKIE_TOKEN = "Token";

export const ContentType = {
    JSON : "application/json;charset=UTF-8",
    FORM : "application/x-www-form-urlencoded; charset=UTF-8"
};

export const HttpMethod = {
    GET : "GET",
    POST : "POST",
    PUT : "PUT",
    DELETE : "DELETE"
};

const getHeaders = () => {
    const token = Cookies.get(COOKIE_TOKEN);
    return {
        "Content-type": ContentType.JSON,
        "Token": token
    }
};

export const _query = (url,body) => {
    if(typeof(body) != "undefined" || body != null){
        url = new URL(url);
        Object.keys(body).forEach(key => url.searchParams.append(key, body[key]));
    }

    return fetch(url,{
        method : HttpMethod.GET,
        headers: getHeaders(),
    }).then(response => checkStatus(response))
        .catch(() => dispatch(error("未知错误，请联系管理员")))
};

export const _insert = (url,body) => {
    return fetch(url,{
        method : HttpMethod.POST,
        headers: getHeaders(),
        body : JSON.stringify(body)
    }).then(response => checkStatus(response))
        .catch(() => dispatch(error("未知错误，请联系管理员")))
};

export const _update = (url,body) => {
    return fetch(url,{
        method : HttpMethod.PUT,
        headers: getHeaders(),
        body : JSON.stringify(body)
    }).then(response => checkStatus(response))
        .catch(() => dispatch(error("未知错误，请联系管理员")))
};

export const _delete = (url,body) => {
    return fetch(url,{
        method : HttpMethod.DELETE,
        headers: getHeaders(),
        body : JSON.stringify(body)
    }).then(response => checkStatus(response))
        .catch(() => dispatch(error("未知错误，请联系管理员")))
};

export const checkStatus = response => {
    if(response.status === 200){
        return response.json();
    }
    else {
        throw new Error();
    }
};

export const FAIL_RESULT = {
    code: 500,
    message: "网络请求失败"
};