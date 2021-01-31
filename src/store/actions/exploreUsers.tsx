import { GET_USERS, SET_ERROR } from "./actionTypes";
import { normalize, schema } from "normalizr";
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

            const myData = { users: jsonResponse };
            const user = new schema.Entity("users");
            const mySchema = { users: [user] };
            const normalizedData = normalize(myData, mySchema);

            dispatch({
              type: GET_USERS,
              payload: { users: normalizedData.entities.users },
            });
          } else {
            dispatch({
              type: SET_ERROR,
              payload: {
                error: "Get all users: error connecting to DB",
              },
            });
          }
        } catch (e) {
          dispatch({
            type: SET_ERROR,
            payload: {
              error: "Get all users: error connecting to DB",
            },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: SET_ERROR,
          payload: {
            error: "Get all users: error connecting to firebase",
          },
        });
      });
  } catch (e) {
    dispatch({
      type: SET_ERROR,
      payload: {
        error: "Get all users: error connecting to DB",
      },
    });
  }
};

// export const explorePosts = (): ThunkAction<
//   void,
//   RootState,
//   unknown,
//   Action<string>
// > => async (dispatch) => {
//   console.log("I was here");
//   try {
//     firebase
//       .auth()
//       .currentUser.getIdToken(/* forceRefresh */ true)
//       .then(async function (idToken) {
//         try {
//           const response = await fetch("http://localhost:3000/post", {
//             method: "get",
//             headers: {
//               "Content-type": "application/json",
//               Authorization: "Bearer " + idToken,
//             },
//           });
//           if (response.ok) {
//             const jsonResponse = await response.json();
//             console.log("response", jsonResponse);
//             dispatch({
//               type: GET_USERS_POSTS,
//               payload: { usersPosts: jsonResponse },
//             });
//           } else {
//             console.error("error");
//           }
//         } catch (e) {
//           console.error(e);
//         }
//       })
//       .catch(function (error) {
//         // Handle error
//         console.log(error);
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };
