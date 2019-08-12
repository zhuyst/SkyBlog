import {Action, AnyAction} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {IAppState} from "../store";

export interface IPageInfo<T> {
    list: T[];
    pageNum: number;
    pageSize?: number;
    pages: number;
    total: number;
}
