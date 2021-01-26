import React from "react";

const EditAvatar = (props) => {
  const toggleModal = () => {
    props.onClick();
  };

  return (
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
  );
};

export default EditAvatar;
