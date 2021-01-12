import React, { FunctionComponent } from "react";
import Signin from "./Signin";
import link1 from "../pictures/link_signup_appstore.png";
import link2 from "../pictures/link_signup_googlestore.png";

const SigninField: FunctionComponent = () => {
  return (
    <div className="div-sign-form">
      <div className="sign-mainfield">
        <h1 className="sign-logo">Insta</h1>
        <Signin />
        <div className="sign-or">
          <div className="sign-or-dash"></div>
          <div className="sign-or-text">or</div>
          <div className="sign-or-dash"></div>
        </div>
        <button className="sign-loginFacebook">
          <span className="sign-loginFacebook-logo"></span>
          <span className="sign-loginFacebook-text">Log in with Facebook</span>
        </button>
        <p className="sign-forgot-password">Forgot password?</p>
      </div>
      <div className="sign-redirect">
        <p className="sign-redirect-p">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="sign-redirect-a">
            <span className="sign-redirect-span">Sign up</span>
          </a>
        </p>
      </div>
      <p className="sign-links-p">Get the app.</p>
      <div className="sign-links-div">
        <img className="sign-links-img" src={link1} alt=""></img>
        <img className="sign-links-img" src={link2} alt=""></img>
      </div>
    </div>
  );
};

export default SigninField;
