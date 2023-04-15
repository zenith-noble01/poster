import React, { useEffect, useState } from "react";
import "../Styles/profile.scss";
import { Navbar, Sidebar } from "../components";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { apiRoute } from "../Constants";
import { cover, user as profileImg } from "../Images";

const Profile = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  const path = pathname.split("/")[2];

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${apiRoute}/auth/u/${path}`);

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [path]);

  console.log(user);

  return (
    <div className="app__profile">
      <Sidebar />
      <div className="profile__container">
        <Navbar />

        <div className="profile__content">
          <div className="profile__cover">
            <img src={cover} alt="" className="user__coverImg" />
            <div className="profile__imgContainer">
              <img src={profileImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
