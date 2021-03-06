import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface IProps {
  posts: { id: number; name: string; image: string }[];
}

const Gallery: FunctionComponent<IProps> = (props) => {
  //pictures [] as prop
  return (
    <div className="userpicture-wrapper">
      <div className="userpicture-posts-wrapper">
        {props.posts
          ? props.posts.map((post) => {
              return (
                <div className="userpicture-gallery-wrapper" key={post.id}>
                  <Link to={"/picture/" + post.id}>
                    <img
                      className="userpicture-posts-img"
                      src={post.image}
                      alt=""
                      key={post.id}
                    ></img>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Gallery;
