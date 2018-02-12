import {EDIT_CONTENT, SET_ARTICLE} from "../../action/article/ContentAction";
import {GET_ARTICLE_INFO_RESPONSE, INSERT_ARTICLE_RESPONSE, UPDATE_ARTICLE_RESPONSE} from "../../action/ArticlesAction";

export const initialArticle = {
    id : 0,
    title : "文章标题",
    sub_title : "文章副标题",
    content : {
        text: "#### 文章内容\n`Markdown编辑器`",
        selection: null
    }
};

const initialState = {
    article : initialArticle,
};

const convert = action => {
    const article = action.article;
    return {
        ...article,
        content: {
            text : article.content,
            selection: null
        }
    }
};

const ContentReducer = (state = initialState,action) => {
    switch(action.type){
        case SET_ARTICLE:
            return {
                ...state,
                article : action.article
            };
        case GET_ARTICLE_INFO_RESPONSE:
            return {
                ...state,
                article : convert(action)
            };
        case INSERT_ARTICLE_RESPONSE:
            return {
                ...state,
                article : convert(action)
            };
        case UPDATE_ARTICLE_RESPONSE:
            return {
                ...state,
                article : convert(action)
            };
        default :
            return state;
    }
};

export default ContentReducer