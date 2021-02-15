import React from "react";
import Gallery from "../explore/Gallery";

const ProfilePictures = (props) => {
  return (
    <div className="userpicture-wrapper">
      <div className="userpicture-actions-wrapper">
        <div className="userpicture-actions-a profilepicture-actions-a">
          <div>
            <svg
              aria-label="Posts"
              fill="#262626"
              height="12"
              viewBox="0 0 48 48"
              width="12"
            >
              <path
                clipRule="evenodd"
                d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="userpicture-actions-text">posts</span>
          </div>
        </div>
      </div>
      <div>
        <Gallery {...props} />
      </div>
    </div>
  );
};

export default ProfilePictures;
