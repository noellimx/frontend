import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios, { AxiosError } from "axios";

const initialState = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
}

const backendURL = "asd"
export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ firstName, email, password }: { firstName: string, email: string, password: string }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `${backendURL}/api/user/register`,
                { firstName, email, password },
                config
            )
        } catch (_error) {
            const error = _error as AxiosError;
            // return custom error message from backend if present
            // if (error.response && error.response.data.message) {
            //     return rejectWithValue(error.response.data.message)
            // } else {
            //     return rejectWithValue(error.message)
            // }

            return rejectWithValue(error.message)

        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers:
        (builder) => {
            builder.addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(registerUser.fulfilled, (state, action) => {
                action.payload;
                state.loading = false
                state.success = true
            })
            builder.addCase(registerUser.rejected, (state, action) => {
                action.payload;
                state.loading = false
                // state.error = payload
            })
        }
    ,
})

export default authSlice