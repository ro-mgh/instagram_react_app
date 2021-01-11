import React from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  textField,
  buttonSubmit,
  inputLabel,
} from "../styles/materialui-components/SignStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: "100%",
      "font-size": "12px",
      padding: "14px 0 2px 8px!important",
      background: "rgba(var(--b3f,250,250,250),1)",
      color: "rgba(var(--i1d,38,38,38),1)",
      font: "400 13.3333px Arial",
    },
    buttonSubmit: {
      "background-color": "rgba(var(--d69,0,149,246),.3)",
      opacity: "1",
      border: "1px solid transparent",
      "border-radius": "4px",
      color: "rgba(var(--eca,255,255,255),1)",
      position: "relative",
      cursor: "pointer",
      display: "block",
      "font-weight": "600",
      padding: "5px 9px",
      "text-align": "center",
      "text-transform": "inherit",
      "text-overflow": "ellipsis",
      "font-family":
        "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
      "font-size": "14px",
      "line-height": "18px",
      width: "100%",
    },
    inputLabel: {
      width: "100%",
      display: "flex",
      height: "36px",
      flex: "1 0 0",
      color: "rgba(var(--f52,142,142,142),1)",
      "font-size": "12px",
      left: "8px",
      "line-height": "36px",
      overflow: "hidden",
      "pointer-events": "none",
      position: "absolute",
      right: "0",
      "text-overflow": "ellipsis",
      "user-select": "none",
      "white-space": "nowrap",
    },
  })
);

// const StyledInput = withStyles({
//   root: {
//     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//     borderRadius: 3,
//     border: 0,
//     color: "white",
//     height: 48,
//     padding: "0 30px",
//     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//   },
//   label: {
//     textTransform: "capitalize",
//   },
// })(Input);

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

const Signin = () => {
  const classes = useStyles();
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
          {/* <InputLabel htmlFor="username" style={inputLabel}>
              Phone number, username or email
            </InputLabel>
            <Input
              aria-label="Phone number, username, or email"
              name="username"
              style={textField}
              type="text"
              //   className={classes.textField}
              id="username"
              value={values.username}
              onChange={handleChange("username")} 
            />*/}
          {/* <InputLabel htmlFor="username" style={inputLabel}>
              TestLabel
            </InputLabel>
            <Input
              aria-label="Test aria label"
              placeholder="test placeholder"
              style={textField}
              id="username"
            /> */}

          {/* <TextField
              label="Phone number, username, or email"
              placeholder="Phone number, username, or email"
              required
              style={textField}
            /> */}
          {/* <StyledInput name="username" id="test" /> */}
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
        <FormControl>
          <div className="sign-input-field">
            <InputLabel htmlFor="password" style={inputLabel}>
              Password
            </InputLabel>
            <Input
              style={textField}
              label="testLabel"
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    // aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.password ? (
                      values.showPassword ? (
                        <button className="sign-showpassw-button">Hide</button>
                      ) : (
                        <button className="sign-showpassw-button">Show</button>
                      )
                    ) : null}
                    {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="sign-button-div">
            <Button
              type="submit"
              // fullWidth
              // variant="contained"
              // color="primary"
              style={buttonSubmit}
              //   className={classes.buttonSubmit}
            >
              Log in
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default Signin;

{
  /* <input aria-label="Phone number, username, or email" aria-required="true" autocapitalize="off" 
autocorrect="off" maxlength="75" name="username" type="text" class="_2hvTZ pexuQ zyHYP" value=""></input> */
}
