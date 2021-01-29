import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import firebase from "../../../../services/firebase";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    medium: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  })
);

const User = (props) => {
  const classes = useStyles();
  const [isFollow, setFollow] = useState(false);

  const handleFollow = async () => {
    setFollow(true);
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async function (idToken) {
        try {
          const response = await fetch(
            "http://localhost:3000/follow/" + props.id,
            {
              method: "post",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + idToken,
              },
            }
          );
          if (response.ok) {
            // const jsonResponse = await response.json();
          } else {
            console.error("error");
          }
        } catch (e) {
          console.error(e);
        }
      })
      .catch(function (error) {
        // Handle error
        console.log(error);
      });
  };

  const handleUnfollow = async () => {
    setFollow(false);
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async function (idToken) {
        try {
          const response = await fetch(
            "http://localhost:3000/follow/" + props.id,
            {
              method: "delete",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + idToken,
              },
            }
          );
          if (response.ok) {
            // const jsonResponse = await response.json();
          } else {
            console.error("error");
          }
        } catch (e) {
          console.error(e);
        }
      })
      .catch(function (error) {
        // Handle error
        console.log(error);
      });
  };

  return (
    <div className="sidebar-user user-container">
      <Link to={"/profile/" + props.id}>
        <div className="sidebar-user-avatar">
          <Avatar alt="A" src={props.avatar} className={classes.medium} />
        </div>
      </Link>
      <div className="sidebar-user-wrapper">
        <Link to={"/profile/" + props.id}>
          <div className="username-font">{props.username}</div>
        </Link>
      </div>
      {isFollow ? (
        <button className="follow-button" onClick={handleUnfollow}>
          Unfollow
        </button>
      ) : (
        <button className="follow-button" onClick={handleFollow}>
          Follow
        </button>
      )}
    </div>
  );
};

export default User;
