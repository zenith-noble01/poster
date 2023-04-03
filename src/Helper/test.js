import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Make API Requests */

/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

/** get User details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);

    let { username, email } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** login function */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

/** update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

/** generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** verify OTP */
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

// To create a search hook with Redux, you can follow these steps:

// Create a new Redux slice for search state using
// createSlice
//  from
// @reduxjs/toolkit
// .
// import { createSlice } from "@reduxjs/toolkit";

// const searchSlice = createSlice({
//   name: "search",
//   initialState: {
//     query: "",
//     results: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     setSearchQuery: (state, action) => {
//       state.query = action.payload;
//     },
//     setSearchResults: (state, action) => {
//       state.results = action.payload;
//     },
//     setSearchLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//     setSearchError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   setSearchQuery,
//   setSearchResults,
//   setSearchLoading,
//   setSearchError,
// } = searchSlice.actions;

// export default searchSlice.reducer;
// Create a custom hook that uses
// useSelector
//  and
// useDispatch
//  hooks from
// react-redux
//  to access and update the search state.
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setSearchQuery,
//   setSearchResults,
//   setSearchLoading,
//   setSearchError,
// } from "./searchSlice";

// export const useSearch = () => {
//   const query = useSelector((state) => state.search.query);
//   const results = useSelector((state) => state.search.results);
//   const isLoading = useSelector((state) => state.search.isLoading);
//   const error = useSelector((state) => state.search.error);
//   const dispatch = useDispatch();

//   const search = async (query) => {
//     try {
//       dispatch(setSearchLoading(true));
//       const response = await fetch(`/api/search?q=${query}`);
//       const data = await response.json();
//       dispatch(setSearchResults(data.results));
//     } catch (error) {
//       dispatch(setSearchError(error.message));
//     } finally {
//       dispatch(setSearchLoading(false));
//     }
//   };

//   const handleSearch = (event) => {
//     dispatch(setSearchQuery(event.target.value));
//     search(event.target.value);
//   };

//   return {
//     query,
//     results,
//     isLoading,
//     error,
//     handleSearch,
//   };
// };
// Use the custom hook in your component to access and update the search state.
// import { useSearch } from "./useSearch";

// const Search = () => {
//   const { query, results, isLoading, error, handleSearch } = useSearch();

//   return (
//     <div>
//       <input type="text" value={query} onChange={handleSearch} />
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {results.map((result) => (
//         <div key={result.id}>
//           <h2>{result.title}</h2>
//           <p>{result.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
// This is just a basic example of how to create a search hook with Redux. You can customize it to fit your specific needs.
