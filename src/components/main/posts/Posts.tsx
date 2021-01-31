import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./sidebar/Sidebar";
import Post from "./post/Post";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { fetchPosts } from "../../../utils/fetchingData";
import { SET_ERROR } from "../../../store/actions/actionTypes";

const Posts = () => {
  // const [posts, setPosts] = useState([]);
  // const userPosts = useSelector((state) => state.dataReducer.userPosts);
  const dispatch = useDispatch();
  const { isLoading, error, data } = useQuery("userPosts", fetchPosts);

  if (error) {
    dispatch({
      type: SET_ERROR,
      payload: { error: error.message },
    });
  }

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
