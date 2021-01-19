import React from "react";
import Slider from "react-slick";
import mockedUsersArr from "../../../mocked_files/mocked_explore_list";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
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
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const sliders = () => {
    return mockedUsersArr.map((user) => {
      return <div key={user.username}>{user.username}</div>;
    });
  };

  return (
    <div className="test">
      <Slider {...settings}>{sliders()}</Slider>
    </div>
  );
};

export default Carousel;
