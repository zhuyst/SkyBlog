import {IPageInfo} from "../../action/common";
import {IUser} from "../auth";
import {ACCESS_LOG_URL, httpGet, IApiResult} from "../index";

export type AccessCount = number;

export function fetchGetAccessCount(): Promise<IApiResult<AccessCount>> {
    return httpGet<AccessCount>(`${ACCESS_LOG_URL}/public/total/`);
}

export interface IAccessLog {
    id: number;

    accessDate: string;
    ip: string;

    userId: number;
    user: IUser;
}

export function fetchListAccessLog(pageNum: number, pageSize: number): Promise<IApiResult<IPageInfo<IAccessLog>>> {
    return httpGet<IPageInfo<IAccessLog>>(`${ACCESS_LOG_URL}/list/`, {
        pageNum, pageSize,
    });
}
