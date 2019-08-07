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

export interface IThunkAction<T = string> extends ThunkAction<void, IAppState, null, Action<T>> {}
export interface IThunkDispatch<T = string> extends ThunkDispatch<IAppState, null, Action<T>> {}
