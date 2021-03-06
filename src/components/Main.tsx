import React, { FunctionComponent } from "react";
import PhoneAnimation from "./PhoneAnimation";
import SigninField from "./signin/SigninField";
import FooterExtended from "./footer/FooterExtended";
import { connect } from "react-redux";
import Home from "./main/Home";
import Loader from "../views/Loader";
import { useMediaQuery } from "react-responsive";

interface IAuth {
  auth: {
    isLoaded: boolean;
    isEmpty: boolean;
  };
}

const Main: FunctionComponent<IAuth> = ({ auth }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1000px)" });
  return (
    <div>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty ? (
        <Home />
      ) : (
        <div>
          <article className="article-sign">
            {!isTabletOrMobile ? <PhoneAnimation /> : null}
            <SigninField />
          </article>
          <FooterExtended />
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  };
}

export default connect(mapStateToProps)(Main);
