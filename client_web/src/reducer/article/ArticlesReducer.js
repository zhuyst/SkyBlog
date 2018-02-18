import {LIST_ARTICLES_BY_CLASSIFY_RESPONSE, LIST_ARTICLES_RESPONSE} from "../../action/article/ArticlesAction";
import {concatList} from "../Util";

const initialClassify = {
    id : 0,
    name : ""
};

const initialState = {
    page : {
        list : [],
        page_num : 1,
        pages : 0,
        total : 0,
    },
    classify : initialClassify
};

const ArticlesReducer = (state = initialState,action) => {
    let page;
    let newList;

    switch (action.type){
        case LIST_ARTICLES_RESPONSE:
            page = action.page;
            newList = concatList(page,state.page.list);

            return {
                ...state,
                page : {
                    list : newList,
                    page_num : page.page_num,
                    pages : page.pages,
                    total : page.total
                },
                classify : initialClassify
            };

        case LIST_ARTICLES_BY_CLASSIFY_RESPONSE:
            const vo = action.vo;
            page = vo.articles;
            newList = concatList(page,state.page.list);

            return {
                ...state,
                page :{
                    list : newList,
                    page_num : page.page_num,
                    pages : page.pages,
                    total : page.total,
                },
                classify : vo.classify
            };

        default :
            return state;
    }
};

export default ArticlesReducer