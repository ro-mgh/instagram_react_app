import React, { FunctionComponent } from "react";
import Header from "./header/Header";
import Posts from "./posts/Posts";
import AlertPop from "./errors/AlertPop";

const Home: FunctionComponent = () => {
  return (
    <div>
      <Header />
      <Posts />
      <AlertPop />
    </div>
  );
};

export default Home;
