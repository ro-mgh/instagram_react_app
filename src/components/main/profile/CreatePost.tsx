import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import S3 from "react-aws-s3";
import firebase from "../../../services/firebase";
import { exploreUsers } from "../../../store/actions/exploreUsers";
import { SET_ERROR } from "../../../store/actions/actionTypes";
import LinearProgress from "@material-ui/core/LinearProgress";
import { CircularProgress } from "@material-ui/core";

const config = {
  bucketName: "insta-project",
  region: "ap-northeast-2",
  accessKeyId: process.env.REACT_APP_S3_ACCESSKEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRETKEY,
};

// styles for S3 dropfield
const ReactS3Client = new S3(config);

const baseStyle = {};

const activeStyle = {
  borderColor: "00e676",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function CreatePost(props) {
  const user = useSelector((state) => state.authReducer.user);
  const posts = useSelector((state) => state.dataReducer.users);
  const dispatch = useDispatch();
  const [isUploading, setUploading] = useState(false);

  useEffect(() => {
    setUploading(false);
  }, [posts]);

  const onDrop = useCallback((acceptedFiles) => {
    // adding post to DB
    setUploading(true);
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      ReactS3Client.uploadFile(file, user.uid + "&&" + Date.now())
        .then((data) => {
          const user = firebase.auth().currentUser;
          if (user) {
            user
              .getIdToken(/* forceRefresh */ true)
              .then(async function (idToken) {
                try {
                  const response = await fetch(
                    "https://insta-byrm-server.me.uk/post",
                    {
                      method: "post",
                      headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + idToken,
                      },
                      body: JSON.stringify({
                        authorId: user.uid,
                        image: data.location,
                      }),
                    }
                  );
                  if (response.ok) {
                    dispatch(exploreUsers());
                  } else {
                    setUploading(false);
                    dispatch({
                      type: SET_ERROR,
                      payload: {
                        error: "Adding post: error connecting to DB",
                      },
                    });
                  }
                } catch (e) {
                  setUploading(false);
                  dispatch({
                    type: SET_ERROR,
                    payload: {
                      error: "Adding post: error connecting to DB",
                    },
                  });
                }
              });
          } else {
            setUploading(false);
            dispatch({
              type: SET_ERROR,
              payload: {
                error: "Adding post: error connecting to firebase",
              },
            });
          }
        })
        .catch((err) => {
          setUploading(false);
          dispatch({
            type: SET_ERROR,
            payload: {
              error: "Adding post: error connecting to S3",
            },
          });
        });
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div>
      {isUploading ? (
        <div className="post-linear-wrapper">
          <CircularProgress size={30} />
        </div>
      ) : (
        <div className="dragdrop-wrapper">
          <div {...getRootProps({ style })} className="dragdrop-input-wrapper">
            <input {...getInputProps()} className="dragdrop-input-wrapper" />
            <p className="dragdrop-input-p">
              Drag a file here, or click to select files
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
