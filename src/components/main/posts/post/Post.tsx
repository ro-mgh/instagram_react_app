import React, { useState, FunctionComponent } from "react";
import CommentsField from "./CommentsField";
import LikesField from "./LikesField";
import AddCommentField from "./AddCommentField";
import UserHeaderField from "./UserHeaderField";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface IProps {
  author: {
    avatar: string;
    id: string;
    username: string;
  };
  comments: {
    id: number;
    user: { id: string; username: string };
    comment: string;
  }[];
  createdAt: string;
  id: number;
  image: string;
  likes: { userId: string; postId: number }[];
  text: string;
}

// post component on a main page
const Post: FunctionComponent<IProps> = (props) => {
  const [post, setPost] = useState(props);
  const user = useSelector((state) => state.authReducer.user);

  // handle comments add
  const handleCommentAdd = (text: string) => {
    const currentDate = new Date();
    const newComment = {
      comments: [
        ...post.comments,
        {
          id: +currentDate.getTime(),
          user: { username: user.displayName.split("&&")[0], id: user.uid },
          comment: text,
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
