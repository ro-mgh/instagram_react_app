import React from "react";
import Button from "@material-ui/core/Button";
import { buttonSubmit } from "../../styles/materialui-components/SignStyles";
import { signupUser } from "../../store/actions/auth";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";

interface State {
  email: string;
  name: string;
  username: string;
  password: string;
  showPassword: boolean;
}

const Signup = ({ signup, auth, authMsgError, authMsgSuccess }) => {
  const [values, setValues] = React.useState<State>({
    email: "",
    name: "",
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

  const createUserWithEmailAndPasswordHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    console.log("Signup clicked, username:", values.username);

    await signup(values.email, values.password, values.name, values.username);

    setValues({
      ...values,
      email: "",
      name: "",
      username: "",
      password: "",
    });
  };

  return (
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
                values.email === ""
                  ? "sign-input-span"
                  : "sign-input-span sign-input-span-onfulfil"
              }
            >
              Mobile Number or Email
            </span>
            <input
              aria-label="Mobile Number or Email"
              aria-required="true"
              autoCapitalize="off"
              autoCorrect="off"
              maxLength={75}
              name="email"
              type="text"
              className={
                values.email === ""
                  ? "sign-input-form"
                  : "sign-input-form sign-input-form-onfulfil"
              }
              value={values.email}
              onChange={handleChange("email")}
            ></input>
          </label>
        </div>

        <div className="sign-input-field">
          <label className={"sign-input-label"}>
            <span
              className={
                values.name === ""
                  ? "sign-input-span"
                  : "sign-input-span sign-input-span-onfulfil"
              }
            >
              Full Name
            </span>
            <input
              aria-label="Full Name"
              aria-required="true"
              autoCapitalize="off"
              autoCorrect="off"
              maxLength={75}
              name="name"
              type="text"
              className={
                values.name === ""
                  ? "sign-input-form"
                  : "sign-input-form sign-input-form-onfulfil"
              }
              value={values.name}
              onChange={handleChange("name")}
            ></input>
          </label>
        </div>

        <div className="sign-input-field">
          <label className={"sign-input-label"}>
            <span
              className={
                values.username === ""
                  ? "sign-input-span"
                  : "sign-input-span sign-input-span-onfulfil"
              }
            >
              Username
            </span>
            <input
              aria-label="Username"
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
          {/* <Button type="submit" style={buttonSubmit}>
            Log in
          </Button> */}

          <button
            className="sign-button-submit"
            onClick={createUserWithEmailAndPasswordHandler}
          >
            Log in
          </button>
        </div>
      </form>
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
  signup(email, password, name, username) {
    dispatch(signupUser(email, password, name, username));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
