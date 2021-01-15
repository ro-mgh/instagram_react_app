import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  VERIFY_REQUEST,
  //   EMAIL_NOT_VERIFIED,
  //   RESET_SUCCESS,
  //   RESET_ERROR,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  authMsgError: "",
  authMsgSuccess: "",
  user: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        authMsgError: "",
        authMsgSuccess: "",
        user: action.payload.user,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        authMsgError: "",
        authMsgSuccess: "",
        user: action.payload.user,
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        user: action.payload.user,
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        authMsgError: "",
        authMsgSuccess: "",
        user: {},
      };
    case SIGNUP_ERROR || SIGNIN_ERROR || SIGNOUT_ERROR:
      return {
        ...state,
        authMsgError: action.payload.authMsgError,
      };
    default:
      return state;
  }
}
