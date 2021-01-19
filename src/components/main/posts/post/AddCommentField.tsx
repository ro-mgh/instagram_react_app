import React from "react";

const AddCommentField = (props) => {
  return (
    <div>
      <div className="post-comments-add">
        <form className="post-comments-form">
          <textarea
            className="post-comments-textarea"
            placeholder="Add a comment..."
          ></textarea>
          <button className="follow-button">Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddCommentField;
