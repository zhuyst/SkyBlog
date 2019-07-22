import {message as msg} from "antd";
import {Action, Dispatch} from "redux";
import {change, startSubmit, stopSubmit} from "redux-form";
import {ApiResultCode, FAIL_RESULT, getToken, IApiResult, removeToken, setToken} from "../../api";
import {fetchLogin, fetchRefresh, IAuthResponse} from "../../api/auth";
import {IUser} from "../../api/user";
import {IUpdateAboutResponseAction} from "../about";
import {IThunkAction} from "../common";
import {FORM_LOGIN, FORM_USERINFO} from "../form";
import {getAccessCount} from "../log/accessLog";
import {setLoginModalShow} from "./modal";

export const LOGIN_CLEAR = "LOGIN_CLEAR";
export interface ILoginClearAction extends Action<typeof LOGIN_CLEAR> {
}
export function loginClear(): ILoginClearAction {
    return {
        type : LOGIN_CLEAR,
    };
}

export function login(username: string, password: string): IThunkAction {
    return async (dispatch) => {
        dispatch(startSubmit(FORM_LOGIN));
        try {
            const result = await fetchLogin(username, password);
            dispatch(stopSubmit(FORM_LOGIN));
            afterLogin(result, dispatch, true);
        } catch (e) {
            afterLogin(FAIL_RESULT, dispatch, true);
        }
    };
}

export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export interface ILoginResponseAction extends Action<typeof LOGIN_RESPONSE> {
    ok: boolean;
    message: string;
}
export function loginResponse(ok: boolean, message: string): ILoginResponseAction {
    return {
        type : LOGIN_RESPONSE,
        ok,
        message,
    };
}

export function logout(): IThunkAction {
    return (dispatch) => {
        removeToken();

        msg.info("登出成功");
        dispatch(loginClear());
    };
}

export const SET_MANAGEMENT = "SET_MANAGEMENT";
export interface ISetManagementAction extends Action<typeof SET_MANAGEMENT> {
    management: boolean;
}
export function setManagement(management: boolean): ISetManagementAction {
    return {
        type : SET_MANAGEMENT,
        management,
    };
}

export function checkUserLoginState(): IThunkAction {
    return async (dispatch) => {
        const token = getToken();

        try {
            const result = await fetchRefresh(token);
            if (result.code === ApiResultCode.Unauthorized) {
                removeToken();
            }

            afterLogin(result, dispatch, false);
            dispatch(getAccessCount());
        } catch (e) {
            afterLogin(FAIL_RESULT, dispatch, false);
        }
    };
}

export function afterLogin(result: IApiResult<IAuthResponse>, dispatch: Dispatch, alert: boolean) {
    let ok = false;
    let message = null;

    if (result.code === ApiResultCode.OK) {
        dispatch(setLoginModalShow(false));

        const entity = result.entity;

        const user = entity.user;
        dispatch(setLoginUser(user));

        setToken(entity);

        dispatch(change(FORM_USERINFO, "id", user.id));
        dispatch(change(FORM_USERINFO, "username", user.username));
        dispatch(change(FORM_USERINFO, "nickname", user.nickname));

        if (alert) {
            msg.success("登录成功");
        }

        ok = true;
    } else if (result.code === ApiResultCode.Unauthorized) {
        ok = null;
    } else {
        msg.error(result.message);
        message = result.message;
    }

    dispatch(loginResponse(ok, message));
}

export const SET_LOGIN_USER = "SET_LOGIN_USER";
export interface ISetLoginUserAction extends Action<typeof SET_LOGIN_USER> {
    user: IUser;
}
export function setLoginUser(user: IUser): ISetLoginUserAction {
    user.password = null;
    return {
        type : SET_LOGIN_USER,
        user,
    };
}

export type LoginAction = ISetManagementAction | ILoginClearAction | ILoginResponseAction |
    ISetLoginUserAction | IUpdateAboutResponseAction;
