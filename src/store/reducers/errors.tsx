import { SET_ERROR, CLEAR_ERROR } from "../actions/actionTypes";

const INITIAL_STATE = {
  error: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
}
