import React from "react";
import Button from "@material-ui/core/Button";
import { buttonSubmit } from "../styles/materialui-components/SignStyles";

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

const Signin = () => {
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

  return (
    <div className="sign-form-div">
      <form className="sign-form" noValidate>
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
          {/* <Button type="submit" style={buttonSubmit}>
            Log in
          </Button> */}

          <button className="sign-button-submit">Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
