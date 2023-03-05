import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
  createAction,
} from "@reduxjs/toolkit";
import authService from "./authService";

//allows us to use the redux Async life cycles with sync code.
import { extractErrorMessage } from "../../utils";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isPending: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//logout user
//NOTE: we do not need the asyncThunk as we are not doing any async code
// we create an action as the reducer creates a list of actions, and this is an action
export const logout = createAction("auth/logout", () => {
  authService.logout();
  return {};
});

export const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isPending = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isPending = false;
      });
  },
});

// we export the reducer function as this is what creates the
// Reducer functions.
export default authSlice.reducer;
