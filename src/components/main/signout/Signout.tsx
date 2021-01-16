import React from "react";
import { signoutUser } from "../../../store/actions/auth";
import { connect } from "react-redux";

const Signout = ({ signout, auth }) => {
  const handleSignout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("Signout clicked");

    signout();
  };

  return (
    <button onClick={handleSignout} className="signout-button">
      Signout
    </button>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = (dispatch) => ({
  signout() {
    dispatch(signoutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
