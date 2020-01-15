import fetch from "isomorphic-fetch";
import * as Cookies from "js-cookie";
import { getStore } from "@/store";
import msg from "@/action/common/notify";
import { loginClear } from "@/action/common/login";
import { API_BASE_URL } from "@/config";
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
  const token = Cookies.get(COOKIE_TOKEN);
  return token || "";
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

function getHeaders(contentType: ContentType): HeadersInit {
  const headers: HeadersInit = {
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
  entity: T;
  errors?: {
    [key: string]: string;
  };
}

export const FAIL_RESULT: IApiResult = {
  code: ApiResultCode.Error,
  entity: null,
  message: "网络请求失败，请检查网络状态",
};

export function checkStatus<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

async function handleFetch<T>(response: Response): Promise<IApiResult<T>> {
  try {
    const result = await checkStatus<IApiResult<T>>(response);
    console.log(response.url, JSON.stringify(result));
    if (result.code === ApiResultCode.Unauthorized) {
      msg.info(result.message);
      removeToken();

      const store = getStore();
      store.dispatch(loginClear());
    }
    return result;
  } catch (e) {
    msg.error(FAIL_RESULT.message);
    throw e;
  }
}

async function handleFetchWithBody<T>(
  url: string, httpMethod: HttpMethod, contentType: ContentType, body?: IRequestBody,
):
  Promise<IApiResult<T>> {
  let bodyStr: string | null = null;
  if (body) {
    switch (contentType) {
      case ContentType.JSON: {
        bodyStr = JSON.stringify(body);
        break;
      }
      case ContentType.FORM: {
        const keyAndValues: string[] = [];
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
  }
  const response = await fetch(url, {
    body: bodyStr,
    headers: getHeaders(contentType),
    method: httpMethod,
  });
  return handleFetch<T>(response);
}

export async function httpGet<T = null>(url: string, body?: IRequestBody): Promise<IApiResult<T>> {
  if (body) {
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
  return handleFetchWithBody<T>(url, HttpMethod.POST, contentType, body);
}

export function httpPut<T = null>(
  url: string, body?: IRequestBody, contentType: ContentType = ContentType.JSON,
):
  Promise<IApiResult<T>> {
  return handleFetchWithBody<T>(url, HttpMethod.PUT, contentType, body);
}

export function httpPatch<T = null>(
  url: string, body?: IRequestBody, contentType: ContentType = ContentType.JSON,
):
  Promise<IApiResult<T>> {
  return handleFetchWithBody<T>(url, HttpMethod.PATCH, contentType, body);
}

export function httpDelete<T = null>(
  url: string, body?: IRequestBody, contentType: ContentType = ContentType.JSON,
):
  Promise<IApiResult<T>> {
  return handleFetchWithBody<T>(url, HttpMethod.DELETE, contentType, body);
}
