import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { connect } from "react-redux";
import Loader from "./Loader";
import Profile from "../components/main/profile/Profile";

interface IAuth {
  auth: {
    isLoaded: boolean;
    isEmpty: boolean;
  };
}

const ProtectedProfile: FunctionComponent<IAuth> = ({ auth }) => {
  return (
    <div>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty ? (
        <Route path="/profile">
          <div>
            <Profile />
          </div>
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

export default connect(mapStateToProps)(ProtectedProfile);
