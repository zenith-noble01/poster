import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme";
import posterReducer from "./poster";
import authReducer from "./authSlice";
import searchReducer from "./search";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    poster: posterReducer,
    auth: authReducer,
    search: searchReducer,
  },
});
