import {SET_ARTICLE} from "../../action/article/ContentAction";
import {GET_ARTICLE_INFO_RESPONSE, INSERT_ARTICLE_RESPONSE, UPDATE_ARTICLE_RESPONSE} from "../../action/ArticlesAction";
import {
    DELETE_COMMENT_RESPONSE, INSERT_COMMENT_RESPONSE,
    LIST_COMMENTS_RESPONSE
} from "../../action/article/CommentAction";
import {concatList} from "../Util";

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
    comments : {
        list : [],
        page_num : 1,
        pages : 0,
        total : 0
    }
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
        case INSERT_COMMENT_RESPONSE:
            return {
                ...state
            };
        case LIST_COMMENTS_RESPONSE:
            const comments = action.comments;
            const newList = concatList(comments,state.comments.list);

            return {
                ...state,
                comments : {
                    list: newList,
                    page_num: comments.page_num,
                    page_size: comments.page_size,
                    total: comments.total
                }
            };
        case DELETE_COMMENT_RESPONSE:
            return {
                ...state
            };
        default :
            return state;
    }
};

export default ContentReducer