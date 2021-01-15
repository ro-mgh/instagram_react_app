import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
} from "./actionTypes";
import firebase from "../../services/firebase";

// Signing up with Firebase
export const signupUser = (email, password) => async (dispatch) => {
  console.log(email, password);
  console.log("AUTH REQUEST");
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((dataBeforeEmail) => {
        console.log("data before email", dataBeforeEmail);
        firebase.auth().onAuthStateChanged(function (user) {
          user.sendEmailVerification();
        });
      })
      .then((dataAfterEmail) => {
        console.log("data after email", dataAfterEmail);
        firebase.auth().onAuthStateChanged(function (user) {
          if (user.emailVerified) {
            // Email is verified
            dispatch({
              type: SIGNUP_SUCCESS,
              payload:
                "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox.",
            });
          } else {
            // Email is not verified
            console.log("email is not verified");
            dispatch({
              type: SIGNUP_ERROR,
              payload:
                "Something went wrong, we couldn't create your account. Please try again.",
            });
          }
        });
      })
      .catch(function (error) {
        console.log("error in request");
        dispatch({
          type: SIGNUP_ERROR,
          payload:
            "Something went wrong, we couldn't create your account. Please try again.",
        });
      });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SIGNUP_ERROR,
      payload:
        "Something went wrong, we couldn't create your account. Please try again.",
    });
  }
};

// Signing in with Firebase
export const signinUser = (email, password, callback) => async (dispatch) => {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: SIGNIN_SUCCESS });
        callback();
      })
      .catch(() => {
        dispatch({
          type: SIGNIN_ERROR,
          payload: "Invalid login credentials",
        });
      });
  } catch (err) {
    dispatch({ type: SIGNIN_ERROR, payload: "Invalid login credentials" });
  }
};

// Signing out with Firebase
export const signoutUser = () => async (dispatch) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      })
      .catch(() => {
        dispatch({
          type: SIGNOUT_ERROR,
          payload: "...some error message for the user...",
        });
      });
  } catch (err) {
    dispatch({
      type: SIGNOUT_ERROR,
      payload: "...some error message for the user...",
    });
  }
};
