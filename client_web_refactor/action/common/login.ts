import { Action } from "redux";
import { IUser } from "@/define/user";
import { IUpdateUserInfoResponseAction } from "../user";

export const LOGIN_CLEAR = "LOGIN_CLEAR";
export interface ILoginClearAction extends Action<typeof LOGIN_CLEAR> {
}

export const SET_LOGIN_USER = "SET_LOGIN_USER";
export interface ISetLoginUserAction extends Action<typeof SET_LOGIN_USER> {
  user: IUser;
}

export enum LoginStatus {
  NONE, SUCCESS, ERROR
}

export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export interface ILoginResponseAction extends Action<typeof LOGIN_RESPONSE> {
  status: LoginStatus;
  message: string;
}

export const SET_MANAGEMENT = "SET_MANAGEMENT";
export interface ISetManagementAction extends Action<typeof SET_MANAGEMENT> {
  management: boolean;
}

export type LoginAction = ISetManagementAction | ILoginClearAction | ILoginResponseAction |
ISetLoginUserAction | IUpdateUserInfoResponseAction;
