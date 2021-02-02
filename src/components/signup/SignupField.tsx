import React, { FunctionComponent } from "react";
import Signup from "./Signup";
import link1 from "../../pictures/link_signup_appstore.png";
import link2 from "../../pictures/link_signup_googlestore.png";
import { Link } from "react-router-dom";

const SignupField: FunctionComponent = () => {
  return (
    <div className="div-sign-form">
      <div className="sign-mainfield">
        <div className="customlogo-wrapper-sign">
          <h1 className="sign-logo sign-up-logo">Insta</h1>
          <div className="customlogo-div-sign"> | by RM</div>
        </div>
        <h2 className="sign-up-text">
          Sign up to see photos and videos from your friends.
        </h2>
        <button className="sign-up-loginFacebook">
          <span className="sign-up-loginFacebook-logo"></span>
          Log in with Facebook
          {/* <span className="sign-loginFacebook-text">Log in with Facebook</span> */}
        </button>
        <div className="sign-or">
          <div className="sign-or-dash"></div>
          <div className="sign-or-text">or</div>
          <div className="sign-or-dash"></div>
        </div>
        <Signup />
        <p className="sign-up-termsp">
          By signing up, you agree to our
          <a
            className="sign-up-terms"
            target="_blank"
            rel="noreferrer"
            href="https://help.instagram.com/581066165581870"
            tabIndex={0}
          >
            {" "}
            Terms
          </a>
          ,{" "}
          <a
            className="sign-up-terms"
            target="_blank"
            rel="noreferrer"
            href="https://help.instagram.com/519522125107875"
            tabIndex={0}
          >
            {" "}
            Data Policy{" "}
          </a>{" "}
          and{" "}
          <a
            className="sign-up-terms"
            target="_blank"
            rel="noreferrer"
            href="https://help.instagram.com/519522125107875"
            tabIndex={0}
          >
            {" "}
            Cookies Policy
          </a>
          .
        </p>
      </div>
      <div className="sign-redirect">
        <p className="sign-redirect-p">
          Have an account?{" "}
          <Link to="/signin">
            <div className="sign-redirect-a">
              <span className="sign-redirect-span">Log in</span>
            </div>
          </Link>
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

export default SignupField;
