import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authservices";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authServices.registerUser(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginInUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const { data } = await authServices.loginInUser(user);

      console.log(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutStudent = createAsyncThunk("auth/logout", async () => {
  await authServices.logoutStudent();
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.student = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.student = null;
      })
      .addCase(loginInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.student = action.payload;
      })
      .addCase(loginInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.student = null;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
