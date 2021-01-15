import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  VERIFY_REQUEST,
} from "./actionTypes";
import firebase from "../../services/firebase";
import { Action } from "redux";
import { RootState } from "../reducers/index";
import { ThunkAction } from "redux-thunk";

// Signing up with Firebase
export const signupUser = (email, password, name, username) => async (
  dispatch
) => {
  console.log("AUTH REQUEST");

  if (password.length < 6) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: {
        authMsgError: "Password length should be at least 6 characters",
      },
    });
  } else {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          console.log("data before email", data);
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              console.log("Updating user, username:", username);
              user
                .updateProfile({
                  // <-- Update Method here

                  displayName: username,
                })
                .then(function () {
                  dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: {
                      authMsgSuccess: "Your account was successfully created!",
                      user,
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
          });
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
export const signinUser = (email, password, callback) => async (dispatch) => {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log("Data from sign in", data);
        dispatch({
          type: SIGNIN_SUCCESS,
          payload: {
            authMsgSuccess: "You've been logged in succesfully",
            user: data.user,
          },
        });
        callback();
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
export const signoutUser = () => async (dispatch) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
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
