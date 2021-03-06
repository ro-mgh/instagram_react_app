import React, { useState, useEffect, FunctionComponent } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR } from "../../../store/actions/actionTypes";

// creacting alert snakbar components ("listening" to redux errors obj)

const AlertPop: FunctionComponent = () => {
  const errorMsg = useSelector((state) => state.errorReducer.error);
  const [error, setError] = useState(errorMsg);
  const dispatch = useDispatch();

  useEffect(() => {
    setError(errorMsg);
  }, [errorMsg]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  return (
    <Snackbar
      open={!!error}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <div data-testid="error">
        <Alert severity="error" onClose={handleClose}>
          {error}
        </Alert>
      </div>
    </Snackbar>
  );
};

export default AlertPop;
