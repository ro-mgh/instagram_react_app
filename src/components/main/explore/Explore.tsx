import React, { useEffect } from "react";
import FooterBottom from "../../footer/FooterBottom";
import Carousel from "./Carousel";
import Header from "../header/Header";
import Gallery from "./Gallery";
// import { explorePosts } from "../../../store/actions/exploreUsers";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { useInfiniteQuery } from "react-query";

import { fetchNotFollowingPosts } from "../../../utils/fetchingData";
import { SET_ERROR } from "../../../store/actions/actionTypes";
import ExplorePosts from "./ExplorePosts";

const Explore = () => {
  return (
    <div>
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
