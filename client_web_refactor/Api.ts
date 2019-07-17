import fetch from "isomorphic-fetch";
import * as Cookies from "js-cookie";

import {error, info} from "./action/common/NotifyAction";
import {dispatch} from "./store/Store";

import {loginClear} from "./action/common/LoginAction";

import { API_BASE_URL } from "./Constant";

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

type Token = string;

export interface IAccessToken {
    token: Token;
    expire: number;
}

const COOKIE_TOKEN: string = "Token";

export const removeToken = () => {
    Cookies.remove(COOKIE_TOKEN);
};

export const setToken = (entity: IAccessToken) => {
    Cookies.set(COOKIE_TOKEN, entity.token, { expires: entity.expire });
};

export const getToken = (): Token => {
    let token = Cookies.get(COOKIE_TOKEN);
    if (typeof(token) === "undefined") {
        token = "";
    }
    return token;
};

export enum ContentType {
    FORM = "application/x-www-form-urlencoded; charset=UTF-8",
    JSON = "application/json;charset=UTF-8",
}

export enum HttpMethod {
    DELETE = "DELETE",
    GET = "GET",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
}

const getHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
        "Content-Type": ContentType.JSON,
    };

    const token = Cookies.get(COOKIE_TOKEN);
    if (token) {
        headers.Token = token;
    }

    return headers;
};

export interface IRequestBody {
    [key: string]: any;
}

export const httpGet = (url: string, body: IRequestBody = null): Promise<IApiResult> => {
    if (body !== null) {
        const urlObj = new URL(url);
        Object.keys(body).forEach((key) => urlObj.searchParams.append(key, body[key]));
        url = urlObj.toJSON();
    }

    const promise = fetch(url, {
        headers: getHeaders(),
        method : HttpMethod.GET,
    });
    return handleFetch(promise);
};

export const httpPost = (url: string, body: IRequestBody): Promise<IApiResult> => {
    return handleFetchWithBody(url, body, HttpMethod.POST);
};

export const httpPut = (url: string, body: IRequestBody): Promise<IApiResult> => {
    return handleFetchWithBody(url, body, HttpMethod.PUT);
};

export const httpPatch = (url: string, body: IRequestBody): Promise<IApiResult> => {
    return handleFetchWithBody(url, body, HttpMethod.PATCH);
};

export const httpDelete = (url: string, body: IRequestBody): Promise<IApiResult> => {
    return handleFetchWithBody(url, body, HttpMethod.DELETE);
};

export interface IApiResult {
    code: number;
    message: string;
    entity?: any;
}

export const FAIL_RESULT: IApiResult = {
    code: 500,
    message: "网络请求失败，请检查网络状态",
};

export const checkStatus = (response: Response): Promise<IApiResult> => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error();
    }
};

const handleFetchWithBody = (url: string, body: IRequestBody, httpMethod: HttpMethod): Promise<IApiResult> => {
    const promise = fetch(url, {
        body : JSON.stringify(body),
        headers: getHeaders(),
        method : httpMethod,
    });
    return handleFetch(promise);
};

const handleFetch = (promise: Promise<Response>): Promise<IApiResult> => {
    return promise
        .then((response: Response) => checkStatus(response))
        .then((result: IApiResult): IApiResult => {
            if (result.code === 401) {
                info(result.message);
                removeToken();
                dispatch(loginClear());
            }
            return result;
        }).catch(() => dispatch(error(FAIL_RESULT.message)));
};
