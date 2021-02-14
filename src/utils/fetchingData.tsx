import firebase from "../services/firebase";

// fetching posts of user following

export const fetchPosts = async ({ pageParam = 0 }) => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      return user
        .getIdToken(/* forceRefresh */ true)
        .then(async function (idToken) {
          try {
            const response = await fetch(
              "http://ec2-13-125-243-221.ap-northeast-2.compute.amazonaws.com/post/user/page/" +
                pageParam,
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

export const fetchNotFollowingPosts = async ({ pageParam = 0 }) => {
  try {
    return firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async function (idToken) {
        try {
          const response = await fetch(
            "http://ec2-13-125-243-221.ap-northeast-2.compute.amazonaws.com/post/page/" +
              pageParam,
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
