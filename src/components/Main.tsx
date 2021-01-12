import React, { useState, useEffect, FunctionComponent } from "react";
import PhoneAnimation from "./PhoneAnimation";
import SigninField from "./SigninField";
import FooterExtended from "./FooterExtended";

const Main: FunctionComponent = () => {
  const userId = 123;
  if (userId) {
    return (
      <div>
        <article className="article-sign">
          <PhoneAnimation />
          <SigninField />
        </article>
        <FooterExtended />
      </div>
    );
  }
  return <div>i am here</div>;
};

export default Main;
