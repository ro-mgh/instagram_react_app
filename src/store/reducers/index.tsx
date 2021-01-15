import { combineReducers } from "redux";
import authReducer from "./auth";
import { firebaseReducer } from "react-redux-firebase";

export const reducers = combineReducers({
  firebaseReducer,
  authReducer,
});

export type RootState = ReturnType<typeof reducers>;
