import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CommentsField from "./CommentsField";
import LikesField from "./LikesField";
import AddCommentField from "./AddCommentField";
import UserHeaderField from "./UserHeaderField";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    medium: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  })
);

const Post = (props) => {
  const classes = useStyles();
  const [post, setPost] = useState(props);
  const user = useSelector((state) => state.authReducer.user);

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
    <article className="post-wrapper">
      <UserHeaderField {...post} />
      <img className="post-img" src={post.image} alt=""></img>
      <LikesField {...post} />
      {post.comments.length > 2 ? (
        <Link to={"/picture/" + post.id}>
          <div className="post-viewComments">
            View all {post.comments.length} comments
          </div>
        </Link>
      ) : null}
      <CommentsField commentsArr={post.comments.slice(-2)} />
      <div className="post-date">{new Date(post.createdAt).toDateString()}</div>
      <AddCommentField {...post} onAddComment={handleCommentAdd} />
    </article>
  );
};

export default Post;
