import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/sidebar.scss";
import { toogleTheme } from "../redux/theme";
import { sidebarRoutes } from "../Constants";
import { Link, NavLink } from "react-router-dom";
import { BiMoon, BiSun } from "react-icons/bi";
import { user } from "../Images";

const Sidebar = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    dispatch(toogleTheme());
  };
  return (
    <div className="app__sidebar">
      <div className="logo">
        <h1>Poster</h1>
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
          <img src={user} alt="" />
          <p>
            Wilfried Fossele <span>fossele@gmail.com</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
