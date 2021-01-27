import React, { useEffect } from "react";
import Header from "./header/Header";
import Posts from "./posts/Posts";
import { useDispatch } from "react-redux";
import { exploreUsers } from "../../store/actions/exploreUsers";
import { userData } from "../../store/actions/userData";
import { userPosts } from "../../store/actions/userData";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(exploreUsers());
    dispatch(userData());
    dispatch(userPosts());
  }, []);

  return (
    <div>
      <Header />
      <Posts />
    </div>
  );
};

export default Home;
