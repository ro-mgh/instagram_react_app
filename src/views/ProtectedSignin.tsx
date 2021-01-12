import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import SigninField from "../components/SigninField";
import Footer from "../components/Footer";

const ProtectedSignin = () => {
  // const [user] = useContext(UserContext);

  // to check in Redux
  const user = "";
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Route path="/signin">
      <div>
        <div className="div-sign-form-seperate">
          <SigninField />
        </div>
        <Footer />
      </div>
    </Route>
  );
};

export default ProtectedSignin;
