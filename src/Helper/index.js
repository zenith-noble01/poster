import axios from "axios";
import { toast } from "react-hot-toast";
import { apiRoute } from "../Constants";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`${apiRoute}/auth/register`, credentials);
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}
export async function loginUser({ email, password }) {
  try {
    const { data } = await axios.post(`${apiRoute}/auth/login`, {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(data));

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}
