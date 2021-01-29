import React, { useState } from "react";
import firebase from "../../../../services/firebase";

const AddCommentField = ({ onAddComment, id }) => {
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
                const response = await fetch("http://localhost:3000/comment", {
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
                });
                if (response.ok) {
                  const jsonResponse = await response.json();
                  console.log("Comment was added");
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
