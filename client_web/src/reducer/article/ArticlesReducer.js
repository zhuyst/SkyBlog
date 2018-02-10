import {LIST_ARTICLES_RESPONSE} from "../../action/ArticlesAction";

const initialState = {
    list : [],
    pageNum : 1,
    pages : 0,
    total : 0
};

const ArticlesReducer = (state = initialState,action) => {
    switch (action.type){
        case LIST_ARTICLES_RESPONSE:
            const page = action.page;
            const newList = state.list.concat(page.list);

            return {
                ...state,
                list : newList,
                pageNum : page.page_num,
                pages : page.pages,
                total : page.total
            };
        default :
            return state;
    }
};

export default ArticlesReducer