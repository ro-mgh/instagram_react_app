import React from "react";
import Header from "../header/Header";
import UserInfo from "./UserInfo";
import FooterBottom from "../../footer/FooterBottom";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import AlertPop from "../errors/AlertPop";

const Profile = ({ match, location }) => {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <div>
      <Header />
      <div className="profile-wrapper">
        {match.params.userId === user.uid ? (
          <div>
            <UserInfo />
            <AlertPop />
          </div>
        ) : (
          <div>
            <ProfileInfo {...match} />
            <AlertPop />
          </div>
        )}
      </div>
      <FooterBottom />
    </div>
  );
};

export default Profile;
