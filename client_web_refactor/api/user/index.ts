import {IPageInfo} from "../../action/common";
import {httpDelete, httpGet, httpPatch, httpPost, httpPut, IApiResult, IBaseEntity, USER_API_URL} from "../index";

export type Role = number;
export type Status = number;

export interface IUser extends IBaseEntity {
    username: string;
    nickname: string;
    password?: string;
    admin: boolean;
    role?: Role;
    status?: Status;
}

interface IUserRole {
    [key: string]: {
        id: Role;
        name: string;
    };
}

export const UserRole: IUserRole = {
    SYS_ADMIN : {
        id : 1,
        name : "系统管理员",
    },
    ADMIN : {
        id : 2,
        name : "管理员",
    },
    VISITOR : {
        id : 3,
        name : "访客",
    },
};

interface IUserStatus {
    [key: string]: {
        id: Status;
        name: string;
    };
}

export const UserStatus: IUserStatus = {
    NORMAL : {
        id : 0,
        name : "正常",
    },
    LOCKED : {
        id : 1,
        name : "锁定",
    },
};

export function fetchRegisterUser(user: IUser): Promise<IApiResult> {
    return httpPost(`${USER_API_URL}/public/`, user);
}

export function fetchListUsers(pageNum: number, pageSize: number): Promise<IApiResult<IPageInfo<IUser>>> {
    return httpGet(`${USER_API_URL}/list/`);
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
