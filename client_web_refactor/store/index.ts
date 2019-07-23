import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducer";
import {IAboutState} from "../reducer/about";
import {IArticlesState} from "../reducer/article/articles";
import {IClassifyState} from "../reducer/article/classify";
import {ICommentsState} from "../reducer/article/comments";
import {IUploadState} from "../reducer/article/upload";
import {ILoginState} from "../reducer/common/login";
import {IModalState} from "../reducer/common/modal";
import {IGithubState} from "../reducer/github";
import {IAccessLogState} from "../reducer/log/accessLog";
import {ISysLogState} from "../reducer/log/sysLog";
import {IMsgBoardState} from "../reducer/msgBoard";
import {IUserState} from "../reducer/user";

export interface IAppState {
    [key: string]: any;

    about?: IAboutState;

    article?: IAboutState;
    articles?: IArticlesState;
    classify?: IClassifyState;
    comments?: ICommentsState;
    upload?: IUploadState;

    login?: ILoginState;
    modal?: IModalState;

    github?: IGithubState;

    accessLog?: IAccessLogState;
    sysLog?: ISysLogState;

    user?: IUserState;
    msgBoard?: IMsgBoardState;
}

let store = null;

export function initStore(initialState: IAppState = {}) {
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

export default store;
