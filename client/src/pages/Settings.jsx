import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import "../Styles/settings.scss";
import { Sidebar } from "../components";
import { useEffect } from "react";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const handleClick = () => {
    dispatch(logoutUser());

    navigate("/");
  };

  useEffect(() => {
    !user && navigate("/");
  });

  return (
    <div className="app__settings">
      <Sidebar />
      <div className="settings__container">
        <button onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
};

export default Settings;
