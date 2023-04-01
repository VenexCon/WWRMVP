import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import businessReducer from "../features/businessAuth/businessSlice";
import listingReducer from "../features/listings/listingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    businessAuth: businessReducer,
    listing: listingReducer,
  },
});
