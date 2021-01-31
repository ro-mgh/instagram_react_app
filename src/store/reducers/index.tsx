import { combineReducers } from "redux";
import authReducer from "./auth";
import dataReducer from "./getData";
import errorReducer from "./errors";
import { firebaseReducer } from "react-redux-firebase";

export const reducers = combineReducers({
  firebaseReducer,
  authReducer,
  dataReducer,
  errorReducer,
});

export type RootState = ReturnType<typeof reducers>;
