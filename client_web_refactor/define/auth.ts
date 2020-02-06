import { IUser } from "@/define/user";

export type Token = string;

export interface IAccessToken {
  token: Token;
  expire: number;
}

export interface IAuthResponse extends IAccessToken {
  user: IUser;
}
