import React from "react";
import { Link } from "react-router-dom";
import "../Styles/hero.scss";

const Hero = () => {
  return (
    <div className="app__hero">
      <div className="hero__navbar">
        <div className="hero__logo">
          <h1>Poster</h1>
        </div>
        <div className="hero__cta">
          <Link to="/signup">Login</Link>
        </div>
      </div>
      <div className="hero__container">
        <h2>
          Clean streets, clear minds, <br />
          <span>and a better tomorrow.</span>
        </h2>

        <Link to="/signup">Experience the Cleanliness</Link>
      </div>
    </div>
  );
};

export default Hero;
