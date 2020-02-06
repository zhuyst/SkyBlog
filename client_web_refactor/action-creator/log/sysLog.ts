import { fetchListSysLog } from "@/api/sysLog";
import { IThunkAction } from "@/store";
import { IPageInfo } from "@/define/common";
import { IListSysLogResponseAction, LIST_SYS_LOG_RESPONSE } from "@/action/log/sysLog";
import { ISysLog } from "@/define/sysLog";

function listSysLogResponse(page: IPageInfo<ISysLog>): IListSysLogResponseAction {
  return {
    type: LIST_SYS_LOG_RESPONSE,
    page,
  };
}

export function listSysLog(pageNum: number, pageSize: number)
  : IThunkAction<typeof LIST_SYS_LOG_RESPONSE> {
  return async (dispatch) => {
    const result = await fetchListSysLog(pageNum, pageSize);
    dispatch(listSysLogResponse(result.entity));
  };
}
