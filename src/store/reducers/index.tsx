import { combineReducers } from "redux";
import authReducer from "./auth";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  firebaseReducer,
  authReducer,
});
