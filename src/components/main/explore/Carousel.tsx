import React from "react";
import Slider from "react-slick";
import mockedUsersArr from "../../../mocked_files/mocked_explore_list";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    medium: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

const Carousel = () => {
  const classes = useStyles();
  const settings = {
    // dots: true,
    lazyLoad: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 2,
    // slidesToScroll: 1,
    // initialSlide: 2,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  const sliders = () => {
    return mockedUsersArr.map((user) => {
      return (
        <div key={user.username} className="carousel-wrapper">
          <div className="carousel-user-wrapper">
            <a href="/user" className="carousel-user-avatar">
              <Avatar alt="A" src={user.avatar} className={classes.medium} />
            </a>
            <div className="post-header-username">
              <a className="username-font" href="/user">
                {user.username}
              </a>
            </div>
            <button className="follow-button">Follow</button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="test">
      <Slider {...settings}>{sliders()}</Slider>
    </div>
  );
};

export default Carousel;
