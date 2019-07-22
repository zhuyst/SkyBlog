import {IPageInfo} from "../../action/common";
import {LIST_SYS_LOG_RESPONSE, SysLogAction} from "../../action/log/sysLog";
import {ISysLog} from "../../api/sysLog";

export type ISysLogState = IPageInfo<ISysLog>;

const initialState: ISysLogState = {
    list: [],
    pageNum: 1,
    pages: 0,
    total: 0,
};

export default function sysLogReducer(state: ISysLogState = initialState, action: SysLogAction): ISysLogState {
    switch (action.type) {
        case LIST_SYS_LOG_RESPONSE:
            return {...state, ...action.page};

        default:
            return state;
    }
}
