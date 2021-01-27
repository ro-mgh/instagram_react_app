import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import S3 from "react-aws-s3";
import firebase from "../../../services/firebase";

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
                  const response = await fetch("http://localhost:3000/post", {
                    method: "post",
                    headers: {
                      "Content-type": "application/json",
                      Authorization: "Bearer " + idToken,
                    },
                    body: JSON.stringify({
                      authorId: user.uid,
                      image: data.location,
                    }),
                  });
                  if (response.ok) {
                    // const jsonResponse = await response.json();
                    // console.log(jsonResponse);
                    console.log("updated succesfully in DB");
                  } else {
                    console.error("error updating  to DB");
                  }
                } catch (e) {
                  console.error("error updating  to DB", e);
                }
              });
          } else {
            console.error("error updating  to DB");
          }
        })
        .catch((err) => console.error(err));
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
