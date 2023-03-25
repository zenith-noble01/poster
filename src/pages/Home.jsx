import React from "react";
import { Navbar, Posts, Sidebar } from "../components";
import "../Styles/home.scss";

const Home = () => {
  return (
    <div className="app__home">
      <Sidebar />
      <div className="home__container outlet">
        <Navbar />
        <div className="home__content">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Home;
