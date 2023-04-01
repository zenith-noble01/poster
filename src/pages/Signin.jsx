import { useState, useEffect } from "react";
import "../Styles/signup.scss";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginInUser, reset } from "../redux/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      setTimeout(() => {
        toast.success("Login successful...!");
        window.location.reload();
        navigate("/");
      }, 1500);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const { email, password } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginInUser(userData));
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
