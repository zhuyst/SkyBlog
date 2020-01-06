import {
  ClassifyAction,
  DELETE_CLASSIFY_RESPONSE, INSERT_CLASSIFY_RESPONSE,
  LIST_CLASSIFY_RESPONSE, SET_CLASSIFY_LOADING, SET_CLASSIFY_SHOW, UPDATE_CLASSIFY_RESPONSE,
} from "@/action/article/classify";
import { IClassify } from "@/api/classify";

export interface IClassifyState {
  list: IClassify[];
  loading: boolean;
  show: boolean;
}

const initialState: IClassifyState = {
  list: [],
  loading: true,
  show: false,
};

export default function classifyReducer(state: IClassifyState = initialState, action: ClassifyAction): IClassifyState {
  switch (action.type) {
    case SET_CLASSIFY_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case LIST_CLASSIFY_RESPONSE:
      return {
        ...state,
        list: action.list,
        loading: false,
      };

    case INSERT_CLASSIFY_RESPONSE:
      return {
        ...state,
        list: action.list,
        loading: false,
      };

    case DELETE_CLASSIFY_RESPONSE:
      return {
        ...state,
        list: action.list,
        loading: false,
      };

    case UPDATE_CLASSIFY_RESPONSE:
      return {
        ...state,
        list: action.list,
        loading: false,
      };

    case SET_CLASSIFY_SHOW:
      return {
        ...state,
        show: action.show,
      };

    default:
      return state;
  }
}
