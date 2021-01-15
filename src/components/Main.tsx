import React, { useState, useEffect, FunctionComponent } from "react";
import PhoneAnimation from "./PhoneAnimation";
import SigninField from "./signin/SigninField";
import FooterExtended from "./footer/FooterExtended";
import { connect } from "react-redux";
import Home from "./MainPage/Home";
// import PropTypes from 'prop-types';

interface IAuth {
  auth: {
    isLoaded: boolean;
    isEmpty: boolean;
  };
}

const Main: FunctionComponent<IAuth> = ({ auth }) => {
  // const userId = 123;
  // if (userId) {
  //   return (
  //     <div>
  //       <article className="article-sign">
  //         <PhoneAnimation />
  //         <SigninField />
  //       </article>
  //       <FooterExtended />
  //     </div>
  //   );
  // }
  console.log(auth);
  return (
    <div>
      {!auth.isLoaded ? (
        <div>Loader</div>
      ) : !auth.isEmpty ? (
        <Home />
      ) : (
        <div>
          <article className="article-sign">
            <PhoneAnimation />
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
