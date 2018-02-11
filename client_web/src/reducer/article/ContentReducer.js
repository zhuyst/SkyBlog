import {EDIT_CONTENT, SET_ARTICLE} from "../../action/article/ContentAction";
import {GET_ARTICLE_INFO_RESPONSE} from "../../action/ArticlesAction";

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
    editing : false
};

const ContentReducer = (state = initialState,action) => {
    switch(action.type){
        case EDIT_CONTENT :
            return {
                ...state,
                editing : action.editing
            };
        case SET_ARTICLE:
            return {
                ...state,
                article : action.article
            };
        case GET_ARTICLE_INFO_RESPONSE:
            let article = action.article;
            article = {
                ...article,
                content: {
                    text : article.content,
                    selection: null
                }
            };
            return {
                ...state,
                article : article
            };
        default :
            return state;
    }
};

export default ContentReducer