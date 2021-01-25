import React, { useState, useEffect } from "react";
import firebase from "../../../../services/firebase";

const CommentsField = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments([]);

    const getComments = async () => {
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(async function (idToken) {
          try {
            const response = await fetch(
              "http://localhost:3000/comment/" + props.id,
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
              setComments(jsonResponse);
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
    // getComments();
  }, []);

  return (
    <div>
      <div className="post-comments-wrapper">
        {comments.length
          ? comments.map((comment) => {
              return (
                <div className="post-comment-field" key={comment.id}>
                  <span className="post-comment-user">
                    {comment.user.username}
                  </span>
                  <span className="post-comment-text">{comment.comment}</span>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default CommentsField;
