import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { poster } from "../redux/poster";
import "../Styles/newPost.scss";
import { Upload, UploadSelection } from "./";
import { covertImageToBase64 } from "../helper";

const NewPost = () => {
  const [file, setFile] = useState(null);
  const [allow, setAllow] = useState(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(poster());
  };

  const upload = async (e) => {
    const base64 = await covertImageToBase64(e.target.files[0]);
    setFile(base64);
  };

  console.log(allow);

  return (
    <div className="app__newpost__container">
      {file ? (
        <Upload
          setAllow={setAllow}
          allow={allow}
          setFile={setFile}
          file={file}
        />
      ) : (
        <UploadSelection handleClick={handleClick} upload={upload} />
      )}
    </div>
  );
};

export default NewPost;
