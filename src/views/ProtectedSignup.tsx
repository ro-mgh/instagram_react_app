import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import SignupField from "../components/signup/SignupField";
import Footer from "../components/footer/Footer";
import { connect } from "react-redux";

interface IAuth {
  auth: {
    isLoaded: boolean;
    isEmpty: boolean;
  };
}

const ProtectedSignup: FunctionComponent<IAuth> = ({ auth }) => {
  // to check in Redux
  const user = "";
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {!auth.isEmpty ? (
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
