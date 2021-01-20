import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { connect } from "react-redux";
import Loader from "./Loader";
import Explore from "../components/main/explore/Explore";

interface IAuth {
  auth: {
    isLoaded: boolean;
    isEmpty: boolean;
  };
}

const ProtectedExplore: FunctionComponent<IAuth> = ({ auth }) => {
  return (
    <div>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty ? (
        <Route path="/explore">
          <Explore />
        </Route>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  };
}

export default connect(mapStateToProps)(ProtectedExplore);