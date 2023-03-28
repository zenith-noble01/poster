import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authservices";

const student = JSON.parse(localStorage.getItem("student"));

const initialState = {
  student: student ? student : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (student, thunkAPI) => {
    try {
      return await authServices.registerUser(student);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginStudent = createAsyncThunk(
  "auth/login",
  async (student, thunkAPI) => {
    try {
      const { data } = await authServices.loginStudent(student);

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
      .addCase(loginStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.student = action.payload;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.student = null;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
