import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "./Loader";
import Picture from "../components/main/picture/Picture";

interface IAuth {
  auth: {
    isLoaded: boolean;
    isEmpty: boolean;
  };
}

const ProtectedPicture: FunctionComponent<IAuth> = ({ auth }) => {
  return (
    <div>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty ? (
        <Route path="/picture/:pictureId" component={Picture} />
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

export default connect(mapStateToProps)(ProtectedPicture);
