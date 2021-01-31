import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import User from "./User";
import Footer from "../../../footer/Footer";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getArrayOfUnkhownUsers } from "../../../../utils/helpers";

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
  const user = useSelector((state) => state.authReducer.user);
  const allUsersFromStore = useSelector((state) => state.dataReducer.users);
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    if (Object.entries(allUsersFromStore).length > 0) {
      const unkhownUsers = getArrayOfUnkhownUsers(user.uid, allUsersFromStore);

      setNewUsers(unkhownUsers);

      console.log("newUsersArray: ", unkhownUsers);
    }
  }, [allUsersFromStore]);

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-user">
        <Link to={"/profile/" + user.uid}>
          <Avatar alt="A" src={user.photoURL} className={classes.large} />
        </Link>
        <div className="sidebar-user-wrapper">
          <div className="username-font">
            <Link to={"/profile/" + user.uid}>
              {user ? user.displayName.split("&&")[0] : null}
            </Link>
          </div>
          <div className="name-font">
            {user ? user.displayName.split("&&")[1] : null}
          </div>
        </div>
      </div>
      <div className="sidebar-suggestions-text">Suggestions For You</div>
      <div className="sidebar-suggestions-users">
        {newUsers.length ? (
          newUsers.slice(0, 5).map((user) => {
            return <User {...user} key={user.id} />;
          })
        ) : (
          <div className="suggestions-progress-wrapper">
            <CircularProgress size={20} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;
