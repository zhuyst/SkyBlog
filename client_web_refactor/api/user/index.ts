import { IPageInfo } from "@/define/common";
import {
  httpDelete, httpGet, httpPatch, httpPost, httpPut, IApiResult, USER_API_URL,
} from "@/api";
import { IAuthResponse } from "@/define/auth";
import {
  IUser, Role, Status,
} from "@/define/user";

export function fetchRegisterUser(user: IUser): Promise<IApiResult<IAuthResponse>> {
  return httpPost<IAuthResponse>(`${USER_API_URL}/public/`, user);
}

export function fetchListUsers(pageNum: number, pageSize: number)
  : Promise<IApiResult<IPageInfo<IUser>>> {
  return httpGet(`${USER_API_URL}/list/`, {
    pageNum, pageSize,
  });
}

export function fetchDeleteUser(id: number): Promise<IApiResult> {
  return httpDelete(`${USER_API_URL}/${id}`);
}

export function fetchGetUserInfo(id: number): Promise<IApiResult<IUser>> {
  return httpGet<IUser>(`${USER_API_URL}/${id}`);
}

export function fetchUpdateUserInfo(user: IUser): Promise<IApiResult<IUser>> {
  return httpPut<IUser>(`${USER_API_URL}/${user.id}`);
}

export function fetchUpdateUserRole(id: number, roleId: Role): Promise<IApiResult> {
  return httpPatch(`${USER_API_URL}/role/${id}`, {
    roleId,
  });
}

export function fetchUpdateUserStatus(id: number, statusId: Status): Promise<IApiResult> {
  return httpPatch(`${USER_API_URL}/status/${id}`, {
    statusId,
  });
}
