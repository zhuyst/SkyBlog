import {LIST_SYS_LOG_RESPONSE} from "../../action/syslog/SysLogAction";

const initialState = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0,
};

const SysLogReducer = (state = initialState,action) =>{
    switch (action.type){
        case LIST_SYS_LOG_RESPONSE:
            return Object.assign({},state,action.page);

        default:
            return state
    }
};

export default SysLogReducer