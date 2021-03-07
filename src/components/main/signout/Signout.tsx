import React, { FunctionComponent } from "react";
import { signoutUser } from "../../../store/actions/auth";
import { connect } from "react-redux";

interface IProps {
  signout: () => void;
}

const Signout: FunctionComponent<IProps> = ({ signout }) => {
  const handleSignout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signout();
  };

  return (
    <button
      onClick={handleSignout}
      className="signout-button"
      data-testid="signout"
    >
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
