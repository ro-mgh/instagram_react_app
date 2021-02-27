import React from "react";
import { signinUser } from "../../store/actions/auth";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

const Signin = ({ signin, auth, authMsgError, authMsgSuccess }) => {
  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const signinUserWithEmailAndPasswordHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    await signin(values.username, values.password);

    setValues({
      ...values,
      username: "",
      password: "",
    });
  };

  const signInAsDemoUser = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await signin("demouser@example.com", "123456");

    setValues({
      ...values,
      username: "",
      password: "",
    });
  };

  return (
    <div data-testid="signin">
      <div className="signin-demouser-wrapper">
        <button
          className="sign-up-loginFacebook signin-demouser"
          onClick={signInAsDemoUser}
        >
          Sign in as demouser
        </button>
      </div>
      <div className="sign-form-div">
        <form className="sign-form" noValidate>
          {authMsgSuccess ? (
            <Alert severity="success">{authMsgSuccess}</Alert>
          ) : authMsgError ? (
            <Alert severity="error">{authMsgError}</Alert>
          ) : null}
          <div className="sign-input-field">
            <label className={"sign-input-label"}>
              <span
                className={
                  values.username === ""
                    ? "sign-input-span"
                    : "sign-input-span sign-input-span-onfulfil"
                }
              >
                Phone number, username, or email
              </span>
              <input
                aria-label="Phone number, username, or email"
                aria-required="true"
                autoCapitalize="off"
                autoCorrect="off"
                maxLength={75}
                name="username"
                type="text"
                className={
                  values.username === ""
                    ? "sign-input-form"
                    : "sign-input-form sign-input-form-onfulfil"
                }
                value={values.username}
                onChange={handleChange("username")}
              ></input>
            </label>
          </div>
          <div className="sign-input-field">
            <label className={"sign-input-label"}>
              <span
                className={
                  values.password === ""
                    ? "sign-input-span"
                    : "sign-input-span sign-input-span-onfulfil"
                }
              >
                Password
              </span>
              <input
                aria-label="Password"
                aria-required="true"
                autoCapitalize="off"
                autoCorrect="off"
                name="password"
                type={values.showPassword ? "text" : "password"}
                className={
                  values.password === ""
                    ? "sign-input-form"
                    : "sign-input-form sign-input-form-onfulfil"
                }
                value={values.password}
                onChange={handleChange("password")}
              ></input>
            </label>
            <div>
              {values.password ? (
                <div className="sign-password-enddiv">
                  {values.showPassword ? (
                    <button
                      className="sign-showpassw-button"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      Hide
                    </button>
                  ) : (
                    <button
                      className="sign-showpassw-button"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      Show
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div className="sign-button-div">
            <button
              className="sign-button-submit"
              onClick={signinUserWithEmailAndPasswordHandler}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
    authMsgError: state.authReducer.authMsgError,
    authMsgSuccess: state.authReducer.authMsgSuccess,
  };
}

const mapDispatchToProps = (dispatch) => ({
  signin(email, password) {
    return dispatch(signinUser(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
