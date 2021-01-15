// SETTING UP REDUX STORE

import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

// const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(
//   createStore
// );
// const store = createStoreWithFirebase(
//   reducers,
//   // typeof window === "object" &&
//   //   typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
//   //   ? window.__REDUX_DEVTOOLS_EXTENSION__()
//   //   : (f) => f,
//   {},
//   applyMiddleware(reduxThunk)
// );

// const initialState = {};

// const store = createStore(
//   reducers,
//   initialState,
//   typeof window === "object" &&
//     typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
//     ? window.__REDUX_DEVTOOLS_EXTENSION__()
//     : (f) => f,
//   applyMiddleware(reduxThunk)
// );

const initialState = {};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(reduxThunk));
const store = createStore(reducers, initialState, enhancer);

export default store;
