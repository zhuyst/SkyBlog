import {IPageInfo} from "../../action/common";
import {httpGet, IApiResult, IBaseEntity, SYS_LOG_URL} from "../index";
import {IUser} from "../user";

export interface ISysLog extends IBaseEntity {
    createDate: number;

    method: string;
    params: string;
    resource: string;
    type: string;

    userId: number;
    user: IUser;
}

export function fetchListSysLog(pageNum: number, pageSize: number): Promise<IApiResult<IPageInfo<ISysLog>>> {
    return httpGet<IPageInfo<ISysLog>>(`${SYS_LOG_URL}/list/`, {
        pageNum, pageSize,
    });
}
