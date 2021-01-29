import React, { useEffect } from "react";
import Header from "../header/Header";
import UserInfo from "./UserInfo";
import UserPictures from "./UserPictures";
import FooterBottom from "../../footer/FooterBottom";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";

const Profile = ({ match, location }) => {
  const user = useSelector((state) => state.authReducer.user);
  // useEffect(() => {}, []);

  return (
    <div>
      <Header />
      <div className="profile-wrapper">
        {match.params.userId === user.uid ? (
          <div>
            <UserInfo />
            <UserPictures />
          </div>
        ) : (
          <ProfileInfo {...match} />
        )}
      </div>
      <FooterBottom />
    </div>
  );
};

export default Profile;
