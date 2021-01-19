import React from "react";
import Header from "../header/Header";
import Footer from "../../footer/Footer";
import UserInfo from "./UserInfo";
import UserPictures from "./UserPictures";
import FooterBottom from "../../footer/FooterBottom";

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="profile-wrapper">
        <UserInfo />
        <UserPictures />
      </div>
      <FooterBottom />
    </div>
  );
};

export default Profile;
