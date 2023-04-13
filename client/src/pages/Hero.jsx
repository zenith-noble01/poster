import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/hero.scss";
import { Link } from "react-router-dom";
import { flyershare } from "../Images";
import { features, pricing } from "../Constants";
import { Tilt } from "react-tilt";
import { BiMoon, BiSun } from "react-icons/bi";

function Hero() {
  const [theme, setTheme] = useState("light");

  const pageVariants = {
    initial: {
      opacity: 0,
      y: "-100vh",
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: "100vh",
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  const handleChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.div
      className={`${theme === "light" ? "app__hero" : "app__hero dark"}`}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <header>
        <nav>
          <div className="logo">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              PromoPilot
            </motion.h1>
          </div>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <Link className="cta" to="/signin">
              Login
            </Link>
            <div className="theme__switcher" onClick={handleChangeTheme}>
              {theme === "dark" ? <BiMoon /> : <BiSun />}
            </div>
          </ul>
        </nav>
      </header>
      <main>
        <motion.section
          className="hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="left__hero">
            <h1>
              Revolutionize Your <br />
              <span>Event Promotion</span>
            </h1>
            <p>
              Say goodbye to costly flyers and low response rates with Poster.
            </p>
            <motion.a
              href="/signin"
              className="cta-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Create Your Flyer
            </motion.a>
          </div>

          <div className="right__hero">
            <img src={flyershare} alt="" />
          </div>
        </motion.section>
        <motion.section
          className="features"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Features</h2>

          <ul>
            {features.map((feature, index) => (
              <Tilt options={defaultOptions} key={index}>
                <li>{feature.name}</li>
              </Tilt>
            ))}
          </ul>
        </motion.section>
        <motion.section
          className="pricing"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Pricing</h2>
          <ul>
            {pricing.map((price, index) => (
              <Tilt options={defaultOptions} key={index}>
                <li>{price.name}</li>
              </Tilt>
            ))}
          </ul>
        </motion.section>
      </main>
      <footer>
        <p>&copy; {currentYear} Poster. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}

export default Hero;
