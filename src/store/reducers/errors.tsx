import { SET_ERROR, CLEAR_ERROR } from "../actions/actionTypes";

import { ErrorType, ErrorInitialState } from "../types/types";

const INITIAL_STATE = {
  error: "",
};

export default function (
  state = INITIAL_STATE,
  action: ErrorType
): ErrorInitialState {
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
