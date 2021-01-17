import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import User from "./User";
import Footer from "../../../footer/Footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-user">
        <a href="/user">
          <Avatar alt="A" src="" className={classes.large} />
        </a>
        <div className="sidebar-user-wrapper">
          <a className="username-font" href="/user">
            roma
          </a>
          <div className="name-font">Roman Mgh</div>
        </div>
      </div>
      <div className="sidebar-suggestions-text">Suggestions For You</div>
      <div className="sidebar-suggestions-users">
        <User />
        <User />
        <User />
        <User />
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;
