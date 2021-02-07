import React from "react";
import Sidebar from "./sidebar/Sidebar";
import { useMediaQuery } from "react-responsive";
import PostsFetching from "./PostsFetching";

const Posts = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1000px)" });

  return (
    <div>
      {!isTabletOrMobile ? (
        <div className="mainfield-wrapper">
          <PostsFetching />
          <Sidebar />
        </div>
      ) : (
        <div className="mainfield-wrapper-mobile">
          <PostsFetching />
        </div>
      )}
    </div>
  );
};

export default Posts;
