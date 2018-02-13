import {LIST_ARTICLES_RESPONSE} from "../../action/ArticlesAction";
import {concatList} from "../Util";

const initialState = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0
};

const ArticlesReducer = (state = initialState,action) => {
    switch (action.type){
        case LIST_ARTICLES_RESPONSE:
            const page = action.page;
            const newList = concatList(page,state.list);

            return {
                ...state,
                list : newList,
                page_num : page.page_num,
                pages : page.pages,
                total : page.total
            };

        default :
            return state;
    }
};

export default ArticlesReducer