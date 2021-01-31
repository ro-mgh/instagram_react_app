import {
  GET_USERS,
  // GET_USER,
  // GET_USERS_POSTS,
  // GET_USER_POSTS,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  // user: {},
  users: {},
  // usersPosts: [],
  // userPosts: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    // case GET_USER:
    //   return {
    //     ...state,
    //     user: action.payload.user,
    //   };
    // case GET_USERS_POSTS:
    //   return {
    //     ...state,
    //     usersPosts: action.payload.usersPosts,
    //   };
    // case GET_USER_POSTS:
    //   return {
    //     ...state,
    //     userPosts: action.payload.userPosts,
    //   };
    default:
      return state;
  }
}
