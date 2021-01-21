import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  //   flex: 1,
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   padding: "20px",
  //   borderWidth: 4,
  //   borderRadius: 2,
  //   borderColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  //   borderStyle: "dashed",
  //   backgroundColor: "#fafafa",
  //   color: "#bdbdbd",
  //   outline: "none",
  //   transition: "border .24s ease-in-out",
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
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles[0]);
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
