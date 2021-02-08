import React from "react";
import { Link } from "react-router-dom";

const Gallery = (props) => {
  //pictures [] as prop
  console.log("props for gallery ", props);
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
