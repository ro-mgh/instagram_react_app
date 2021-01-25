import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import User from "./User";
import Footer from "../../../footer/Footer";
import firebase from "../../../../services/firebase";

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

  const [recommendUsers, setRecommendUsers] = useState([]);

  useEffect(() => {
    setRecommendUsers([]);

    const getUsers = async () => {
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(async function (idToken) {
          try {
            const response = await fetch("http://localhost:3000/user", {
              method: "get",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + idToken,
              },
            });
            if (response.ok) {
              const jsonResponse = await response.json();

              setRecommendUsers(jsonResponse);
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
    getUsers();
  }, []);

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
        {recommendUsers
          ? recommendUsers.slice(0, 5).map((user) => {
              return <User {...user} key={user.id} />;
            })
          : null}
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;
