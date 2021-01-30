import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userData } from "../../../store/actions/userData";
import S3 from "react-aws-s3";
import firebase from "../../../services/firebase";

const config = {
  bucketName: "insta-project",
  region: "ap-northeast-2",
  accessKeyId: process.env.REACT_APP_S3_ACCESSKEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRETKEY,
};

const ReactS3Client = new S3(config);

const EditAvatar = (props) => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const toggleModal = () => {
    props.onClick();
  };

  const uploadAvatar = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      ReactS3Client.uploadFile(file, user.uid)
        .then((data) => {
          const user = firebase.auth().currentUser;
          if (user) {
            user.updateProfile({
              photoURL: data.location,
            });
            user
              .getIdToken(/* forceRefresh */ true)
              .then(async function (idToken) {
                try {
                  const response = await fetch(
                    "http://localhost:3000/user/" + user.uid,
                    {
                      method: "put",
                      headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + idToken,
                      },
                      body: JSON.stringify({
                        avatar: data.location,
                      }),
                    }
                  );
                  if (response.ok) {
                    // const jsonResponse = await response.json();
                    // console.log(jsonResponse);
                    dispatch(userData());
                    console.log("updated succesfully in DB");
                  } else {
                    console.error("error updating photo to DB");
                  }
                } catch (e) {
                  console.error("error updating photo to DB", e);
                }
              });
          } else {
            console.error("error updating photo to DB");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  // {bucket: "insta-project", key: "testFile.png",
  //   location: "https://insta-project.s3-ap-northeast-2.amazonaws.com/testFile.png", status: 204}

  const deleteAvatar = (e) => {
    e.preventDefault();
    ReactS3Client.deleteFile(user.uid)
      .then((data) => {
        console.log("Photo deleted");
      })
      .catch((err) => console.error(err));
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        user.updateProfile({
          photoURL: "",
        });
        user.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
          try {
            const response = await fetch(
              "http://localhost:3000/user/" + user.uid,
              {
                method: "put",
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + idToken,
                },
                body: JSON.stringify({
                  avatar: "",
                }),
              }
            );
            if (response.ok) {
              // const jsonResponse = await response.json();
              // console.log(jsonResponse);
              console.log("updated succesfully in DB");
            } else {
              console.error("error updating photo to DB");
            }
          } catch (e) {
            console.error("error updating photo to DB", e);
          }
        });
      } else {
        console.error("error updating photo to DB");
      }
    } catch (e) {
      console.error("error updating photo to DB");
    }
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <h2 className="modal-text">Change Profile Photo</h2>
        <label
          htmlFor="upload-photo"
          className="modal-button image-input-label"
        >
          Upload Photo
        </label>
        <input
          className="image-input"
          onChange={uploadAvatar}
          type="file"
          accept="image/png"
          alt=""
          id="upload-photo"
        />
        <button
          className="modal-button modal-button-remove"
          onClick={deleteAvatar}
        >
          Remove Current Photo
        </button>
        <button onClick={toggleModal} className="modal-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditAvatar;
