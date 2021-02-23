import React from "react";
import Header from "../header/Header";
import FooterBottom from "../../footer/FooterBottom";
import AlertPop from "../errors/AlertPop";
import PictureField from "./PictureField";

// post/image page

const Picture = (props) => {
  return (
    <div>
      <Header />
      <PictureField {...props} />
      <FooterBottom />
      <AlertPop />
    </div>
  );
};

export default Picture;
