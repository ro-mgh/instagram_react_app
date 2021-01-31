import firebase from "../services/firebase";

export const fetchPosts = async () => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      return user
        .getIdToken(/* forceRefresh */ true)
        .then(async function (idToken) {
          try {
            const response = await fetch(
              "http://localhost:3000/post/user/" + user.uid,
              {
                method: "get",
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + idToken,
                },
              }
            );
            if (response.ok) {
              return response.json();
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
    } else {
      console.log("error in getting user's data");
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchNotFollowingPosts = async () => {
  try {
    return firebase
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
            return response.json();
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
