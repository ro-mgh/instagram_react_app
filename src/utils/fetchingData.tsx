import firebase from "../services/firebase";

// fetching posts of user following

type Posts = {
  data: Array<{
    author: {
      avatar: string;
      id: string;
      username: string;
    };
    comments: {
      id: number;
      user: { id: string; username: string };
      comment: string;
    }[];
    createdAt: string;
    id: number;
    image: string;
    likes: { userId: string; postId: number }[];
    text: string;
  }>;

  nextCursor: number;
};

export const fetchPosts = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<Posts> => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      return user
        .getIdToken(/* forceRefresh */ true)
        .then(async function (idToken) {
          try {
            const response = await fetch(
              "https://insta-byrm-server.me.uk/post/user/page/" + pageParam,
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
        .catch(function () {
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

type Pictures = {
  data: Array<{
    createdAt: string;
    id: number;
    image: string;
  }>;
  nextCursor: number;
};

export const fetchNotFollowingPosts = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<Pictures> => {
  try {
    return firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async function (idToken) {
        try {
          const response = await fetch(
            "https://insta-byrm-server.me.uk/post/page/" + pageParam,
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
      .catch(function () {
        // Handle error
        throw new Error("Fetching random posts: error connecting to firebase");
      });
  } catch (e) {
    throw new Error("Fetching random posts: error connecting to DB");
  }
};
