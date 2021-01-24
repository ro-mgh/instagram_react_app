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

const UserHeaderField = (props) => {
  const classes = useStyles();
  return (
    <div className="post-header">
      <a href="/user" className="sidebar-user-avatar">
        <Avatar
          alt="A"
          src={props.author.avatar || ""}
          className={classes.medium}
        />
      </a>
      <div className="post-header-username">
        <a className="username-font" href="/user">
          {props.author.username}
        </a>
      </div>
      {/* <button className="follow-button">Follow</button> */}
    </div>
  );
};

export default UserHeaderField;
