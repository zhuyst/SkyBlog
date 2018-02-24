import {SET_ARTICLE, SET_PREVIOUS_COMMENT} from "../../action/article/ContentAction";
import {GET_ARTICLE_INFO_RESPONSE, INSERT_ARTICLE_RESPONSE, UPDATE_ARTICLE_RESPONSE} from "../../action/article/ArticlesAction";
import {LIST_COMMENTS_RESPONSE} from "../../action/article/ContentAction";
import {concatList} from "../Util";

export const initialArticle = {
    id : 0,
    title : "文章标题",
    sub_title : "文章副标题",

    classify : {
        id : 1,
        name : "未分类"
    },
    classify_id : 0,

    content : {
        text: "#### 文章内容\n`Markdown编辑器`",
        selection: null
    }
};

const initialComments = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0
};

export const initialPreviousComment = {
    id : 0,
    author : {
        id : 0,
        nickname : ""
    },
    content : ""
};

const initialState = {
    comments : initialComments,
    article : initialArticle,
    previous_comment : initialPreviousComment,
    uploadModal_show : false
};

const ContentReducer = (state = initialState,action) => {
    let newList;
    let comments;

    switch(action.type){
        case SET_ARTICLE:
            const article = Object.assign({},state.article,action.article);

            return {
                ...state,
                article : article
            };

        case SET_PREVIOUS_COMMENT:
            return {
                ...state,
                previous_comment : action.previous_comment
            };

        case GET_ARTICLE_INFO_RESPONSE:
            return convert(action,state);

        case INSERT_ARTICLE_RESPONSE:
            return convert(action,state);

        case UPDATE_ARTICLE_RESPONSE:
            return convert(action,state);

        case LIST_COMMENTS_RESPONSE:
            comments = action.comments;
            newList = concatList(comments,state.comments.list);

            return {
                ...state,
                comments : {
                    list: newList,
                    page_num: comments.page_num,
                    pages: comments.pages,
                    total: comments.total
                }
            };
        default :
            return state;
    }
};

const convert = (action,state) => {
    const article = action.article;
    const convertArticle = {
        ...article,
        content: {
            text : article.content,
            selection: null
        }
    };
    return {
        ...state,
        article : convertArticle,
        comments : initialComments,
        previous_comment : initialPreviousComment
    };
};

export default ContentReducer