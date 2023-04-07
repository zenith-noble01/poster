import React from "react";
import { FaPowerOff } from "react-icons/fa";
import "../Styles/offline.scss";

const Offline = () => {
  return (
    <div className="app__offline">
      <p>Currently</p>
      <h1>
        <FaPowerOff />
        FFLINE
      </h1>
    </div>
  );
};

export default Offline;
