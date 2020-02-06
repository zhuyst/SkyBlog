import { IBaseEntity } from "@/define/common";

export type Role = number;
export type Status = number;

export interface IUser extends IBaseEntity {
  username: string;
  nickname: string;
  password?: string;
  admin?: boolean;
  role?: Role;
  status?: Status;
}

export interface IUserRole {
  [key: string]: {
    id: Role;
    name: string;
  };
}

export interface IUserStatus {
  [key: string]: {
    id: Status;
    name: string;
  };
}

export const UserRole: IUserRole = {
  SYS_ADMIN: {
    id: 1,
    name: "系统管理员",
  },
  ADMIN: {
    id: 2,
    name: "管理员",
  },
  VISITOR: {
    id: 3,
    name: "访客",
  },
};

export const UserStatus: IUserStatus = {
  NORMAL: {
    id: 0,
    name: "正常",
  },
  LOCKED: {
    id: 1,
    name: "锁定",
  },
};
