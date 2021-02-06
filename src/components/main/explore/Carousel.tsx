import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselUser from "./CarouselUser";
import { useDispatch } from "react-redux";
import { exploreUsers } from "../../../store/actions/exploreUsers";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getArrayOfUnkhownUsers } from "../../../utils/helpers";
import { useMediaQuery } from "react-responsive";

const Carousel = () => {
  const [newUsers, setNewUsers] = useState([]);
  const user = useSelector((state) => state.authReducer.user);
  const allUsersFromStore = useSelector((state) => state.dataReducer.users);
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 620px)" });

  const slidesToShow = isTablet ? (isMobile ? 2 : 3) : 4;

  const settings = {
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 2,
  };

  // setting all unknown users to useState arr
  useEffect(() => {
    if (Object.entries(allUsersFromStore).length > 0) {
      const unkhownUsers = getArrayOfUnkhownUsers(user.uid, allUsersFromStore);
      setNewUsers(unkhownUsers);
    } else {
      dispatch(exploreUsers());
    }
  }, [allUsersFromStore]);

  const sliders = () => {
    return newUsers.map((user) => {
      return <CarouselUser {...user} key={user.id} />;
    });
  };

  return (
    <div className="">
      {newUsers.length ? (
        <Slider {...settings}>{sliders()}</Slider>
      ) : (
        <div className="mainfield-progress-wrapper">
          <CircularProgress size={30} />
        </div>
      )}
    </div>
  );
};

export default Carousel;
