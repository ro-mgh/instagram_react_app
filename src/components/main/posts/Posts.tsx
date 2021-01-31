import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./sidebar/Sidebar";
import Post from "./post/Post";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { fetchPosts } from "../../../utils/fetchingData";

const Posts = () => {
  // const [posts, setPosts] = useState([]);
  // const userPosts = useSelector((state) => state.dataReducer.userPosts);

  const { isLoading, error, data } = useQuery("userPosts", fetchPosts);

  if (error) {
    console.log("An error has occurred: " + error.message);
  }

  useEffect(() => {
    // setPosts([]);
    // setLoading(true);
    // const getPosts = async () => {
    //   firebase
    //     .auth()
    //     .currentUser.getIdToken(/* forceRefresh */ true)
    //     .then(async function (idToken) {
    //       try {
    //         const response = await fetch("http://localhost:3000/post/user/", {
    //           method: "get",
    //           headers: {
    //             "Content-type": "application/json",
    //             Authorization: "Bearer " + idToken,
    //           },
    //           // body: JSON.stringify({
    //           //   userId: 4,
    //           // }),
    //         });
    //         if (response.ok) {
    //           const jsonResponse = await response.json();
    //           setPosts(jsonResponse);
    //         } else {
    //           console.error("error");
    //         }
    //       } catch (e) {
    //         console.error(e);
    //       }
    //     })
    //     .catch(function (error) {
    //       // Handle error
    //       console.log(error);
    //     });
    // };
    // // getPosts();
    // setLoading(false);
  }, []);

  return (
    <div className="mainfield-wrapper">
      <div className="posts-wrapper">
        {!isLoading ? (
          data.map((post) => {
            return <Post {...post} key={post.id} />;
          })
        ) : (
          <div className="mainfield-progress-wrapper">
            <CircularProgress size={30} />
          </div>
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default Posts;
