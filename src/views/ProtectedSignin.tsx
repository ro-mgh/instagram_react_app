import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import SigninField from "../components/signin/SigninField";
import Footer from "../components/footer/Footer";
import { connect } from "react-redux";
import Loader from "./Loader";

interface IAuth {
  auth: {
    isLoaded: boolean;
    isEmpty: boolean;
  };
}

const ProtectedSignin: FunctionComponent<IAuth> = ({ auth }) => {
  // to check in Redux
  // const user = "";
  // if (user) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty ? (
        <Redirect to="/" />
      ) : (
        <Route path="/signin">
          <div>
            <div className="div-sign-form-seperate">
              <SigninField />
            </div>
            <Footer />
          </div>
        </Route>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  };
}

export default connect(mapStateToProps)(ProtectedSignin);
