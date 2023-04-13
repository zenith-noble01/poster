import React from "react";
import "../Styles/profile.scss";
import { Navbar, Sidebar } from "../components";

const Profile = () => {
  return (
    <div className="app__profile">
      <Sidebar />
      <div className="profile__container">
        <Navbar />

        <div className="profile__content"></div>
      </div>
    </div>
  );
};

export default Profile;
