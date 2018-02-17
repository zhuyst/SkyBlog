import {LIST_MSG_RESPONSE} from "../../action/msgboard/MsgBoardAction";
import {concatList} from "../Util";

const initialState = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0
};

const MsgBoardReducer = (state = initialState,action) =>{
    switch (action.type){
        case LIST_MSG_RESPONSE:
            const page = action.page;
            const newList = concatList(page,state.list);

            return {
                ...state,
                list : newList,
                page_num : page.page_num,
                pages : page.pages,
                total : page.total
            };
        default:
            return state;
    }
};

export default MsgBoardReducer