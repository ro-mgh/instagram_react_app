import React, { useState, useEffect, FunctionComponent } from "react";
import pic1 from "../pictures/phone_signup_carousel_1.jpg";
import pic2 from "../pictures/phone_signup_carousel_2.jpg";
import pic3 from "../pictures/phone_signup_carousel_3.jpg";
import pic4 from "../pictures/phone_signup_carousel_4.jpg";

const PhoneAnimation: FunctionComponent = () => {
  const picArray: string[] = [pic1, pic2, pic3, pic4];
  const [picture, setPicture] = useState(picArray[0]);
  useEffect(() => {
    const picChange = setInterval(() => {
      const currentIdx = picArray.indexOf(picture);
      const newIdx = (currentIdx + 1) % picArray.length;
      setPicture(picArray[newIdx]);
    }, 3000);
    return () => {
      clearInterval(picChange);
    };
  }, [picture]);
  return (
    <div className="div-sign-phone-top">
      <img className="div-sign-photo-img" src={picture} alt=""></img>
    </div>
  );
};

export default PhoneAnimation;
