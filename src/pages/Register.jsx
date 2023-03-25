import React, { useState } from "react";
import "../Styles/auth.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = userData;

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    dispatch(registerUser(user));
  };

  const handleGoogleAuth = () => {};
  const handleGitHubAuth = () => {};

  return (
    <div className="app__auth register">
      <form>
        <p className="auth__header">
          Poster <span>Register</span>
        </p>
        <div className="input__container">
          <input
            onChange={handleChange}
            value={username}
            name="username"
            type="text"
            placeholder="Username..."
          />
        </div>
        <div className="input__container">
          <input
            onChange={handleChange}
            value={email}
            name="email"
            type="email"
            placeholder="Email..."
          />
        </div>
        <div className="input__container">
          <input
            onChange={handleChange}
            value={password}
            name="password"
            type="password"
            placeholder="Password..."
          />
        </div>

        <button className="auth__action" onClick={handleSubmit}>
          Register
        </button>
        <div className="or__container">
          <div className="or__text">
            <p>OR</p>
          </div>
          <div className="or__wrapper">
            <button className="google" onClick={handleGoogleAuth}>
              Google
            </button>
            <button className="github" onClick={handleGitHubAuth}>
              Github
            </button>
          </div>
        </div>

        <p className="linkWrapper">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
