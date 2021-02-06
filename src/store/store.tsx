// SETTING UP REDUX STORE
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { reducers } from "./reducers";
import { verifyAuth } from "./actions/auth";

const initialState = {};

// connecting to redux devtools
const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(reduxThunk));
const store = createStore(reducers, initialState, enhancer);

// dispatching authorization on app launch
store.dispatch<any>(verifyAuth());

export default store;
