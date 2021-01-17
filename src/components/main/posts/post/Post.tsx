import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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
      <div className="post-header">
        <a href="/user">
          <Avatar alt="A" src="" className={classes.medium} />
        </a>
        <div className="post-header-username">
          <a className="username-font" href="/user">
            {props.username}
          </a>
        </div>
      </div>
      <img className="post-img" src={props.post} alt=""></img>
      <div className="post-icons">
        <div>like</div>
        <div>Comment</div>
        <div>Share</div>
      </div>
      <div className="post-likes">{props.likes}</div>
      <div className="post-comments"></div>
      <div className="post-comments-add"></div>
    </article>
  );
};

export default Post;
