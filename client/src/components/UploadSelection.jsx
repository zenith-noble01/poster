import React from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FaPlus, FaQuestion } from "react-icons/fa";

const UploadSelection = ({ handleClick, upload }) => {
  return (
    <div className="newpost__container">
      <div className="container__header">
        <FaPlus className="plus" onClick={handleClick} />
        <p>Upload assets to create a Poster</p>
        <FaQuestion />
      </div>
      <div className="upload__container">
        <label htmlFor="file">
          <input
            type="file"
            name=""
            id="file"
            onChange={upload}
            style={{
              display: "none",
            }}
          />
          <BsFillArrowUpCircleFill />
          <p>
            Drap and drop or click to <br /> add image Poster
          </p>

          <span>
            We recommend using high quality .jpg files less than 20MB.
          </span>
        </label>
      </div>
      <div className="another">
        <p>Looking on how to create a better poster?</p>
        <button>See Here</button>
      </div>
    </div>
  );
};

export default UploadSelection;
