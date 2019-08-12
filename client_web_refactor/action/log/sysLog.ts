import {Action} from "redux";
import {fetchListSysLog, ISysLog} from "../../api/sysLog";
import {IThunkAction} from "../../store";
import {IPageInfo} from "../common";

export const LIST_SYS_LOG_RESPONSE = "LIST_SYS_LOG_RESPONSE";
export interface IListSysLogResponseAction extends Action<typeof LIST_SYS_LOG_RESPONSE> {
    page: IPageInfo<ISysLog>;
}
function listSysLogResponse(page: IPageInfo<ISysLog>): IListSysLogResponseAction {
    return {
        type : LIST_SYS_LOG_RESPONSE,
        page,
    };
}

export function listSysLog(pageNum: number, pageSize: number): IThunkAction<typeof LIST_SYS_LOG_RESPONSE> {
    return async (dispatch) => {
        const result = await fetchListSysLog(pageNum, pageSize);
        dispatch(listSysLogResponse(result.entity));
    };
}

export type SysLogAction = IListSysLogResponseAction;
