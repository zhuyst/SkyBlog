import fetch from "isomorphic-fetch";
import * as Cookies from "js-cookie";

import {error, info} from "../action/common/notify";
import { API_BASE_URL } from "../Constant";
import store from "../store";
import {loginClear} from "./action/common/LoginAction";
const { dispatch } = store;

export const LOGIN_URL = `${API_BASE_URL}/auth/login`;
export const REFRESH_URL = `${API_BASE_URL}/auth/refresh`;

export const USER_API_URL = `${API_BASE_URL}/users`;
export const ARTICLE_API_URL = `${API_BASE_URL}/articles`;
export const CLASSIFY_API_URL = `${API_BASE_URL}/classifies`;
export const MSG_BOARD_API_URL = `${API_BASE_URL}/msg_board`;
export const ABOUT_API_URL = `${API_BASE_URL}/about`;
export const SYS_LOG_URL = `${API_BASE_URL}/sys_log`;
export const ACCESS_LOG_URL = `${API_BASE_URL}/access_log`;
export const OSS_URL = `${API_BASE_URL}/oss`;

type Token = string;

export interface IAccessToken {
    token: Token;
    expire: number;
}

const COOKIE_TOKEN: string = "Token";

export function removeToken() {
    Cookies.remove(COOKIE_TOKEN);
}

export function setToken(entity: IAccessToken) {
    Cookies.set(COOKIE_TOKEN, entity.token, { expires: entity.expire });
}

export function getToken(): Token {
    let token = Cookies.get(COOKIE_TOKEN);
    if (typeof(token) === "undefined") {
        token = "";
    }
    return token;
}

enum ContentType {
    FORM = "application/x-www-form-urlencoded; charset=UTF-8",
    JSON = "application/json;charset=UTF-8",
}

enum HttpMethod {
    DELETE = "DELETE",
    GET = "GET",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
}

interface IRequestHeaders {
    [index: string]: string;
    "Content-Type": string;
    Token?: Token;
}

function getHeaders(): IRequestHeaders {
    const headers: IRequestHeaders = {
        "Content-Type": ContentType.JSON,
    };

    const token = Cookies.get(COOKIE_TOKEN);
    if (token) {
        headers.Token = token;
    }

    return headers;
}

export interface IRequestBody {
    [key: string]: any;
}

export enum ApiResultCode {
    OK = 200,
    Unauthorized = 401,
    Error = 500,
}

export interface IApiResult<T = null> {
    code: ApiResultCode | number;
    message: string;
    entity?: T;
    errors?: {
        [key: string]: string;
    };
}

export const FAIL_RESULT: IApiResult = {
    code: ApiResultCode.Error,
    message: "网络请求失败，请检查网络状态",
};

export async function httpGet<T = null>(url: string, body: IRequestBody = null): Promise<IApiResult<T>> {
    if (body !== null) {
        const urlObj = new URL(url);
        Object.keys(body).forEach((key) => urlObj.searchParams.append(key, body[key]));
        url = urlObj.toJSON();
    }

    const response = await fetch(url, {
        headers: getHeaders(),
        method : HttpMethod.GET,
    });
    return handleFetch<T>(response);
}

export function httpPost<T = null>(url: string, body: IRequestBody): Promise<IApiResult<T>> {
    return handleFetchWithBody<T>(url, body, HttpMethod.POST);
}

export function httpPut<T = null>(url: string, body: IRequestBody): Promise<IApiResult<T>> {
    return handleFetchWithBody<T>(url, body, HttpMethod.PUT);
}

export function httpPatch<T = null>(url: string, body: IRequestBody): Promise<IApiResult<T>> {
    return handleFetchWithBody<T>(url, body, HttpMethod.PATCH);
}

export function httpDelete<T = null>(url: string, body: IRequestBody): Promise<IApiResult<T>> {
    return handleFetchWithBody<T>(url, body, HttpMethod.DELETE);
}

export function checkStatus<T>(response: Response): Promise<IApiResult<T>> {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error();
    }
}

async function handleFetchWithBody<T>(url: string, body: IRequestBody, httpMethod: HttpMethod): Promise<IApiResult<T>> {
    const response = await fetch(url, {
        body : JSON.stringify(body),
        headers: getHeaders(),
        method : httpMethod,
    });
    return handleFetch<T>(response);
}

async function handleFetch<T>(response: Response): Promise<IApiResult<T>> {
    try {
        const result = await checkStatus<T>(response);
        if (result.code === ApiResultCode.Unauthorized) {
            info(result.message);
            removeToken();
            dispatch(loginClear());
        }
        return result;
    } catch (e) {
        dispatch(error(FAIL_RESULT.message));
    }
}
