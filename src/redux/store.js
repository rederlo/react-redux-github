import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import * as reducers from '../redux/reducers';

const history = createHistory()
const routeMiddleware = routerMiddleware(history);
const middleare = [thunk, routeMiddleware];

const store = createStore(
    combineReducers({...reducers, router: routerReducer}),
    compose(applyMiddleware(...middleare))
);

export {store, history};
