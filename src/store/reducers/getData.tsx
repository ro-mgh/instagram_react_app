import { GET_USERS } from "../actions/actionTypes";

import { DataType, DataInitialState } from "../types/types";

const INITIAL_STATE = {
  users: {},
};

export default function (
  state = INITIAL_STATE,
  action: DataType
): DataInitialState {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
}
