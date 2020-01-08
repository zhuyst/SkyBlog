import fetch from "isomorphic-fetch";
import * as Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import msg from "@/action/common/notify";
import { loginClear } from "@/action/common/login";
import { API_BASE_URL } from "@/Constant";
import { IAccessToken, Token } from "./auth";

export const AUTH_URL = `${API_BASE_URL}/auth`;
export const USER_API_URL = `${API_BASE_URL}/users`;
export const ARTICLE_API_URL = `${API_BASE_URL}/articles`;
export const CLASSIFY_API_URL = `${API_BASE_URL}/classifies`;
export const MSG_BOARD_API_URL = `${API_BASE_URL}/msg_board`;
export const ABOUT_API_URL = `${API_BASE_URL}/about`;
export const SYS_LOG_URL = `${API_BASE_URL}/sys_log`;
export const ACCESS_LOG_URL = `${API_BASE_URL}/access_log`;
export const OSS_URL = `${API_BASE_URL}/oss`;

export interface IBaseEntity {
  id: number;
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
  if (typeof (token) === "undefined") {
    token = "";
  }
  return token;
}

export enum ContentType {
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

function getHeaders(contentType: ContentType): IRequestHeaders {
  const headers: IRequestHeaders = {
    "Content-Type": contentType,
  };

  const token = Cookies.get(COOKIE_TOKEN);
  if (token) {
    headers.Token = token;
  }

  return headers;
}

interface IRequestBody {
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

export function checkStatus<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }
  throw new Error();
}

async function handleFetch<T>(response: Response): Promise<IApiResult<T>> {
  try {
    const result = await checkStatus<IApiResult<T>>(response);
    if (result.code === ApiResultCode.Unauthorized) {
      msg.info(result.message);
      removeToken();

      const dispatch = useDispatch();
      dispatch(loginClear());
    }
    return result;
  } catch (e) {
    msg.error(FAIL_RESULT.message);
    throw e;
  }
}

async function handleFetchWithBody<T>(
  url: string, body: IRequestBody, httpMethod: HttpMethod, contentType: ContentType,
):
  Promise<IApiResult<T>> {
  let bodyStr: string;
  switch (contentType) {
    case ContentType.JSON: {
      bodyStr = JSON.stringify(body);
      break;
    }
    case ContentType.FORM: {
      const keyAndValues = [];
      Object.keys(body).forEach((key) => {
        const value = body[key];
        keyAndValues.push(`${key}=${value}`);
      });
      bodyStr = keyAndValues.join("&");
      break;
    }
    default: {
      throw new Error(`ContentType ${contentType} not found`);
    }
  }
  const response = await fetch(url, {
    body: bodyStr,
    headers: getHeaders(contentType),
    method: httpMethod,
  });
  return handleFetch<T>(response);
}

export async function httpGet<T = null>(url: string, body?: IRequestBody): Promise<IApiResult<T>> {
  if (body !== null) {
    const urlObj = new URL(url);
    Object.keys(body).forEach((key) => urlObj.searchParams.append(key, body[key]));
    url = urlObj.toJSON();
  }

  const response = await fetch(url, {
    headers: getHeaders(ContentType.JSON),
    method: HttpMethod.GET,
  });
  return handleFetch<T>(response);
}

export function httpPost<T = null>(
  url: string, body?: IRequestBody, contentType: ContentType = ContentType.JSON,
):
  Promise<IApiResult<T>> {
  return handleFetchWithBody<T>(url, body, HttpMethod.POST, contentType);
}

export function httpPut<T = null>(
  url: string, body?: IRequestBody, contentType: ContentType = ContentType.JSON,
):
  Promise<IApiResult<T>> {
  return handleFetchWithBody<T>(url, body, HttpMethod.PUT, contentType);
}

export function httpPatch<T = null>(
  url: string, body?: IRequestBody, contentType: ContentType = ContentType.JSON,
):
  Promise<IApiResult<T>> {
  return handleFetchWithBody<T>(url, body, HttpMethod.PATCH, contentType);
}

export function httpDelete<T = null>(
  url: string, body?: IRequestBody, contentType: ContentType = ContentType.JSON,
):
  Promise<IApiResult<T>> {
  return handleFetchWithBody<T>(url, body, HttpMethod.DELETE, contentType);
}
