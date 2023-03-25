import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme";
import posterReducer from "./poster";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    poster: posterReducer,
  },
});
