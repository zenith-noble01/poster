import React from "react";
import "../Styles/signup.scss";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
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
        <form>
          <div className="input__container">
            <input type="text" placeholder="Firt name" />
            <input type="text" placeholder="Last name" />
          </div>
          <div className="input__container">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input__container">
            <input type="password" placeholder="Password" />
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
