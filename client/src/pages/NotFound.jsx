import React from "react";
import "../Styles/notfound.scss";
import { notFound } from "../Images";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();

  const path = pathname.split("/")[1];

  return (
    <div className="app__notfound">
      <img src={notFound} alt="" />
      <h1>Page NotFound @ {path} </h1>
    </div>
  );
};

export default NotFound;
