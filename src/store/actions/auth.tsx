import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  VERIFY_REQUEST,
  GET_USERS,
} from "./actionTypes";
import firebase from "../../services/firebase";
import { Action } from "redux";
import { RootState } from "../reducers/index";
import { ThunkAction } from "redux-thunk";
import queryClient from "../../utils/queryClient";

// Signing up with Firebase
export const signupUser = (
  email: string,
  password: string,
  name: string,
  username: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  if (password.length < 6) {
    return dispatch({
      type: SIGNUP_ERROR,
      payload: {
        authMsgError: "Password length should be at least 6 characters",
      },
    });
  } else {
    try {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          console.log("data before email", data);

          const user = firebase.auth().currentUser;
          if (user) {
            // updating profile info

            user.updateProfile({
              displayName: username + "&&" + name,
            });

            user
              .getIdToken(/* forceRefresh */ true)
              .then(async function (idToken) {
                // adding user to DB

                try {
                  const response = await fetch(
                    "https://insta-byrm-server.me.uk/user",
                    {
                      method: "post",
                      headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + idToken,
                      },
                      body: JSON.stringify({
                        email: email,
                        username: username,
                        name: name,
                        id: user.uid + "",
                      }),
                    }
                  );
                  if (response.ok) {
                    // const jsonResponse = await response.json();
                    // console.log(jsonResponse);
                    return dispatch({
                      type: SIGNUP_SUCCESS,
                      payload: {
                        authMsgSuccess:
                          "Your account was successfully created!",
                        user,
                      },
                    });
                  } else {
                    user.delete();
                    return dispatch({
                      type: SIGNUP_ERROR,
                      payload: {
                        authMsgError: "Error adding new user to DB",
                      },
                    });
                  }
                } catch (e) {
                  user.delete();
                  return dispatch({
                    type: SIGNUP_ERROR,
                    payload: {
                      authMsgError: "Error adding new user to DB",
                    },
                  });
                }
              })
              .catch(function () {
                user.delete();
                return dispatch({
                  type: SIGNUP_ERROR,
                  payload: {
                    authMsgError: "Error adding new user to DB",
                  },
                });
              });
          } else {
            dispatch({
              type: SIGNUP_ERROR,
              payload: {
                authMsgError:
                  "Something went wrong, we couldn't create your account. Please try again.",
              },
            });
          }
        })
        .catch(function () {
          dispatch({
            type: SIGNUP_ERROR,
            payload: {
              authMsgError:
                "Something went wrong, we couldn't create your account. Please try again.",
            },
          });
        });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SIGNUP_ERROR,
        payload: {
          authMsgError:
            "Something went wrong, we couldn't create your account. Please try again.",
        },
      });
    }
  }
};

// Signing in with Firebase
export const signinUser = (
  email: string,
  password: string
  // ,callback
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        return dispatch({
          type: SIGNIN_SUCCESS,
          payload: {
            authMsgSuccess: "You've been logged in succesfully",
            user: data.user,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: SIGNIN_ERROR,
          payload: {
            authMsgError: "Invalid login credentials. Please try again.",
          },
        });
      });
  } catch (err) {
    dispatch({
      type: SIGNIN_ERROR,
      payload: { authMsgError: "Invalid login credentials. Please try again." },
    });
  }
};

// Signing out with Firebase
export const signoutUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // clearing redux
        dispatch({
          type: GET_USERS,
          payload: { users: {} },
        });
        // clearing cashe
        queryClient.clear();
        dispatch({
          type: SIGNOUT_SUCCESS,
          payload: { authMsgSuccess: "You've been signed out succesfully" },
        });
      })
      .catch(() => {
        dispatch({
          type: SIGNOUT_ERROR,
          payload: { authMsgError: "Signout error. Please try again." },
        });
      });
  } catch (err) {
    dispatch({
      type: SIGNOUT_ERROR,
      payload: { authMsgError: "Signout error. Please try again." },
    });
  }
};

export const verifyAuth = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        dispatch({
          type: VERIFY_REQUEST,
          payload: { user },
        });
      }
    });
  } catch {}
};
