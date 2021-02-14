import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import firebase from "../../../../services/firebase";
import { Link } from "react-router-dom";
import { SET_ERROR } from "../../../../store/actions/actionTypes";
import { exploreUsers } from "../../../../store/actions/exploreUsers";

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
  const dispatch = useDispatch();
  const [isFollow, setFollow] = useState(false);

  const handleFollow = async () => {
    setFollow(true);
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async function (idToken) {
        try {
          const response = await fetch(
            "http://ec2-13-125-243-221.ap-northeast-2.compute.amazonaws.com/follow/" +
              props.id,
            {
              method: "post",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + idToken,
              },
            }
          );
          if (response.ok) {
            dispatch(exploreUsers());
          } else {
            dispatch({
              type: SET_ERROR,
              payload: {
                error: "Follow: error connecting to DB",
              },
            });
          }
        } catch (e) {
          dispatch({
            type: SET_ERROR,
            payload: {
              error: "Follow: error connecting to DB",
            },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: SET_ERROR,
          payload: {
            error: "Follow: error connecting to firebase",
          },
        });
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
            "http://ec2-13-125-243-221.ap-northeast-2.compute.amazonaws.com/follow/" +
              props.id,
            {
              method: "delete",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + idToken,
              },
            }
          );
          if (response.ok) {
            dispatch(exploreUsers());
          } else {
            dispatch({
              type: SET_ERROR,
              payload: {
                error: "Follow: error connecting to DB",
              },
            });
          }
        } catch (e) {
          dispatch({
            type: SET_ERROR,
            payload: {
              error: "Follow: error connecting to DB",
            },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: SET_ERROR,
          payload: {
            error: "Follow: error connecting to firebase",
          },
        });
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
