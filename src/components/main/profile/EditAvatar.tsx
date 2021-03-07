import React, { useState, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { exploreUsers } from "../../../store/actions/exploreUsers";
import S3 from "react-aws-s3";
import firebase from "../../../services/firebase";
import { SET_ERROR } from "../../../store/actions/actionTypes";
import CircularProgress from "@material-ui/core/CircularProgress";

const config = {
  bucketName: "insta-project",
  region: "ap-northeast-2",
  accessKeyId: process.env.REACT_APP_S3_ACCESSKEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRETKEY,
};

const ReactS3Client = new S3(config);

const EditAvatar: FunctionComponent<{ onClick: () => void }> = (props) => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const [isUploading, setUploading] = useState(false);
  const [isRemoving, setRemoving] = useState(false);

  const toggleModal = () => {
    props.onClick();
  };

  const uploadAvatar = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
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
                    "https://insta-byrm-server.me.uk/user/" + user.uid,
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
                    dispatch(exploreUsers());
                    setUploading(false);
                  } else {
                    setUploading(false);
                    dispatch({
                      type: SET_ERROR,
                      payload: {
                        error: "Uploading avatar: error connecting to DB",
                      },
                    });
                  }
                } catch (e) {
                  setUploading(false);
                  dispatch({
                    type: SET_ERROR,
                    payload: {
                      error: "Uploading avatar: error connecting to DB",
                    },
                  });
                }
              });
          } else {
            setUploading(false);
            dispatch({
              type: SET_ERROR,
              payload: {
                error: "Uploading avatar: error connecting to firebase",
              },
            });
          }
        })
        .catch(() => {
          setUploading(false);
          dispatch({
            type: SET_ERROR,
            payload: {
              error: "Uploading avatar: error connecting to S3",
            },
          });
        });
    }
  };

  const deleteAvatar = (e) => {
    e.preventDefault();
    setRemoving(true);
    ReactS3Client.deleteFile(user.uid)
      .then(() => {
        // console.log("Photo deleted");
      })
      .catch(() => {
        // console.error(err);
      });
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        user.updateProfile({
          photoURL: "",
        });
        user.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
          try {
            const response = await fetch(
              "https://insta-byrm-server.me.uk/user/" + user.uid,
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
              setRemoving(false);
              dispatch(exploreUsers());
            } else {
              setRemoving(false);
              dispatch({
                type: SET_ERROR,
                payload: {
                  error: "Delete avatar: error connecting to DB",
                },
              });
            }
          } catch (e) {
            setRemoving(false);
            dispatch({
              type: SET_ERROR,
              payload: {
                error: "Delete avatar: error connecting to DB",
              },
            });
          }
        });
      } else {
        setRemoving(false);
        dispatch({
          type: SET_ERROR,
          payload: {
            error: "Delete avatar: error connecting to firebase",
          },
        });
      }
    } catch (e) {
      setRemoving(false);
      dispatch({
        type: SET_ERROR,
        payload: {
          error: "Delete avatar: error connecting to firebase",
        },
      });
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
          {isUploading ? (
            <div className="mainfield-progress-wrapper">
              <CircularProgress size={20} />
            </div>
          ) : (
            <div>Upload Photo</div>
          )}
        </label>
        <input
          className="image-input"
          onChange={uploadAvatar}
          type="file"
          accept="image/png, image/jpeg"
          alt=""
          id="upload-photo"
        />
        <button
          className="modal-button modal-button-remove"
          onClick={deleteAvatar}
        >
          {isRemoving ? (
            <div className="mainfield-progress-wrapper">
              <CircularProgress size={20} />
            </div>
          ) : (
            <div>Remove Current Photo</div>
          )}
        </button>
        <button onClick={toggleModal} className="modal-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditAvatar;
