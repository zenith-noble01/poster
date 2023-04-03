import { useEffect, useState } from "react";
import "../Styles/signup.scss";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { loginInUser, reset } from "../redux/authSlice";
import { loginUser } from "../Helper";
import { useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const { email, password } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loginPromise = loginUser(userData);

    toast.promise(loginPromise, {
      loading: "Checking info...",
      success: <b>Login Successfully...!</b>,
      error: <b>Could not Login user...!</b>,
    });

    loginPromise.then(function () {
      setTimeout(() => {
        window.location.reload();
        navigate("/");
      }, 2000);
    });
  };

  return (
    <div className="app__signup">
      <Toaster position="top-center" />
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

          <button>Login Now</button>
          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
