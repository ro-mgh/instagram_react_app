import React, { FunctionComponent } from "react";
import FooterBottom from "../../footer/FooterBottom";
import Carousel from "./Carousel";
import Header from "../header/Header";
import ExplorePosts from "./ExplorePosts";

const Explore: FunctionComponent = () => {
  return (
    <div data-testid="explore">
      <Header />
      <div className="explore-wrapper">
        <div className="explore-users-wrapper">
          <p className="explore-users-text">Discover People</p>
          <div className="explore-carousel-wrapper">
            <Carousel />
          </div>
        </div>
        <ExplorePosts />
      </div>
      <FooterBottom />
    </div>
  );
};

export default Explore;
