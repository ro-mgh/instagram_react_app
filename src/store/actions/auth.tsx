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

// Signing up with Firebase
export const signupUser = (
  email: string,
  password: string,
  name: string,
  username: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  console.log("AUTH REQUEST");

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
            user.updateProfile({
              displayName: username + "&&" + name,
            });

            user
              .getIdToken(/* forceRefresh */ true)
              .then(async function (idToken) {
                try {
                  const response = await fetch("http://localhost:3000/user", {
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
                  });
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
                    console.error("error adding new user to DB");
                  }
                } catch (e) {
                  console.error("error adding new user to DB", e);
                }
              })
              .catch(function (e) {
                // Handle error
                console.error("error adding new user to DB", e);
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
        .catch(function (error) {
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
        console.log("Data from sign in", data);

        return dispatch({
          type: SIGNIN_SUCCESS,
          payload: {
            authMsgSuccess: "You've been logged in succesfully",
            user: data.user,
          },
        });
        // callback();
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
        dispatch({
          type: SIGNOUT_SUCCESS,
          payload: { authMsgSuccess: "You've been signed out succesfully" },
        });
        dispatch({
          type: GET_USERS,
          payload: { users: {} },
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
