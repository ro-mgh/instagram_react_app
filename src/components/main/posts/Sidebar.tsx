import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

const Sidebar = () => {
  const classes = useStyles();

  return (
    <div>
      <div className="sidebar-main-wrapper"></div>
      <div className="sidebar-main">
        <div className="sidebar-user-wrapper">
          <div className="sidebar-user-wrapper1">
            <div className="sidebar-user-wrapper2">
              <div className="sidebar-user-avatar">
                <Avatar alt="A" src="" className={classes.small} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
