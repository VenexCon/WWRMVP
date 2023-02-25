import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isPending: false,
  message: " ",
};

export const registerUser = createAsyncThunk(
    "auth/register", 
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && error.response.data &&error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name:'auth',
    initialState, 
    reducers : {
        reset: (state) => {
            state.isPending = false, 
            state.isError = false, 
            state.isSuccess = false, 
            state.message = '',
        },
    },
    extraReducers: (builder) => {
        builder.addCase()
    }
})
