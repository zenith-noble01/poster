import axios from "axios";
import { apiRoute } from "../Constants";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchQuery,
  setSearchResults,
  setSearchLoading,
  setSearchError,
} from "../redux/search";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export const covertImageToBase64 = (file) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

export async function getUser() {
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

export async function createPost(credentials) {
  try {
    const {
      data: { msg },
    } = await axios.post(`${apiRoute}/post`, credentials);
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export const useSearch = () => {
  const query = useSelector((state) => state.search?.query);
  const results = useSelector((state) => state.search?.results);
  const isLoading = useSelector((state) => state.search?.isLoading);
  const error = useSelector((state) => state.search?.error);
  const dispatch = useDispatch();

  const search = async (query) => {
    try {
      dispatch(setSearchLoading(true));

      if (query.length > 2) {
        const { data } = await axios.get(
          `${apiRoute}/post/all/search?q=${query}`
        );

        dispatch(setSearchResults(data));
      } else {
        const { data } = await axios.get(`${apiRoute}/post/all/search`);
        console.log(data);
        dispatch(setSearchResults(data));
      }
    } catch (error) {
      dispatch(setSearchError(error.message));
    } finally {
      dispatch(setSearchLoading(false));
    }
  };

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
    search(event.target.value);
  };

  return {
    query,
    results,
    isLoading,
    error,
    handleSearch,
  };
};

export async function comomentPost(credentials) {
  try {
    const { postId } = credentials;
    const {
      data: { msg },
    } = await axios.post(`${apiRoute}/comment/${postId}`, credentials);
    return Promise.resolve(msg);
  } catch (error) {
    console.log(error);
  }
}
