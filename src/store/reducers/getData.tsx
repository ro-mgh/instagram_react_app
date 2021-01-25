import { GET_USERS } from "../actions/actionTypes";

const INITIAL_STATE = {
  user: [],
  users: [],
  usersPosts: [],
  userPosts: [],
};

export default function (state = INITIAL_STATE, action) {
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
