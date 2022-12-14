import { createSlice, current } from "@reduxjs/toolkit";
import {
  getUserDetails,
  registerUser,
  updateUserDetails,
  userLogin,
} from "../services/userService";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCancelStatus: (state, action) => {
      const orders = current(state.userInfo.orderIds);
      const orderIds = orders.map((order) => {
        if (order._id === action.payload) {
          order = { ...order, status: "canceled" };
        }
        return order;
      });
      state.userInfo = { ...state.userInfo, orderIds };
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // get user details
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(getUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //Update user info
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
  },
});

export const { logout, setCancelStatus } = userSlice.actions;

export default userSlice.reducer;
