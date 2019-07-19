import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducer";
import {IAboutState} from "../reducer/about";
import {ILoginState} from "../reducer/common/login";
import {IModalState} from "../reducer/common/modal";
import {IGithubState} from "../reducer/github";

export interface IAppState {
    [key: string]: any;

    about?: IAboutState;
    login?: ILoginState;
    modal?: IModalState;
    github?: IGithubState;
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
