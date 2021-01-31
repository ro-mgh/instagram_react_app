import React from "react";
import { Link } from "react-router-dom";

const Gallery = (props) => {
  //pictures [] as prop
  return (
    <div className="userpicture-wrapper">
      <div className="userpicture-posts-wrapper">
        {props.posts
          ? props.posts.map((post) => {
              return (
                <Link to={"/picture/" + post.id} key={post.id}>
                  <img
                    className="userpicture-posts-img"
                    src={post.image}
                    alt=""
                    key={post.id}
                  ></img>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Gallery;
