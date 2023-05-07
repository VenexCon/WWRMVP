import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import Cookies from "js-cookie";

//allows us to use the redux Async life cycles with sync code.
import { extractErrorMessage } from "../../utils";

//profile is grabbed from LS, token will be placed in cookies prior to launch...should probably do this now.
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
// state should be updated and the ls removed at the same time.
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await authService.logout();
    if (!response.error) {
      return {
        payload: {
          user: null,
          isPending: false,
        },
      };
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

//login user
//async, so we require the createAsyncThunkAPI
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

//edit/update user
//async thunk required
//The service places the object into LS, including the cookies.
export const editUser = createAsyncThunk(
  "auth/update",
  async (userData, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      console.log("Token:", token);
      return await authService.editUser(userData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//get latest user from DB
//async as we want the thunkAPI.
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    return await authService.getUser(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
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
      })
      .addCase(logout, (state, action) => {
        console.log(state, action);
        state.user = action.payload.user;
        state.isPending = action.payload.isPending;
      })
      .addCase(login.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isPending = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false;
      })
      .addCase(editUser.pending, (state) => {
        state.isPending = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isPending = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isPending = false;
      })
      .addCase(logout.pending, (state) => {
        state.isPending = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload.user;
      });
  },
});

// we export the reducer function as this is what creates the
// Reducer functions.
export default authSlice.reducer;
