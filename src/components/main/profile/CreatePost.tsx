import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import S3 from "react-aws-s3";
import firebase from "../../../services/firebase";
import { exploreUsers } from "../../../store/actions/exploreUsers";
import { SET_ERROR } from "../../../store/actions/actionTypes";

const config = {
  bucketName: "insta-project",
  region: "ap-northeast-2",
  accessKeyId: process.env.REACT_APP_S3_ACCESSKEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRETKEY,
};

const ReactS3Client = new S3(config);

const baseStyle = {
  //   flex: 1,
};

const activeStyle = {
  //   borderColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

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
                    "https://thingproxy.freeboard.io/fetch/http://ec2-13-125-243-221.ap-northeast-2.compute.amazonaws.com/post",
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
                    dispatch({
                      type: SET_ERROR,
                      payload: {
                        error: "Adding post: error connecting to DB",
                      },
                    });
                  }
                } catch (e) {
                  dispatch({
                    type: SET_ERROR,
                    payload: {
                      error: "Adding post: error connecting to DB",
                    },
                  });
                }
              });
          } else {
            dispatch({
              type: SET_ERROR,
              payload: {
                error: "Adding post: error connecting to firebase",
              },
            });
          }
        })
        .catch((err) => {
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
    <div className="dragdrop-wrapper">
      <div {...getRootProps({ style })} className="dragdrop-input-wrapper">
        <input {...getInputProps()} className="dragdrop-input-wrapper" />
        <p className="dragdrop-input-p">
          Drag a file here, or click to select files
        </p>
      </div>
      {/* <div>file:{getInputProps}</div> */}
    </div>
  );
}

export default CreatePost;
