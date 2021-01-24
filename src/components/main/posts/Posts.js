import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Post from "./post/Post";
import firebase from "../../../services/firebase";

// interface IPost {
//   username: string;
//   post: string;
// }

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setPosts([]);
    setLoading(true);

    const getPosts = async () => {
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(async function (idToken) {
          try {
            const response = await fetch("http://localhost:3000/post/user/2", {
              method: "get",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + idToken,
              },
              // body: JSON.stringify({
              //   userId: 4,
              // }),
            });
            if (response.ok) {
              const jsonResponse = await response.json();
              setPosts(jsonResponse);
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
    };
    getPosts();
    setLoading(false);
  }, []);

  return (
    <div className="mainfield-wrapper">
      <div className="posts-wrapper">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          posts.map((post) => {
            console.log(post);
            return <Post {...post} key={post.username} />;
          })
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default Posts;
