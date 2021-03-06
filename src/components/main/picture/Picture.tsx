import React, { FunctionComponent } from "react";
import Header from "../header/Header";
import FooterBottom from "../../footer/FooterBottom";
import AlertPop from "../errors/AlertPop";
import PictureField from "./PictureField";

// post/image page
interface IProps {
  posts: { id: number; name: string; image: string }[];
}

const Picture: FunctionComponent<IProps> = (props) => {
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
