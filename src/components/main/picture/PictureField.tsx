import React, { useEffect } from "react";
import CommentsField from "../posts/post/CommentsField";
import LikesField from "../posts/post/LikesField";
import AddCommentField from "../posts/post/AddCommentField";
import UserHeaderField from "../posts/post/UserHeaderField";
import firebase from "../../../services/firebase";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SET_ERROR } from "../../../store/actions/actionTypes";
import { useMediaQuery } from "react-responsive";
import { RouteComponentProps } from "react-router";

// post/image page

const PictureField: RouteComponentProps = ({ match }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const [post, setPost] = React.useState({
    id: undefined,
    image: "",
    text: "",
    author: {
      username: "",
      id: "",
      avatar: "",
    },
    comments: [],
    likes: [],
    createdAt: "",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 620px)" });

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
                  "https://insta-byrm-server.me.uk/post/" +
                    match.params.pictureId,
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
                  console.log(jsonResponse);
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
            .catch(function () {
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
          user: { username: user.displayName.split("&&")[0], id: user.uid },
          comment: text,
          id: Date.now(),
        },
      ],
    };
    setPost({ ...post, ...newComment });
  };

  return (
    <div>
      {post.id ? (
        !isTabletOrMobile ? (
          <div className="picture-wrapper" data-testid="picture">
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
          <article className="post-wrapper picture-wrapper-mobile">
            <UserHeaderField {...post} />
            <img className="post-img" src={post.image} alt=""></img>
            <LikesField {...post} />
            <CommentsField commentsArr={post.comments} />
            <div className="post-date">
              {new Date(post.createdAt).toDateString()}
            </div>
            <AddCommentField {...post} onAddComment={handleCommentAdd} />
          </article>
        )
      ) : (
        <div className="progress-wrapper" data-testid="progress">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default PictureField;
