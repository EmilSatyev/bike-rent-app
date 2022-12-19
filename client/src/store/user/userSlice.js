import { createSlice, current } from "@reduxjs/toolkit";
import {
  getUserDetails,
  registerUser,
  updateUserDetails,
  userLogin,
} from "../services/userService";

let tokenObj;

if (localStorage.getItem("userToken")) {
  tokenObj = JSON.parse(localStorage.getItem("userToken"));
  if (tokenObj.expire <= new Date().getTime()) {
    localStorage.removeItem("userToken");
    tokenObj = null;
  }
} else {
  tokenObj = null;
}

const initialState = {
  loading: false,
  userInfo: null,
  userToken: tokenObj?.token,
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
    // логин
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
    // регистрация
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
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
    builder.addCase(getUserDetails.rejected, (state) => {
      state.loading = false;
    });

    // обновление
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
  },
});

export const {logout, setCancelStatus} = userSlice.actions;

export default userSlice.reducer;
