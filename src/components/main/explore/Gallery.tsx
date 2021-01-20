import React from "react";

import mockedUser from "../../../mocked_files/mocked_user_profile";

const Gallery = (props) => {
  return (
    <div className="userpicture-wrapper">
      <div className="userpicture-posts-wrapper">
        {props.pictures.map((picture) => {
          return (
            <a href="/picture" key={picture.id}>
              <img
                className="userpicture-posts-img"
                src={picture.pic}
                alt=""
                key={picture.id}
              ></img>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
