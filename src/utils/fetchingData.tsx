import firebase from "../services/firebase";

// fetching posts of user following

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
              throw new Error("Fetching posts: error connecting to DB");
            }
          } catch (e) {
            throw new Error("Fetching posts: error connecting to DB");
          }
        })
        .catch(function (error) {
          // Handle error
          throw new Error("Fetching posts: error connecting to DB");
        });
    } else {
      throw new Error("Fetching posts: error connecting to firebase");
    }
  } catch (e) {
    throw new Error("Fetching posts: error connecting to DB");
  }
};

// fetching pictures for explore page

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
            throw new Error("Fetching random posts: error connecting to DB");
          }
        } catch (e) {
          throw new Error("Fetching random posts: error connecting to DB");
        }
      })
      .catch(function (error) {
        // Handle error
        throw new Error("Fetching random posts: error connecting to firebase");
      });
  } catch (e) {
    throw new Error("Fetching random posts: error connecting to DB");
  }
};
