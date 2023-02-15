import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers/root_reducer";

const middleware = process.env.NODE_ENV === 'development' ?
  applyMiddleware(thunk, logger) : applyMiddleware(thunk);

const configureStore = (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, middleware);

export default configureStore;