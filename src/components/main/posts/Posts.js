import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Post from "./post/Post";
import postsArr from "../../../mocked_files/mocked_users";

// interface IPost {
//   username: string;
//   post: string;
// }

const Posts = () => {
  return (
    <div className="mainfield-wrapper">
      <div className="posts-wrapper">
        {postsArr.map((post) => {
          return <Post {...post} key={post.username} />;
        })}
      </div>
      <Sidebar />
    </div>
  );
};

export default Posts;
