import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";

import { globalConfig } from "../../../../initConfig";
import { notify } from "../notification";
import { Endpoints } from "../../../../types/endpoints";

const sliceName = "authentication";
const initialState = {
  loading: false,
  userInfo: {},
  token: "",
  error: "",
  success: false,
};

export const registerUser = createAsyncThunk(
  `${sliceName}/register`,
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

      return rejectWithValue(error.message);
    }
  },
);

type AuthenticateThunkRejectValue = { statusCode: number; statusText: string };
export const login = createAsyncThunk<
  { token: string },
  { username: string; password: string },
  { rejectValue: AuthenticateThunkRejectValue }
>(
  `${sliceName}/logout`,
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await axios.post(
        `${globalConfig.serverUrl}${Endpoints.login}`,
        { username, password },
        config,
      );

      const token = resp.data.token as string;

      dispatch(
        notify({ text: "Authentication Success", type: "Info", ms: 3000 }),
      );

      return { token };
    } catch (_error) {
      const error = _error as AxiosError;

      dispatch(
        notify({ text: "Authentication Fail", type: "Error", ms: 3000 }),
      );

      return rejectWithValue({
        statusText: error.response?.statusText || "",
        statusCode: error.response?.status || -1,
      });
    }
  },
);

export const logoutUser = createAsyncThunk(
  `${sliceName}/login`,
  async () => { },
);

const SliceAuth = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = "";
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
      action.payload;
      state.loading = false;
      state.token = action.payload.token;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.token = "";
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.token = "";
      const payload = action.payload as AuthenticateThunkRejectValue;
      state.error = payload.statusText as string;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = "";
    });
  },
});

export default SliceAuth;
