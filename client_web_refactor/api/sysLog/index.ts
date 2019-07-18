import {IPageInfo} from "../../action/common";
import {IUser} from "../auth";
import {httpGet, IApiResult, SYS_LOG_URL} from "../index";

export interface ISysLog {
    id: number;
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
