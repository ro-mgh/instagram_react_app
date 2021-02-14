import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import firebase from "../../../services/firebase";
import { useDispatch } from "react-redux";
import { exploreUsers } from "../../../store/actions/exploreUsers";
import { Link } from "react-router-dom";
import { SET_ERROR } from "../../../store/actions/actionTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    medium: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

const CarouselUser = (props) => {
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
              payload: { error: "Follow: error connecting to DB" },
            });
          }
        } catch (e) {
          dispatch({
            type: SET_ERROR,
            payload: { error: "Follow: error connecting to DB" },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: SET_ERROR,
          payload: { error: "Follow: error connecting to firebase" },
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
          if (!response.ok) {
            dispatch(exploreUsers());
          } else {
            dispatch({
              type: SET_ERROR,
              payload: { error: "Unfollow: error connecting to DB" },
            });
          }
        } catch (e) {
          dispatch({
            type: SET_ERROR,
            payload: { error: "Unfollow: error connecting to DB" },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: SET_ERROR,
          payload: { error: "Unfollow: error connecting to DB" },
        });
      });
  };

  return (
    <div
      key={props.id}
      className="carousel-wrapper"
      data-testid="carousel-user"
    >
      <div className="carousel-user-wrapper">
        <Link to={"/profile/" + props.id}>
          <div className="carousel-user-avatar">
            <Avatar alt="A" src={props.avatar} className={classes.medium} />
          </div>
        </Link>
        <div className="div-username-explore">
          <Link to={"/profile/" + props.id}>
            <div className="username-font  username-font-explore">
              {props.username}
            </div>
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
    </div>
  );
};

export default CarouselUser;
