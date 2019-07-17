import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducer";

let store = null;

export function initStore(initialState = {}) {
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
