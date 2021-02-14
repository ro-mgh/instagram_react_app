import React, { useState } from "react";
import firebase from "../../../../services/firebase";
import { useDispatch } from "react-redux";
import { SET_ERROR } from "../../../../store/actions/actionTypes";

const AddCommentField = ({ onAddComment, id }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleCommentAdd = async (event) => {
    event.preventDefault();
    if (text) {
      setText("");
      onAddComment(text);
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          user
            .getIdToken(/* forceRefresh */ true)
            .then(async function (idToken) {
              try {
                const response = await fetch(
                  "http://ec2-13-125-243-221.ap-northeast-2.compute.amazonaws.com/comment",
                  {
                    method: "post",
                    headers: {
                      "Content-type": "application/json",
                      Authorization: "Bearer " + idToken,
                    },
                    body: JSON.stringify({
                      userId: user.uid,
                      postId: id,
                      comment: text,
                    }),
                  }
                );
                if (!response.ok) {
                  dispatch({
                    type: SET_ERROR,
                    payload: {
                      error: "Adding comment: error connecting to DB",
                    },
                  });
                }
              } catch (e) {
                dispatch({
                  type: SET_ERROR,
                  payload: { error: "Adding comment: error connecting to DB" },
                });
              }
            })
            .catch(function (error) {
              dispatch({
                type: SET_ERROR,
                payload: { error: "Adding comment: error connecting to DB" },
              });
            });
        } else {
          dispatch({
            type: SET_ERROR,
            payload: { error: "Adding comment: error connecting to firebase" },
          });
        }
      } catch (e) {
        dispatch({
          type: SET_ERROR,
          payload: { error: "Adding comment: error connecting to DB" },
        });
      }
    }
  };

  return (
    <div>
      <div className="post-comments-add">
        <form className="post-comments-form" onSubmit={handleCommentAdd}>
          <textarea
            className="post-comments-textarea"
            placeholder="Add a comment..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <button className="follow-button">Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddCommentField;
