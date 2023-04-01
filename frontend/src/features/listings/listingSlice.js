import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import listingService from "./listingService";

import { extractErrorMessage } from "../../utils";

//accounts listing is the listings belonging to the logged in business
//allListings are all listings held in the DB (ish)
const initialState = {
  accountsListings: [],
  allListings: [],
  isPending: false,
};

//create listing
export const createNewListing = createAsyncThunk(
  "listing/create",
  async (listingData, thunkAPI) => {
    try {
      return await listingService.createListing(listingData);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//fetch business account specific listings
export const getMyListings = createAsyncThunk(
  "listing/myListings",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().businessAuth.business.token;
      return await listingService.getBusinessListings(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const listingSlice = createSlice({
  name: "listing",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createNewListing.pending, (state) => {
        state.isPending = true;
      })
      .addCase(createNewListing.fulfilled, (state, action) => {
        state.isPending = false;
        state.fulfilled = action.payload;
      })
      .addCase(getMyListings.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getMyListings.fulfilled, (state, action) => {
        state.accountsListings = action.payload;
        state.isPending = false;
      });
  },
});

export default listingSlice.reducer;
