import {ARTICLE_CHANGE_PAGE} from "../../action/article/ArticlesAction";

const initialState = {
    articles_pageNum : 1
};

const ArticleReducer = (state = initialState,action) => {
    switch (action.type){
        case ARTICLE_CHANGE_PAGE :
            return {
                ...state,
                articles_pageNum: action.articles_pageNum
            };
        default :
            return state;
    }
};

export default ArticleReducer