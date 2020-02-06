import { Action } from "redux";
import { IPageInfo } from "@/define/common";
import { IUser } from "@/define/user";
import { IApiResult } from "@/api";

export const REGISTER_USER_RESPONSE = "REGISTER_USER_RESPONSE";
export interface IRegisterUserResponseAction extends Action<typeof REGISTER_USER_RESPONSE> {}

export const LIST_USERS_RESPONSE = "LIST_USERS_RESPONSE";
export interface IListUsersResponseAction extends Action<typeof LIST_USERS_RESPONSE> {
  page: IPageInfo<IUser>;
}

export const DELETE_USER_RESPONSE = "DELETE_USER_RESPONSE";
export interface IDeleteUserResponseAction extends Action<typeof DELETE_USER_RESPONSE> {
  result: IApiResult;
}

export const GET_USER_INFO_RESPONSE = "GET_USER_INFO_RESPONSE";
export interface IGetUserInfoResponseAction extends Action<typeof GET_USER_INFO_RESPONSE> {
  user: IUser;
}

export const UPDATE_USER_INFO_RESPONSE = "UPDATE_USER_INFO_RESPONSE";
export interface IUpdateUserInfoResponseAction extends Action<typeof UPDATE_USER_INFO_RESPONSE> {
  user: IUser;
}

export const UPDATE_USER_ROLE_RESPONSE = "UPDATE_USER_ROLE_RESPONSE";
export interface IUpdateUserRoleResponseAction extends Action<typeof UPDATE_USER_ROLE_RESPONSE> {
  result: IApiResult;
}

export const UPDATE_USER_STATUS_RESPONSE = "UPDATE_USER_STATUS_RESPONSE";
export interface IUpdateUserStatusResponseAction
  extends Action<typeof UPDATE_USER_STATUS_RESPONSE> {
  result: IApiResult;
}

export type UserAction = IListUsersResponseAction;
