import React, { FunctionComponent } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import SignupField from "../components/signup/SignupField";
import Footer from "../components/footer/Footer";
import { connect } from "react-redux";
import Loader from "./Loader";

interface IAuth {
  auth: {
    isLoaded: boolean;
    isEmpty: boolean;
    user: "";
  };
}

const ProtectedSignup: FunctionComponent<IAuth> = ({ auth }) => {
  // to check in Redux
  const user = "";
  // if (auth.user) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty ? (
        <Redirect to="/" />
      ) : (
        <Route path="/signup">
          <div>
            <div className="div-sign-form-seperate">
              <SignupField />
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

export default connect(mapStateToProps)(ProtectedSignup);
