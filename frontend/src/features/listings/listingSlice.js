import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listingService from "./listingService";

import { extractErrorMessage } from "../../utils";

//accounts listing is the listings belonging to the logged in business
//allListings are all listings held in the DB (ish)
const initialState = {
  accountsListings: [],
  allListings: [],
  specificListing: null,
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
      return await listingService.getBusinessListings();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//get every listing, currently limited to 10 on the backend
export const getAllListings = createAsyncThunk(
  "listing/allListings",
  async (_, thunkAPI) => {
    try {
      return await listingService.getAllListings();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//gets the listing relating to the id in the query params.
export const getSpecificListing = createAsyncThunk(
  "listing/specificListing",
  async (listingId, thunkAPI) => {
    try {
      return await listingService.getSpecificListing(listingId);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//Allows editing of the specific Listing as this is gotten upon page load.
export const editSpecificListing = createAsyncThunk(
  "listing/editSpecificListing",
  async ({ listingData, listingId }, thunkAPI) => {
    try {
      return await listingService.editSpecificListing(listingId, listingData);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const searchListings = createAsyncThunk(
  "listing/searchListings",
  async (searchParams, thunkAPI) => {
    try {
      return await listingService.searchListings(searchParams);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//gets the listing relating to the id in the query params.
export const deleteSpecificListing = createAsyncThunk(
  "listing/deleteSpecificListing",
  async (listingId, thunkAPI) => {
    try {
      const businessId = thunkAPI.getState().listing.specificListing.business;
      return await listingService.deleteSpecificListing(listingId, businessId);
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
      .addCase(createNewListing.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(createNewListing.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(getMyListings.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getMyListings.fulfilled, (state, action) => {
        state.accountsListings = action.payload;
        state.isPending = false;
      })
      .addCase(getAllListings.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.isPending = false;
        state.allListings = action.payload;
      })
      .addCase(getSpecificListing.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getSpecificListing.fulfilled, (state, action) => {
        state.isPending = false;
        state.specificListing = action.payload;
      })
      .addCase(editSpecificListing.pending, (state) => {
        state.isPending = true;
      })
      .addCase(editSpecificListing.fulfilled, (state, action) => {
        state.isPending = false;
        state.specificListing = action.payload;
      })
      .addCase(searchListings.pending, (state) => {
        state.isPending = true;
      })
      .addCase(searchListings.fulfilled, (state, action) => {
        state.isPending = false;
        state.allListings = action.payload;
      })
      .addCase(deleteSpecificListing.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteSpecificListing.fulfilled, (state, action) => {
        state.isPending = false;
        state.specificListing = action.payload;
      });
  },
});

export default listingSlice.reducer;
