import React, { FunctionComponent } from "react";
import Signin from "./Signin";
import link1 from "../../pictures/link_signup_appstore.png";
import link2 from "../../pictures/link_signup_googlestore.png";
import { Link } from "react-router-dom";

const SigninField: FunctionComponent = () => {
  return (
    <div className="div-sign-form">
      <div className="sign-mainfield">
        <div className="customlogo-wrapper-sign">
          <h1 className="sign-logo">Insta</h1>
          <div className="customlogo-div-sign"> | by RM</div>
        </div>
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
        <div className="sign-redirect-p">
          Don&apos;t have an account?{" "}
          <Link to="/signup">
            <div className="sign-redirect-a">
              <span className="sign-redirect-span">Sign up</span>
            </div>
          </Link>
        </div>
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
