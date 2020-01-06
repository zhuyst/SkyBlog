import { Action } from "redux";

interface ISetModalShowAction<T> extends Action<T> {
  show: boolean;
}

export const SET_LOGIN_MODAL_SHOW = "SET_LOGIN_MODAL_SHOW";
export interface ISetLoginModalShowAction extends ISetModalShowAction<typeof SET_LOGIN_MODAL_SHOW> {}
export function setLoginModalShow(show: boolean): ISetLoginModalShowAction {
  return {
    type: SET_LOGIN_MODAL_SHOW,
    show,
  };
}

export const SET_REGISTER_MODAL_SHOW = "SET_REGISTER_MODAL_SHOW";
export interface ISetRegisterModalShowAction extends ISetModalShowAction<typeof SET_REGISTER_MODAL_SHOW> {}
export function setRegisterModalShow(show: boolean): ISetRegisterModalShowAction {
  return {
    type: SET_REGISTER_MODAL_SHOW,
    show,
  };
}

export const SET_USERINFO_MODAL_SHOW = "SET_USERINFO_MODAL_SHOW";
export interface ISetUserInfoModalShowAction extends ISetModalShowAction<typeof SET_USERINFO_MODAL_SHOW> {}
export function setUserInfoModalShow(show: boolean): ISetUserInfoModalShowAction {
  return {
    type: SET_USERINFO_MODAL_SHOW,
    show,
  };
}

export const SET_USER_MANAGEMENT_MODAL_SHOW = "SET_USER_MANAGEMENT_MODAL_SHOW";
export interface ISetUserManagementModalShowAction extends ISetModalShowAction<typeof SET_USER_MANAGEMENT_MODAL_SHOW> {}
export function setUserManagementModalShow(show: boolean): ISetUserManagementModalShowAction {
  return {
    type: SET_USER_MANAGEMENT_MODAL_SHOW,
    show,
  };
}

export const SET_SYS_LOG_MODAL_SHOW = "SET_SYS_LOG_MODAL_SHOW";
export interface ISetSysLogModalShowAction extends ISetModalShowAction<typeof SET_SYS_LOG_MODAL_SHOW> {}
export function setSysLogModalShow(show: boolean): ISetSysLogModalShowAction {
  return {
    type: SET_SYS_LOG_MODAL_SHOW,
    show,
  };
}

export const SET_ACCESS_LOG_MODAL_SHOW = "SET_ACCESS_LOG_MODAL_SHOW";
export interface ISetAccessLogModalShowAction extends ISetModalShowAction<typeof SET_ACCESS_LOG_MODAL_SHOW> {}
export function setAccessLogModalShow(show: boolean): ISetAccessLogModalShowAction {
  return {
    type: SET_ACCESS_LOG_MODAL_SHOW,
    show,
  };
}

export type ModalAction = ISetLoginModalShowAction | ISetRegisterModalShowAction | ISetUserInfoModalShowAction |
ISetUserManagementModalShowAction | ISetSysLogModalShowAction | ISetAccessLogModalShowAction;
