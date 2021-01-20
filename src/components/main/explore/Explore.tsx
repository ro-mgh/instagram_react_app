import React from "react";
import FooterBottom from "../../footer/FooterBottom";
import Carousel from "./Carousel";
import Header from "../header/Header";
import mockedPictures from "../../../mocked_files/mocked_explore_posts";
import Gallery from "./Gallery";

const Explore = () => {
  return (
    <div>
      <Header />
      <div className="explore-wrapper">
        <div className="explore-users-wrapper">
          <p className="explore-users-text">Discover People</p>
          <Carousel />
        </div>
        <div className="explore-posts-wrapper">
          <p className="explore-users-text">Explore</p>
          <Gallery {...mockedPictures} />
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default Explore;
