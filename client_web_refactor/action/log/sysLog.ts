import {Action, Dispatch} from "redux";
import {fetchListSysLog, ISysLog} from "../../api/sysLog";
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

export function listSysLog(pageNum: number, pageSize: number) {
    return async (dispatch: Dispatch) => {
        const result = await fetchListSysLog(pageNum, pageSize);
        dispatch(listSysLogResponse(result.entity));
    };
}
