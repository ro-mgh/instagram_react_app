import React from "react";
import Header from "../header/Header";
import FooterBottom from "../../footer/FooterBottom";

import mockedPicture from "../../../mocked_files/mocked_picture";
import CommentsField from "../posts/post/CommentsField";
import LikesField from "../posts/post/LikesField";
import AddCommentField from "../posts/post/AddCommentField";
import UserHeaderField from "../posts/post/UserHeaderField";

const Picture = () => {
  return (
    <div>
      <Header />
      <div className="picture-wrapper">
        <img src={mockedPicture.post} className="picture-img" alt=""></img>
        <div className="picture-comments-wrapper">
          {/* <div className="picture-comments-header">
            <a href="/user">
              <Avatar alt="A" src="" className={classes.medium} />
            </a>
            <div className="picture-header-username">
              <a className="username-font" href="/user">
                {mockedPicture.username}
              </a>
            </div>
          </div> */}
          <div className="picture-username-field">
            <UserHeaderField {...mockedPicture} />
          </div>
          <div className="picture-comments-field">
            <CommentsField {...mockedPicture} />
          </div>
          <div className="picture-likes-field">
            <LikesField {...mockedPicture} />
          </div>
          <div className="picture-addcomments-field">
            <AddCommentField {...mockedPicture} />
          </div>
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default Picture;
