import { IPageInfo } from "@/action/common";
import {
  LIST_MSG_RESPONSE, MsgBoardAction, SET_MSG_LOADING, SET_PREVIOUS_MSG,
} from "@/action/msgBoard";
import { IMsg } from "@/api/msgBoard";
import { initialPreviousComment } from "../article/comments";
import { concatList } from "../util";

export interface IMsgBoardState {
  page: IPageInfo<IMsg>;
  loading: boolean;
  previousMsg: IMsg;
}

const initialState: IMsgBoardState = {
  page: {
    list: [],
    pageNum: 1,
    pages: 0,
    total: 0,
  },
  loading: true,
  previousMsg: initialPreviousComment,
};

export default function msgBoardReducer(state: IMsgBoardState = initialState, action: MsgBoardAction): IMsgBoardState {
  switch (action.type) {
    case SET_MSG_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SET_PREVIOUS_MSG:
      return {
        ...state,
        previousMsg: action.msg,
      };

    case LIST_MSG_RESPONSE:
      const { page } = action;
      const newList = concatList(page, state.page.list);

      return {
        ...state,
        loading: false,
        page: {
          list: newList,
          pageNum: page.pageNum,
          pages: page.pages,
          total: page.total,
        },
      };
    default:
      return state;
  }
}