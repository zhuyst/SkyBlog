import { useSelector } from "react-redux";
import {
  Action, applyMiddleware, createStore, Store,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import reducer from "@/reducer";
import { IAboutState } from "@/reducer/about";
import { IArticlesState } from "@/reducer/article/articles";
import { IClassifyState } from "@/reducer/article/classify";
import { ICommentsState } from "@/reducer/article/comments";
import { IUploadState } from "@/reducer/article/upload";
import { ILoginState } from "@/reducer/common/login";
import { IModalState } from "@/reducer/common/modal";
import { IGithubState } from "@/reducer/github";
import { IAccessLogState } from "@/reducer/log/accessLog";
import { ISysLogState } from "@/reducer/log/sysLog";
import { IMsgBoardState } from "@/reducer/msgBoard";
import { IUserState } from "@/reducer/user";

export interface IAppState {
  [key: string]: any;

  about: IAboutState;

  article: IAboutState;
  articles: IArticlesState;
  classify: IClassifyState;
  comments: ICommentsState;
  upload: IUploadState;

  login: ILoginState;
  modal: IModalState;

  github: IGithubState;

  accessLog: IAccessLogState;
  sysLog: ISysLogState;

  user: IUserState;
  msgBoard: IMsgBoardState;
}

export interface IAppStore extends Store<IAppState> {
  dispatch: IThunkDispatch;
}

let store: IAppStore = null;

export function initStore(initialState): IAppStore {
  if (store) {
    return store;
  }
  store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
  return store;
}

export function useStoreSelector<TSelected>(
  selector: (state: IAppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
)
  : TSelected {
  return useSelector<IAppState, TSelected>(selector, equalityFn);
}

export interface IThunkAction<T = string> extends ThunkAction<void, IAppState, null, Action<T>> {}
export interface IThunkDispatch<T = string> extends ThunkDispatch<IAppState, null, Action<T>> {}

export default store;
