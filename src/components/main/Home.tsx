import React, { useEffect } from "react";
import Header from "./header/Header";
import Posts from "./posts/Posts";
import { useDispatch } from "react-redux";
import { exploreUsers } from "../../store/actions/exploreUsers";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Iwas in effect");
    dispatch(exploreUsers());
  }, []);

  return (
    <div>
      <Header />
      <Posts />
    </div>
  );
};

export default Home;
