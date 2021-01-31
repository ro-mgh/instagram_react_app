import { GET_USER, GET_USER_POSTS } from "./actionTypes";
import firebase from "../../services/firebase";
import { Action } from "redux";
import { RootState } from "../reducers/index";
import { ThunkAction } from "redux-thunk";

// export const userData = (): ThunkAction<
//   void,
//   RootState,
//   unknown,
//   Action<string>
// > => async (dispatch) => {
//   try {
//     const user = firebase.auth().currentUser;
//     if (user) {
//       user
//         .getIdToken(/* forceRefresh */ true)
//         .then(async function (idToken) {
//           try {
//             const response = await fetch(
//               "http://localhost:3000/user/" + user.uid,
//               {
//                 method: "get",
//                 headers: {
//                   "Content-type": "application/json",
//                   Authorization: "Bearer " + idToken,
//                 },
//               }
//             );
//             if (response.ok) {
//               const jsonResponse = await response.json();
//               console.log("response", jsonResponse);
//               dispatch({
//                 type: GET_USER,
//                 payload: { user: jsonResponse },
//               });
//             } else {
//               console.error("error");
//             }
//           } catch (e) {
//             console.error(e);
//           }
//         })
//         .catch(function (error) {
//           // Handle error
//           console.log(error);
//         });
//     } else {
//       console.log("error in getting user's data");
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const userPosts = (): ThunkAction<
//   void,
//   RootState,
//   unknown,
//   Action<string>
// > => async (dispatch) => {
//   try {
//     const user = firebase.auth().currentUser;
//     if (user) {
//       user
//         .getIdToken(/* forceRefresh */ true)
//         .then(async function (idToken) {
//           try {
//             const response = await fetch(
//               "http://localhost:3000/post/user/" + user.uid,
//               {
//                 method: "get",
//                 headers: {
//                   "Content-type": "application/json",
//                   Authorization: "Bearer " + idToken,
//                 },
//               }
//             );
//             if (response.ok) {
//               const jsonResponse = await response.json();
//               console.log("response", jsonResponse);
//               dispatch({
//                 type: GET_USER_POSTS,
//                 payload: { userPosts: jsonResponse },
//               });
//             } else {
//               console.error("error");
//             }
//           } catch (e) {
//             console.error(e);
//           }
//         })
//         .catch(function (error) {
//           // Handle error
//           console.log(error);
//         });
//     } else {
//       console.log("error in getting user's data");
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
