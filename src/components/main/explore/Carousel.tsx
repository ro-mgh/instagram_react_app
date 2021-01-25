import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselUser from "./CarouselUser";
import { useDispatch } from "react-redux";
import { exploreUsers } from "../../../store/actions/exploreUsers";

const Carousel = () => {
  const users = useSelector((state) => state.dataReducer.users);
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(exploreUsers());
  }, []);

  const sliders = () => {
    console.log("sliders: ", users);
    return users.map((user) => {
      return <CarouselUser {...user} key={user.id} />;
    });
  };

  return (
    <div className="">
      <Slider {...settings}>{sliders()}</Slider>
    </div>
  );
};

export default Carousel;
