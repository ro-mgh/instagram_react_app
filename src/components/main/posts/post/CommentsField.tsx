import React, { useState, useEffect, FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface IComments {
  commentsArr: {
    id: number;
    user: { id: string; username: string };
    comment: string;
  }[];
}

const CommentsField: FunctionComponent<IComments> = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(props.commentsArr);
  }, [props]);

  return (
    <div>
      <div className="post-comments-wrapper">
        {comments.map((comment) => {
          return (
            <div className="post-comment-field" key={comment.id}>
              <Link to={"/profile/" + comment.user.id}>
                <span className="post-comment-user">
                  {comment.user.username}
                </span>
              </Link>
              <span className="post-comment-text">{comment.comment}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsField;
