import {LIST_MSG_RESPONSE, SET_MSG_LOADING, SET_PREVIOUS_MSG} from "../../action/msgboard/MsgBoardAction";
import {concatList} from "../Util";
import {initialPreviousComment} from "../article/ContentReducer";

const initialState = {
    page : {
        list : [],
        page_num : 1,
        pages : 0,
        total : 0
    },
    loading : true,
    previous_comment : initialPreviousComment
};

const MsgBoardReducer = (state = initialState,action) =>{
    switch (action.type){
        case SET_MSG_LOADING:
            return {
                ...state,
                loading: action.loading
            };

        case SET_PREVIOUS_MSG:
            return {
                ...state,
                previous_comment : action.previous_comment
            };

        case LIST_MSG_RESPONSE:
            const page = action.page;
            const newList = concatList(page,state.page.list);

            return {
                ...state,
                loading: false,
                page : {
                    list : newList,
                    page_num : page.page_num,
                    pages : page.pages,
                    total : page.total
                }
            };
        default:
            return state;
    }
};

export default MsgBoardReducer