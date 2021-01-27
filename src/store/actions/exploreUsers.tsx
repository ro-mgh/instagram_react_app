import { GET_USERS, GET_USERS_POSTS } from "./actionTypes";
import firebase from "../../services/firebase";
import { Action } from "redux";
import { RootState } from "../reducers/index";
import { ThunkAction } from "redux-thunk";

export const exploreUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  console.log("I was here");
  try {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async function (idToken) {
        try {
          const response = await fetch("http://localhost:3000/user", {
            method: "get",
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + idToken,
            },
          });
          if (response.ok) {
            const jsonResponse = await response.json();
            console.log("response", jsonResponse);
            dispatch({
              type: GET_USERS,
              payload: { users: jsonResponse },
            });
          } else {
            console.error("error");
          }
        } catch (e) {
          console.error(e);
        }
      })
      .catch(function (error) {
        // Handle error
        console.log(error);
      });
  } catch (e) {
    console.log(e);
  }
};

export const explorePosts = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  console.log("I was here");
  try {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async function (idToken) {
        try {
          const response = await fetch("http://localhost:3000/post", {
            method: "get",
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + idToken,
            },
          });
          if (response.ok) {
            const jsonResponse = await response.json();
            console.log("response", jsonResponse);
            dispatch({
              type: GET_USERS_POSTS,
              payload: { usersPosts: jsonResponse },
            });
          } else {
            console.error("error");
          }
        } catch (e) {
          console.error(e);
        }
      })
      .catch(function (error) {
        // Handle error
        console.log(error);
      });
  } catch (e) {
    console.log(e);
  }
};
