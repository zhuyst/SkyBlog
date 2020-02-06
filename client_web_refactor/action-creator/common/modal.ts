import {
  ISetAccessLogModalShowAction,
  ISetLoginModalShowAction,
  ISetRegisterModalShowAction,
  ISetSysLogModalShowAction,
  ISetUserInfoModalShowAction,
  ISetUserManagementModalShowAction, SET_ACCESS_LOG_MODAL_SHOW,
  SET_LOGIN_MODAL_SHOW,
  SET_REGISTER_MODAL_SHOW, SET_SYS_LOG_MODAL_SHOW,
  SET_USER_MANAGEMENT_MODAL_SHOW,
  SET_USERINFO_MODAL_SHOW,
} from "@/action/common/modal";

export function setLoginModalShow(show: boolean): ISetLoginModalShowAction {
  return {
    type: SET_LOGIN_MODAL_SHOW,
    show,
  };
}

export function setRegisterModalShow(show: boolean): ISetRegisterModalShowAction {
  return {
    type: SET_REGISTER_MODAL_SHOW,
    show,
  };
}

export function setUserInfoModalShow(show: boolean): ISetUserInfoModalShowAction {
  return {
    type: SET_USERINFO_MODAL_SHOW,
    show,
  };
}

export function setUserManagementModalShow(show: boolean): ISetUserManagementModalShowAction {
  return {
    type: SET_USER_MANAGEMENT_MODAL_SHOW,
    show,
  };
}

export function setSysLogModalShow(show: boolean): ISetSysLogModalShowAction {
  return {
    type: SET_SYS_LOG_MODAL_SHOW,
    show,
  };
}

export function setAccessLogModalShow(show: boolean): ISetAccessLogModalShowAction {
  return {
    type: SET_ACCESS_LOG_MODAL_SHOW,
    show,
  };
}
