import React, { useState, useEffect, FunctionComponent } from "react";
import PhoneAnimation from "./PhoneAnimation";
import SigninField from "./SigninField";

const Main: FunctionComponent = () => {
  const userId = 123;
  if (userId) {
    return (
      <article className="article-sign">
        <PhoneAnimation />
        <SigninField />
      </article>
    );
  }
  return <div>i am here</div>;
};

export default Main;
