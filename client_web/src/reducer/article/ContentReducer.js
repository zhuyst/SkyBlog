import {SET_ARTICLE} from "../../action/article/ContentAction";
import {GET_ARTICLE_INFO_RESPONSE, INSERT_ARTICLE_RESPONSE, UPDATE_ARTICLE_RESPONSE} from "../../action/ArticlesAction";
import {LIST_COMMENTS_RESPONSE} from "../../action/article/ContentAction";
import {concatList} from "../Util";

export const initialArticle = {
    id : 0,
    title : "文章标题",
    sub_title : "文章副标题",

    classify : null,
    classify_id : 0,

    content : {
        text: "#### 文章内容\n`Markdown编辑器`",
        selection: null
    }
};

export const initialComments = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0
};

const initialState = () => {
    return Object.assign({
        comments : initialComments
    },initialArticle)
};

const ContentReducer = (state = initialState(),action) => {
    let newList;
    let comments;

    switch(action.type){
        case SET_ARTICLE:
            return Object.assign({},state,action.article);

        case GET_ARTICLE_INFO_RESPONSE || INSERT_ARTICLE_RESPONSE || UPDATE_ARTICLE_RESPONSE:
            const article = action.article;
            const convertArticle = {
                ...article,
                content: {
                    text : article.content,
                    selection: null
                }
            };
            return Object.assign({},state,convertArticle,{
                comments : initialComments
            });

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

export default ContentReducer