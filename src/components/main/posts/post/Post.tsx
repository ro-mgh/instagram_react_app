import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CommentsField from "./CommentsField";
import LikesField from "./LikesField";
import AddCommentField from "./AddCommentField";
import UserHeaderField from "./UserHeaderField";

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
  return (
    <article className="post-wrapper">
      <UserHeaderField {...props} />
      <img className="post-img" src={props.post} alt=""></img>
      <LikesField {...props} />
      <CommentsField {...props} />
      <AddCommentField {...props} />
    </article>
  );
};

export default Post;
