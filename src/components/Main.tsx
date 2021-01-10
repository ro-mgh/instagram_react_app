import React, { useState, useEffect, FunctionComponent } from "react";
import PhoneAnimation from "./PhoneAnimation";

const Main: FunctionComponent = () => {
  const userId = 123;
  if (userId) {
    return (
      <article className="article-sign">
        <div className="div-sign-phone">
          <PhoneAnimation />
        </div>
        <div className="div-sign-form">SigninComponent</div>
      </article>
    );
  }
  return <div>i am here</div>;
};

export default Main;
