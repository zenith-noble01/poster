import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import "../Styles/settings.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logoutUser());

    navigate("/");
  };

  return (
    <div className="app__settings">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Settings;
