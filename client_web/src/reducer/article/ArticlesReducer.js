import {LIST_ARTICLES_RESPONSE} from "../../action/ArticlesAction";

const initialState = {
    articles : []
};

const ArticleReducer = (state = initialState,action) => {
    switch (action.type){
        case LIST_ARTICLES_RESPONSE:
            const articles = state.articles;
            articles.push(action.articles);
            return {
                ...state,
                articles:articles
            };
        default :
            return state;
    }
};

export default ArticleReducer