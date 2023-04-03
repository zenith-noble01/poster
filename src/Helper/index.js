import axios from "axios";
import { apiRoute } from "../Constants";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export const covertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export async function getuser() {
  const token = localStorage.getItem("user");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  return decode;
}

export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
    } = await axios.post(`${apiRoute}/auth/register`, credentials);
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}
export async function loginUser({ email, password }) {
  try {
    const {
      data: { token },
    } = await axios.post(`${apiRoute}/auth/login`, {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(token));
    return Promise.resolve({ token });
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}
