import React from "react";
import { useLocation } from "react-router-dom";
import "../Styles/navbar.scss";
import { sidebarRoutes } from "../Constants";
import { BiSearch, BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { poster } from "../redux/poster";
import { useSearch } from "../Helper";

const Navbar = ({ title }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { handleSearch, query } = useSearch();
  const pathname = location.pathname.split("/")[1];

  const route = sidebarRoutes.find(
    (route) => route.path.split("/")[1] === pathname
  );

  const handleClick = () => {
    dispatch(poster());
  };

  return (
    <div className="app__navbar">
      <h3 className="header">{route ? route?.name : title}</h3>
      <div className="input__container">
        <input
          placeholder="Search for a term"
          onChange={handleSearch}
          value={query}
        />
        <div className="icon">
          <BiSearch />
        </div>
      </div>
      <button onClick={handleClick}>
        <BiPlus /> New Poster
      </button>
    </div>
  );
};

export default Navbar;
