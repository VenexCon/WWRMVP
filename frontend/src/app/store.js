import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import businessReducer from "../features/businessAuth/businessSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    businessAuth: businessReducer,
  },
});
