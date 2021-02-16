import React, { useState, useEffect, FunctionComponent } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import firebase from "../../../services/firebase";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { exploreUsers } from "../../../store/actions/exploreUsers";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { SET_ERROR } from "../../../store/actions/actionTypes";
import { useMediaQuery } from "react-responsive";

import ProfilePictures from "./ProfilePictures";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    extraLarge: {
      width: theme.spacing(17),
      height: theme.spacing(17),
    },
    medium: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  })
);

const ProfileInfo: FunctionComponent<RouteComponentProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allUsersFromStore = useSelector((state) => state.dataReducer.users);
  const [isFollow, setFollow] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const [user, setUser] = useState({
    id: "",
    username: "",
    name: "",
    avatar: "",
    posts: [],
    followingIds: [],
    Following: [],
  });

  useEffect(() => {
    if (allUsersFromStore[props.params.userId]) {
      setUser(allUsersFromStore[props.params.userId]);
    } else {
      dispatch(exploreUsers());
    }
  }, [props.params.userId, allUsersFromStore]);

  const handleFollow = async () => {
    setFollow(true);
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async function (idToken) {
        try {
          const response = await fetch(
            "https://insta-byrm-server.me.uk/follow/" + props.params.userId,
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
            error: "Follow: error connecting to DB",
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
            "https://insta-byrm-server.me.uk/follow/" + props.params.userId,
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
                error: "Unfollow: error connecting to DB",
              },
            });
          }
        } catch (e) {
          dispatch({
            type: SET_ERROR,
            payload: {
              error: "Unfollow: error connecting to DB",
            },
          });
        }
      })
      .catch(function (error) {
        // Handle error
        dispatch({
          type: SET_ERROR,
          payload: {
            error: "Unfollow: error connecting to DB",
          },
        });
      });
  };

  return (
    <div>
      {user.id ? (
        <div>
          <div className="userprofile-wrapper">
            {!isTabletOrMobile ? (
              <div className="userprofile-avatar-wrapper">
                <Avatar
                  alt="A"
                  src={user.avatar || ""}
                  className={classes.extraLarge}
                />
              </div>
            ) : null}
            <div className="userprofile-info-wrapper">
              <div className="userprofile-info-username">
                {isTabletOrMobile ? (
                  <div className="userprofile-avatar-wrapper">
                    <Avatar
                      alt="A"
                      src={user.avatar || ""}
                      className={classes.medium}
                    />
                  </div>
                ) : // </div>
                null}
                <div className="userprofile-info-username-text">
                  {user.username || ""}
                </div>

                {isFollow ? (
                  <button
                    className="userprofile-editProfile-btn"
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="userprofile-editProfile-btn"
                    onClick={handleFollow}
                  >
                    Follow
                  </button>
                )}
              </div>
              <div className="userprofile-info-subscribers">
                <span className="userprofile-info-text">
                  <span className="userprofile-info-boldText">
                    {Object.entries(user).length ? user.posts.length : 0}
                  </span>{" "}
                  posts
                </span>
                <span className="userprofile-info-text">
                  <span className="userprofile-info-boldText">
                    {Object.entries(user).length ? user.Following.length : 0}
                  </span>{" "}
                  followers
                </span>
                <span className="userprofile-info-text">
                  <span className="userprofile-info-boldText">
                    {Object.entries(user).length ? user.followingIds.length : 0}
                  </span>{" "}
                  following
                </span>
              </div>
              <div className="userprofile-info-name">
                {Object.entries(user).length ? user.name : ""}
              </div>
            </div>
          </div>
          <ProfilePictures {...user} />
        </div>
      ) : (
        <div className="progress-wrapper">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
