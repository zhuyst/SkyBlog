const SERVER_BASE_URL = "http://localhost:8080";
const API_URL = SERVER_BASE_URL + "/api";

export const LOGIN_URL = SERVER_BASE_URL + "/login";
export const LOGOUT_URL = SERVER_BASE_URL + "/logout";

export const USER_API_URL = API_URL + "/users";
export const ARTICLE_API_URL = API_URL + "/articles";
export const CLASSIFY_API_URL = API_URL + "/classifies";
export const MSG_BOARD_API_URL = API_URL + "/msg_board";

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

const headers = {
    "Content-type": ContentType.JSON
};

export const _query = body => {
    return {
        method : HttpMethod.GET,
        credentials: "include",
        headers: headers,
        body : JSON.stringify(body)
    }
};

export const _insert = body => {
    return {
        method : HttpMethod.POST,
        credentials: "include",
        headers: headers,
        body : JSON.stringify(body)
    }
};

export const _update = body => {
    return {
        method : HttpMethod.PUT,
        credentials: "include",
        headers: headers,
        body : JSON.stringify(body)
    }
};

export const _delete = body => {
    return {
        method : HttpMethod.DELETE,
        credentials: "include",
        headers: headers,
        body : JSON.stringify(body)
    }
};

export const checkStatus = response => {
    if(response.status === 200){
        return response.json();
    }
    else {
        throw new Error();
    }
};

export const FAIL_CONDITION = {
    code: 500,
    message: "网络请求失败"
};