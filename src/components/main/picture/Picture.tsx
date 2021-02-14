import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import FooterBottom from "../../footer/FooterBottom";
import CommentsField from "../posts/post/CommentsField";
import LikesField from "../posts/post/LikesField";
import AddCommentField from "../posts/post/AddCommentField";
import UserHeaderField from "../posts/post/UserHeaderField";
import firebase from "../../../services/firebase";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import AlertPop from "../errors/AlertPop";
import { SET_ERROR } from "../../../store/actions/actionTypes";

// post/image page

const Picture = ({ match, location }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const [post, setPost] = useState({
    id: "",
    image: "",
    text: "",
    author: {
      username: "",
      id: "",
    },
    comments: [],
    likes: [],
    createdAt: "",
  });

  // getting post info from DB
  useEffect(() => {
    const getPost = () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          user
            .getIdToken(/* forceRefresh */ true)
            .then(async function (idToken) {
              try {
                const response = await fetch(
                  "http://ec2-13-125-243-221.ap-northeast-2.compute.amazonaws.com/post/" + match.params.pictureId,
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

                  setPost(jsonResponse);
                } else {
                  dispatch({
                    type: SET_ERROR,
                    payload: { error: "Post: error connecting to DB" },
                  });
                }
              } catch (e) {
                dispatch({
                  type: SET_ERROR,
                  payload: { error: "Post: error connecting to DB" },
                });
              }
            })
            .catch(function (error) {
              // Handle error
              dispatch({
                type: SET_ERROR,
                payload: { error: "Post: error connecting to DB" },
              });
            });
        } else {
          dispatch({
            type: SET_ERROR,
            payload: { error: "Post: error connecting to firebase" },
          });
        }
      } catch (e) {
        dispatch({
          type: SET_ERROR,
          payload: { error: "Post: error connecting to DB" },
        });
      }
    };
    getPost();
  }, []);

  const handleCommentAdd = (text) => {
    const newComment = {
      comments: [
        ...post.comments,
        {
          user: { username: user.displayName.split("&&")[0], userId: user.uid },
          comment: text,
          id: Date.now(),
        },
      ],
    };
    setPost({ ...post, ...newComment });
  };

  return (
    <div>
      <Header />
      {post.id ? (
        <div className="picture-wrapper">
          <img src={post.image} className="picture-img" alt=""></img>
          <div className="picture-comments-wrapper">
            <div className="picture-username-field">
              <UserHeaderField {...post} />
            </div>
            <div className="picture-comments-field">
              <CommentsField commentsArr={post.comments} />
            </div>
            <div className="picture-likes-field">
              <LikesField {...post} />
            </div>
            <div className="post-date">
              {new Date(post.createdAt).toDateString()}
            </div>
            <div className="picture-addcomments-field">
              <AddCommentField {...post} onAddComment={handleCommentAdd} />
            </div>
          </div>
        </div>
      ) : (
        <div className="progress-wrapper">
          <CircularProgress />
        </div>
      )}
      <FooterBottom />
      <AlertPop />
    </div>
  );
};

export default Picture;
