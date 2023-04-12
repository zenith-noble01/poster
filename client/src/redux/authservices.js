import axios from "axios";

const AUTH__URL = "http://localhost:5000/api/auth/";

const registerUser = async (user) => {
  const { data } = await axios.post(AUTH__URL + "register", user);
  return data;
};

const loginUser = async (userData) => {
  const response = await axios.post(AUTH__URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logoutUser = async () => {
  localStorage.removeItem("user");
  window.location.reload();
};

const authServices = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authServices;
