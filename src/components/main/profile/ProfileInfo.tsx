import React, { useState, useEffect, FunctionComponent } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import firebase from "../../../services/firebase";

import ProfilePictures from "./ProfilePictures";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    extraLarge: {
      width: theme.spacing(17),
      height: theme.spacing(17),
    },
  })
);

const ProfileInfo: FunctionComponent = (props) => {
  const classes = useStyles();
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
    const getUserData = () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          user
            .getIdToken(/* forceRefresh */ true)
            .then(async function (idToken) {
              try {
                const response = await fetch(
                  "http://localhost:3000/user/" + props.params.userId,
                  {
                    method: "get",
                    headers: {
                      "Content-type": "application/json",
                      Authorization: "Bearer " + idToken,
                    },
                  }
                );
                if (response.ok) {
                  const jsonResponse = await response.json();
                  console.log("responseUser", jsonResponse);
                  setUser(jsonResponse);
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
        } else {
          console.log("error in getting user's data");
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      <div className="userprofile-wrapper">
        <div className="userprofile-avatar-wrapper">
          <Avatar
            alt="A"
            src={user.avatar || ""}
            className={classes.extraLarge}
          />
        </div>
        <div className="userprofile-info-wrapper">
          <div className="userprofile-info-username">
            <div className="userprofile-info-username-text">
              {user.username || ""}
            </div>
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
  );
};

export default ProfileInfo;
