import {AUTH_URL, ContentType, httpPost, IApiResult} from "../index";

export interface IUser {
    id: number;
    username: string;
    nickname: string;
    password: string;
}

export type Token = string;

export interface IAccessToken {
    token: Token;
    expire: number;
}

export interface IAuthResponse extends IAccessToken {
    user: IUser;
}

export function fetchLogin(username, password): Promise<IApiResult<IAuthResponse>> {
    return httpPost<IAuthResponse>(`${AUTH_URL}/login`, {
        username, password,
    }, ContentType.FORM);
}

export function fetchRefresh(token: Token): Promise<IApiResult<IAuthResponse>> {
    return httpPost<IAuthResponse>(`${AUTH_URL}/refresh`, {
        Token: token,
    }, ContentType.FORM);
}
