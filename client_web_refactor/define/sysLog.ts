import { IBaseEntity } from "@/define/common";
import { IUser } from "@/define/user";

export interface ISysLog extends IBaseEntity {
  createDate: number;

  method: string;
  params: string;
  resource: string;
  type: string;

  userId: number;
  user: IUser;
}
