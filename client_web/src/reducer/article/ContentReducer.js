import {EDIT_CONTENT, SET_ARTICLE} from "../../action/article/ContentAction";

const initialArticle = {
    id : 0,
    title : "文章标题",
    subTitle : "文章副标题",
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
        default :
            return state;
    }
};

export default ContentReducer