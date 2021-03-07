import React, { useState, useEffect, FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import User from "./User";
import Footer from "../../../footer/Footer";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getArrayOfUnkhownUsers } from "../../../../utils/helpers";
import { exploreUsers } from "../../../../store/actions/exploreUsers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

const Sidebar: FunctionComponent = () => {
  const classes = useStyles();
  const authUser = useSelector((state) => state.authReducer.user);
  const allUsersFromStore = useSelector((state) => state.dataReducer.users);
  const [newUsers, setNewUsers] = useState([]);
  // const [user, setUser] = useState(authUser);
  const dispatch = useDispatch();

  // getting all unknown users
  useEffect(() => {
    if (Object.entries(allUsersFromStore).length > 0 && authUser.uid) {
      const unkhownUsers = getArrayOfUnkhownUsers(
        authUser.uid,
        allUsersFromStore
      );
      setNewUsers(unkhownUsers);
    } else {
      dispatch(exploreUsers());
    }
  }, [allUsersFromStore]);

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-user">
        <Link to={"/profile/" + authUser.uid}>
          <Avatar alt="A" src={authUser.photoURL} className={classes.large} />
        </Link>
        <div className="sidebar-user-wrapper">
          <div className="username-font">
            <Link to={"/profile/" + authUser.uid}>
              <div className="username-font">
                {authUser.displayName
                  ? authUser.displayName.split("&&")[0]
                  : ""}
              </div>
            </Link>
          </div>
          <div className="name-font">
            {authUser.displayName ? authUser.displayName.split("&&")[1] : ""}
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
