import React, { useEffect } from "react";
import Header from "./header/Header";
import Posts from "./posts/Posts";
import { useDispatch } from "react-redux";
import { exploreUsers } from "../../store/actions/exploreUsers";
import AlertPop from "./errors/AlertPop";

const Home = () => {
  return (
    <div>
      <Header />
      <Posts />
      <AlertPop />
    </div>
  );
};

export default Home;
