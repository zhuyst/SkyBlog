import {message as msg} from "antd";
import {Action} from "redux";
import {startSubmit, stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {ApiResultCode, IApiResult} from "../../api";
import {
    fetchDeleteUser,
    fetchGetUserInfo,
    fetchListUsers,
    fetchRegisterUser,
    fetchUpdateUserInfo,
    fetchUpdateUserRole,
    fetchUpdateUserStatus,
    IUser,
    Role,
    Status, UserRole, UserStatus,
} from "../../api/user";
import {IAppState} from "../../store";
import {IPageInfo, IThunkAction} from "../common";
import {afterLogin, setLoginUser} from "../common/login";
import {setRegisterModalShow, setUserInfoModalShow} from "../common/modal";
import {FORM_REGISTER, FORM_USERINFO} from "../form";
import {USER_PAGE_SIZE} from "../pageSize";

export function registerUser(user: IUser): IThunkAction {
    return async (dispatch) => {
        dispatch(startSubmit(FORM_REGISTER));
        const result = await fetchRegisterUser(user);
        dispatch(stopSubmit(FORM_REGISTER, result.errors));

        if (result.code === ApiResultCode.OK) {
            dispatch(setRegisterModalShow(false));
            msg.success("注册成功，开始登录");
            dispatch(registerUserResponse(result));
            afterLogin(result, dispatch, true);
        } else {
            msg.error(result.message);
        }
    };
}

export const REGISTER_USER_RESPONSE = "REGISTER_USER_RESPONSE";
export interface IRegisterUserResponseAction extends Action<typeof REGISTER_USER_RESPONSE> {
    result: IApiResult;
}
function registerUserResponse(result: IApiResult): IRegisterUserResponseAction {
    return {
        type : REGISTER_USER_RESPONSE,
        result,
    };
}

export function listUsers(pageNum: number, pageSize: number): IThunkAction {
    return async (dispatch) => {
        const result = await fetchListUsers(pageNum, pageSize);
        dispatch(listUsersResponse(result.entity));
    };
}

export const LIST_USERS_RESPONSE = "LIST_USERS_RESPONSE";
export interface IListUsersResponseAction extends Action<typeof LIST_USERS_RESPONSE> {
    page: IPageInfo<IUser>;
}
function listUsersResponse(page: IPageInfo<IUser>): IListUsersResponseAction {
    return {
        type : LIST_USERS_RESPONSE,
        page,
    };
}

export function deleteUser(id: number): IThunkAction {
    return async (dispatch) => {
        const result = await fetchDeleteUser(id);
        dispatch(deleteUserResponse(result));
    };
}

export const DELETE_USER_RESPONSE = "DELETE_USER_RESPONSE";
export interface IDeleteUserResponseAction extends Action<typeof DELETE_USER_RESPONSE> {
    result: IApiResult;
}
function deleteUserResponse(result: IApiResult): IDeleteUserResponseAction {
    return {
        type : DELETE_USER_RESPONSE,
        result,
    };
}

export function getUserInfo(id: number): IThunkAction {
    return async (dispatch) => {
        const result = await fetchGetUserInfo(id);
        dispatch(getUserInfoResponse(result.entity));
    };
}

export const GET_USER_INFO_RESPONSE = "GET_USER_INFO_RESPONSE";
export interface IGetUserInfoResponseAction extends Action<typeof GET_USER_INFO_RESPONSE> {
    user: IUser;
}
function getUserInfoResponse(user: IUser): IGetUserInfoResponseAction {
    return {
        type : GET_USER_INFO_RESPONSE,
        user,
    };
}

export function updateUserInfo(user: IUser): IThunkAction {
    return async (dispatch) => {
        dispatch(startSubmit(FORM_USERINFO));
        const result = await fetchUpdateUserInfo(user);
        dispatch(stopSubmit(FORM_USERINFO, result.errors));

        if (result.code === ApiResultCode.OK) {
            dispatch(setUserInfoModalShow(false));
            dispatch(setLoginUser(result.entity));
            msg.success("修改个人信息成功");
            dispatch(updateUserInfoResponse(result.entity));
        } else {
            msg.error(result.message);
        }
    };
}

export const UPDATE_USER_INFO_RESPONSE = "UPDATE_USER_INFO_RESPONSE";
export interface IUpdateUserInfoResponseAction extends Action<typeof UPDATE_USER_INFO_RESPONSE> {
    user: IUser;
}
function updateUserInfoResponse(user: IUser): IUpdateUserInfoResponseAction {
    return {
        type : UPDATE_USER_INFO_RESPONSE,
        user,
    };
}

export function updateUserRole(id: number, roleId: Role): IThunkAction {
    return modifyUserDetail(
        () => fetchUpdateUserRole(id, roleId),
        (dispatch, result) => {
            dispatch(updateUserRoleResponse(result));
            if (roleId === UserRole.ADMIN.id) {
                msg.success("提升为管理员成功");
            } else if (roleId === UserRole.VISITOR.id) {
                msg.success("降低为访客成功");
            }
        },
    );
}

export const UPDATE_USER_ROLE_RESPONSE = "UPDATE_USER_ROLE_RESPONSE";
export interface IUpdateUserRoleResponseAction extends Action<typeof UPDATE_USER_ROLE_RESPONSE> {
    result: IApiResult;
}
function updateUserRoleResponse(result: IApiResult): IUpdateUserRoleResponseAction {
    return {
        type : UPDATE_USER_ROLE_RESPONSE,
        result,
    };
}

export function updateUserStatus(id: number, statusId: Status): IThunkAction {
    return modifyUserDetail(
        () => fetchUpdateUserStatus(id, statusId),
        (dispatch, result) => {
            dispatch(updateUserStatusResponse(result));
            if (statusId === UserStatus.NORMAL.id) {
                msg.success("解除锁定成功");
            } else if (statusId === UserStatus.LOCKED.id) {
                msg.success("锁定账户成功");
            }
        },
    );
}

export const UPDATE_USER_STATUS_RESPONSE = "UPDATE_USER_STATUS_RESPONSE";
export interface IUpdateUserStatusResponseAction extends Action<typeof UPDATE_USER_STATUS_RESPONSE> {
    result: IApiResult;
}
function updateUserStatusResponse(result: IApiResult): IUpdateUserStatusResponseAction {
    return {
        type : UPDATE_USER_STATUS_RESPONSE,
        result,
    };
}

function modifyUserDetail(
    fetchFunc: () => Promise<IApiResult>,
    successFunc: (
        dispatch: ThunkDispatch<IAppState, null, Action<string>>,
        result: IApiResult,
    ) => void,
): IThunkAction {
    return async (dispatch, getState) => {
        const result = await fetchFunc();
        if (result.code === ApiResultCode.OK) {
            successFunc(dispatch, result);

            const state = getState();
            const pageNum = state.users.page.pageNum;
            dispatch(listUsers(pageNum, USER_PAGE_SIZE));
        } else {
            msg.error(result.message);
        }
    };
}
