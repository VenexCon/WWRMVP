import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import authService from "./authService";

//allows us to use the redux Async life cycles with sync code. 
import {extractErrorMessage} from '../../utils'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user: null,
  isPending: false,
};

export const registerUser = createAsyncThunk(
    "auth/register", 
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            return thunkAPI(isRejectedWithValue(error))
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
        builder
        .addCase(register.pending, (state) => {
            state.isPending = true; 
        })
        .addCase(register.fulfilled, (state) => {
            state.isPending = false, 
            state.user = action.payload
        })
        .addCase(register.rejected, (state) => {
            state.isPending = false
        })
    }
})
