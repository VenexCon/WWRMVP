import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import businessService from "./businessService";

//allows us to use the redux Async life cycles with sync code.
import { extractErrorMessage } from "../../utils";

const business = JSON.parse(localStorage.getItem("business"));

const initialState = {
  business: business ? business : null,
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

//Delete business
//
export const deleteBusiness = createAsyncThunk(
  "business/delete",
  async (_, thunkAPI) => {
    try {
      return await businessService.deleteBusiness();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//logout business
//return new payload of business: null
export const logoutBusiness = createAsyncThunk(
  "business/logout",
  async (_, thunkAPI) => {
    try {
      const response = await businessService.logoutBusiness();
      if (!response.error) {
        return {
          payload: {
            business: null,
            isPending: false,
          },
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//Get business used for getting latest updates to business model.
//
export const getBusiness = createAsyncThunk(
  "business/getBusiness",
  async (_, thunkAPI) => {
    try {
      return await businessService.getBusiness();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//used to decrement a listing following succesful creation of a listing.
export const decrementListing = createAsyncThunk(
  "business/decrementListing",
  async (_, thunkAPI) => {
    try {
      return await businessService.decrementListing();
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
      })
      .addCase(logoutBusiness.fulfilled, (state, action) => {
        state.isPending = action.payload.isPending;
        state.business = action.payload.business;
      })
      .addCase(logoutBusiness.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        state.isPending = action.payload.isPending;
        state.business = null;
      })
      .addCase(deleteBusiness.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteBusiness.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.isPending = false;
        state.business = action.payload;
      })
      .addCase(getBusiness.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getBusiness.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(decrementListing.fulfilled, (state, action) => {
        state.isPending = false;
        state.business = action.payload;
      })
      .addCase(decrementListing.pending, (state) => {
        state.isPending = true;
      })
      .addCase(decrementListing.rejected, (state) => {
        state.isPending = false;
      });
  },
});

export default businessSlice.reducer;
