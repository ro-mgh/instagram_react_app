import React from "react";
import Header from "../header/Header";
import Footer from "../../footer/Footer";
import UserInfo from "./UserInfo";
import UserPictures from "./UserPictures";

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="profile-wrapper">
        <UserInfo />
        <UserPictures />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
