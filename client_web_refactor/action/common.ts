import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {IAppState} from "../store";

export interface IPageInfo<T> {
    list: T[];
    pageNum: number;
    pageSize?: number;
    pages: number;
    total: number;
}

export interface IThunkAction<T = string> extends ThunkAction<void, IAppState, null, Action<T>> {}
