import React, { useEffect } from "react";
import FooterBottom from "../../footer/FooterBottom";
import Carousel from "./Carousel";
import Header from "../header/Header";
import Gallery from "./Gallery";
// import { explorePosts } from "../../../store/actions/exploreUsers";
// import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { fetchNotFollowingPosts } from "../../../utils/fetchingData";

const Explore = () => {
  // const usersPostsArr = useSelector((state) => state.dataReducer.usersPosts);
  // const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery(
    "notFollowingPosts",
    fetchNotFollowingPosts
  );

  if (error) {
    console.log("An error has occurred: " + error.message);
  }

  // useEffect(() => {
  //   dispatch(explorePosts());
  // }, []);

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
        <div className="explore-posts-wrapper">
          <p className="explore-users-text">Explore</p>
          {!isLoading ? (
            <Gallery {...{ posts: data }} />
          ) : (
            <div className="mainfield-progress-wrapper">
              <CircularProgress size={30} />
            </div>
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default Explore;
