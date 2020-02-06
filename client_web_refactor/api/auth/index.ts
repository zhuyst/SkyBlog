import {
  AUTH_URL, ContentType, httpPost, IApiResult,
} from "@/api";
import { IAuthResponse, Token } from "@/define/auth";

export function fetchLogin(username: string, password: string)
  : Promise<IApiResult<IAuthResponse>> {
  return httpPost<IAuthResponse>(`${AUTH_URL}/login`, {
    username, password,
  }, ContentType.FORM);
}

export function fetchRefresh(token: Token): Promise<IApiResult<IAuthResponse>> {
  return httpPost<IAuthResponse>(`${AUTH_URL}/refresh`, {
    Token: token,
  }, ContentType.FORM);
}
