import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import mockedUser from "../../../mocked_files/mocked_user_profile";
import Modal from "./Modal";
import Signout from "../signout/Signout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    extraLarge: {
      width: theme.spacing(17),
      height: theme.spacing(17),
    },
  })
);

const UserInfo = () => {
  const classes = useStyles();
  const [showModal, setModal] = useState(false);

  const toggleModal = () => setModal(!showModal);

  return (
    <div>
      <div className="userprofile-wrapper">
        <div className="userprofile-avatar-wrapper">
          <Avatar alt="A" src="" className={classes.extraLarge} />
        </div>
        <div className="userprofile-info-wrapper">
          <div className="userprofile-info-username">
            <div className="userprofile-info-username-text">
              {mockedUser.username}
            </div>
            <button
              className="userprofile-editProfile-btn"
              onClick={toggleModal}
            >
              Edit Profile
            </button>
            <button className="userprofile-settings-btn">
              <svg
                aria-label="Options"
                className=""
                fill="#262626"
                height="24"
                viewBox="0 0 48 48"
                width="24"
              >
                <path
                  clipRule="evenodd"
                  d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
            {showModal ? (
              <Modal>
                <div className="modal">
                  <div className="modal-wrapper">
                    <h2 className="modal-text">Change Profile Photo</h2>
                    <button className="modal-button">Upload Photo</button>
                    <button className="modal-button modal-button-remove">
                      Remove Current Photo
                    </button>
                    <button onClick={toggleModal} className="modal-button">
                      Cancel
                    </button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </div>
          <div className="userprofile-info-subscribers">
            <span className="userprofile-info-text">
              <span className="userprofile-info-boldText">
                {mockedUser.pictures.length + " "}
              </span>
              posts
            </span>
            <span className="userprofile-info-text">
              <span className="userprofile-info-boldText">
                {mockedUser.pictures.length + " "}
              </span>
              followers
            </span>
            <span className="userprofile-info-text">
              <span className="userprofile-info-boldText">
                {mockedUser.pictures.length + " "}
              </span>
              following
            </span>
          </div>
          <div className="userprofile-info-name">{mockedUser.name}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;