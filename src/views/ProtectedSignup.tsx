import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import SignupField from "../components/SignupField";
import Footer from "../components/Footer";

const ProtectedSignup = () => {
  //   const [user] = useContext(UserContext);

  // to take from redux
  const user = "";
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Route path="/signup">
      <div>
        <div className="div-sign-form-seperate">
          <SignupField />
        </div>
        <Footer />
      </div>
    </Route>
  );
};

export default ProtectedSignup;
