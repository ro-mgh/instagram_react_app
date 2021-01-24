import React from "react";
import Header from "../header/Header";
import FooterBottom from "../../footer/FooterBottom";
import mockedPicture from "../../../mocked_files/mocked_picture";
import CommentsField from "../posts/post/CommentsField";
import LikesField from "../posts/post/LikesField";
import AddCommentField from "../posts/post/AddCommentField";
import UserHeaderField from "../posts/post/UserHeaderField";
import firebase from "../../../services/firebase";

const Picture = () => {
  const testrequest = async (e) => {
    e.preventDefault();
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(async function (idToken) {
        // // Send token to your backend via HTTPS
        // console.log(idToken);
        // auth = idToken;
        try {
          const response = await fetch("http://localhost:3000/comment", {
            method: "post",
            // headers: {
            //   "Content-type": "application/json",
            //   Authorization: localStorage.getItem("token"),
            // },
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + idToken,
            },
            body: JSON.stringify({
              userId: 4,
              postId: 1,
              comment: "one more",
            }),
          });
          if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
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
    <div>
      <Header />
      <div className="picture-wrapper">
        <img src={mockedPicture.post} className="picture-img" alt=""></img>
        <div className="picture-comments-wrapper">
          {/* <div className="picture-comments-header">
            <a href="/user">
              <Avatar alt="A" src="" className={classes.medium} />
            </a>
            <div className="picture-header-username">
              <a className="username-font" href="/user">
                {mockedPicture.username}
              </a>
            </div>
          </div> */}
          <div className="picture-username-field">
            <UserHeaderField {...mockedPicture} />
          </div>
          <div className="picture-comments-field">
            <CommentsField {...mockedPicture} />
          </div>
          <div className="picture-likes-field">
            <LikesField {...mockedPicture} />
          </div>
          <div className="picture-addcomments-field">
            <AddCommentField {...mockedPicture} />
          </div>
        </div>
        <button onClick={testrequest}>test</button>
      </div>
      <FooterBottom />
    </div>
  );
};

export default Picture;
