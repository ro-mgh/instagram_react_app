import React, { FunctionComponent, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { connect } from "react-redux";
import Loader from "./Loader";
import Explore from "../components/main/explore/Explore";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

interface IAuth {
  auth: {
    isLoaded: boolean;
    isEmpty: boolean;
  };
}

const ProtectedExplore: FunctionComponent<IAuth> = ({ auth }) => {
  const [error, setError] = useState("test error");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    setError("");
  };

  return (
    <div>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty ? (
        <Route path="/explore">
          <Explore />
          <Snackbar
            open={!!error}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert severity="error" onClose={handleClose}>
              error
            </Alert>
          </Snackbar>
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
