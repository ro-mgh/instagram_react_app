import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    medium: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  })
);

const User = () => {
  const classes = useStyles();

  return (
    <div className="sidebar-user user-container">
      <a href="/user" className="sidebar-user-avatar">
        <Avatar alt="A" src="" className={classes.medium} />
      </a>
      <div className="sidebar-user-wrapper">
        <a className="username-font " href="/user">
          roma
        </a>
      </div>
      <button className="follow-button">Follow</button>
    </div>
  );
};

export default User;
