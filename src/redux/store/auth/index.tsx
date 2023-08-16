import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";

import { globalConfig } from "../../../initConfig";
const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await axios.post(
        `${globalConfig.serverUrl}/api/user/register`,
        { email, password },
        config,
      );
    } catch (_error) {
      const error = _error as AxiosError;
      // return custom error message from backend if present
      // if (error.response && error.response.data.message) {
      //     return rejectWithValue(error.response.data.message)
      // } else {
      //     return rejectWithValue(error.message)
      // }

      return rejectWithValue(error.message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await axios.post(
        `${globalConfig.serverUrl}/api/user/login`,
        { email, password },
        config,
      );
    } catch (_error) {
      const error = _error as AxiosError;
      // return custom error message from backend if present
      // if (error.response && error.response.data.message) {
      //     return rejectWithValue(error.response.data.message)
      // } else {
      //     return rejectWithValue(error.message)
      // }

      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      action.payload;
      state.loading = false;
      // state.error = payload
    });

    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login fulfilled");
      action.payload;
      state.loading = false;
      // state.error = payload
    });
  },
});

export default authSlice;
