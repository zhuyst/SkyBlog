import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import AppReducer from '../reducer/AppReducer'

export const history = createHistory();

const router = routerMiddleware(history);

const store = createStore(AppReducer,
    applyMiddleware(router,thunk));

export const dispatch = (action) => {
    store.dispatch(action)
};

export default store;