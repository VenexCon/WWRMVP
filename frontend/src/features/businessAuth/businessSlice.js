import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import businessService from "./businessService";

//allows us to use the redux Async life cycles with sync code.
import { extractErrorMessage } from "../../utils";

const business = JSON.parse(localStorage.getItem("business"));

const initialState = {
  user: business ? business : null,
  isPending: false,
};

//register business
//business register
export const registerBusiness = createAsyncThunk(
  "business/register",
  async (business, thunkAPI) => {
    try {
      return await businessService.registerBusiness(business);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//login business
//return token to front-end
export const loginBusiness = createAsyncThunk(
  "business/login",
  async (business, thunkAPI) => {
    try {
      return await businessService.loginBusiness(business);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const businessSlice = createSlice({
  name: "business",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(registerBusiness.pending, (state) => {
        state.isPending = true;
      })
      .addCase(registerBusiness.fulfilled, (state, action) => {
        state.isPending = false;
        state.business = action.payload;
      })
      .addCase(registerBusiness.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(loginBusiness.pending, (state) => {
        state.isPending = true;
      })
      .addCase(loginBusiness.fulfilled, (state, action) => {
        state.isPending = false;
        state.business = action.payload;
      })
      .addCase(loginBusiness.rejected, (state) => {
        state.isPending = false;
      });
  },
});

export default businessSlice.reducer;
