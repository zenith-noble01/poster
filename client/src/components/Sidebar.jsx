import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/sidebar.scss";
import { toogleTheme } from "../redux/theme";
import { apiRoute, sidebarRoutes } from "../Constants";
import { Link, NavLink } from "react-router-dom";
import { BiMoon, BiSun } from "react-icons/bi";
import { getUser } from "../Helper";
import { noAvatar } from "../Images";
import axios from "axios";
import GreetingsAnimation from "./Greetings";

const Sidebar = () => {
  const theme = useSelector((state) => state.theme);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDetails = async () => {
      const { userId } = await getUser();
      const { data } = await axios.get(`${apiRoute}/auth/u/${userId}`);
      setUser(data);
    };
    getUserDetails();
  }, []);

  const handleChangeTheme = () => {
    dispatch(toogleTheme());
  };

  console.log(user);
  return (
    <div className="app__sidebar">
      <div className="logo">
        <GreetingsAnimation />
      </div>
      <ul className="sidebar__routes">
        {sidebarRoutes.map((route, index) => (
          <NavLink to={route.path} key={index}>
            <route.icon /> {route.name}
          </NavLink>
        ))}
      </ul>

      <div className="theme__container">
        <div className={`theme ${theme}`} onClick={handleChangeTheme}>
          <div className="icon">
            {theme === "dark" ? <BiMoon /> : <BiSun />}
          </div>
        </div>
        <Link to="/profile/222" className="user__container">
          <img src={user?.profile ? user?.profile : noAvatar} alt="" />
          <p>
            {user?.username} <span>{user?.email}</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
