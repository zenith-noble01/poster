import React, { useState } from "react";
import "../Styles/signup.scss";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    handleName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { handleName, username, email, password } = userData;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app__signup">
      <div className="signup__container">
        <h1>Sign up to find work you love</h1>
        <div className="cta__btns">
          <button>
            <FaApple /> Continue with Apple
          </button>
          <button>
            <span className="icon">
              <FaGoogle />
            </span>
            Continue with Google
          </button>
        </div>
        <div className="or__container">
          <div className="or__line">
            <p>OR</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input__container">
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
              value={username}
            />
            <input
              onChange={handleChange}
              name="handleName"
              type="text"
              placeholder="handle ex(@poster)"
              value={handleName}
            />
          </div>
          <div className="input__container">
            <input
              onChange={handleChange}
              name="email"
              value={email}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="input__container">
            <input
              onChange={handleChange}
              name="password"
              value={password}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="input__container">
            <select name="" id="">
              <option value="">cameroon</option>
              <option value="">nigeria</option>
              <option value="">congo</option>
            </select>
          </div>

          <button>Create my account</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
