import {
    CommentAction,
    LIST_COMMENTS_RESPONSE,
    SET_COMMENTS_LOADING,
    SET_PREVIOUS_COMMENT,
} from "../../action/article/comment";
import {IPageInfo} from "../../action/common";
import {IComment} from "../../api/article/comment";
import {concatList} from "../util";

export interface ICommentsState {
    comments: IPageInfo<IComment>;
    loading: boolean;
    previousComment: IComment;
}

const initialComments: IPageInfo<IComment> = {
    list: [],
    pageNum : 1,
    pages : 0,
    total : 0,
};

export const initialPreviousComment: IComment = {
    id : 0,
    author : {
        id : 0,
        username: "",
        nickname : "",
    },
    content : "",
};

const initialState: ICommentsState = {
    comments : initialComments,
    loading : true,
    previousComment : initialPreviousComment,
};

export default function commentsReducer(state: ICommentsState = initialState, action: CommentAction): ICommentsState {
    switch (action.type) {
        case SET_PREVIOUS_COMMENT:
            return {
                ...state,
                previousComment : action.comment,
            };

        case SET_COMMENTS_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case LIST_COMMENTS_RESPONSE:
            const { comments } = action;
            const newList = concatList(comments, state.comments.list);

            return {
                ...state,
                loading: false,
                comments : {
                    list: newList,
                    pageNum: comments.pageNum,
                    pages: comments.pages,
                    total: comments.total,
                },
            };
        default :
            return state;
    }
}
