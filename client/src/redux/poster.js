import { createSlice } from "@reduxjs/toolkit";

export const posterSlice = createSlice({
  name: "poster",
  initialState: false,
  reducers: {
    poster: (state) => {
      if (state === false) {
        return true;
      } else {
        return false;
      }
    },
  },
});

export const { poster } = posterSlice.actions;

export default posterSlice.reducer;
