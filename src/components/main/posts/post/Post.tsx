import React, { useState, FunctionComponent } from "react";
import CommentsField from "./CommentsField";
import LikesField from "./LikesField";
import AddCommentField from "./AddCommentField";
import UserHeaderField from "./UserHeaderField";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const post = {
  author: {
    avatar:
      "https://insta-project.s3-ap-northeast-2.amazonaws.com/waladPiWs1XukX995ZBlSNODoTH3.jpeg",
    id: "waladPiWs1XukX995ZBlSNODoTH3",
    username: "burningman",
  },
  comments: [],
  createdAt: "2021-02-19T09:04:02.437Z",
  id: 49,
  image:
    "https://insta-project.s3-ap-northeast-2.amazonaws.com/waladPiWs1XukX995ZBlSNODoTH3&&1613725435570.jpeg",
  likes: [],
  text: null,
};

interface IProps {
  author: {
    avatar: string;
    id: string;
    username: string;
  };
  comments: any[];
  createdAt: string;
  id: number;
  image: string;
  likes: any[];
  text: string;
}

// post component on a main page
const Post: FunctionComponent<IProps> = (props) => {
  const [post, setPost] = useState(props);
  const user = useSelector((state) => state.authReducer.user);

  // handle comments add
  const handleCommentAdd = (text) => {
    const newComment = {
      comments: [
        ...post.comments,
        {
          user: { username: user.displayName.split("&&")[0], id: user.uid },
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
