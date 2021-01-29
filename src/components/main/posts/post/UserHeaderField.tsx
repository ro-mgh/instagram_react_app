import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
      <Link to={"/profile/" + props.author.id}>
        <div className="sidebar-user-avatar">
          <Avatar
            alt="A"
            src={props.author.avatar || ""}
            className={classes.medium}
          />
        </div>
      </Link>
      <div className="post-header-username">
        <Link to={"/profile/" + props.author.id}>
          <div className="username-font">{props.author.username}</div>
        </Link>
      </div>
    </div>
  );
};

export default UserHeaderField;
