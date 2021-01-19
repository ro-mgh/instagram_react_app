import React from "react";

const CommentsField = (props) => {
  return (
    <div>
      <div className="post-comments-wrapper">
        {props.comments.map((comment) => {
          return (
            <div className="post-comment-field" key={comment.id}>
              <span className="post-comment-user">{comment.name}</span>
              <span className="post-comment-text">{comment.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsField;
