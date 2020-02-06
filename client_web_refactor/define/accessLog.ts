import { IUser } from "@/define/user";

export type AccessCount = number;

export interface IAccessLog {
  id: number;

  accessDate: string;
  ip: string;

  userId: number;
  user: IUser;
}
