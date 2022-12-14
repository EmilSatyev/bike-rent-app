import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/login",
        { email, password },
        config
      );

      const now = new Date();
      const nowPlusTwelveHours = now.setHours(now.getHours() + 12);

      const tokenObj = {
        token: data.userToken,
        expire: nowPlusTwelveHours,
      };
      localStorage.setItem("userToken", JSON.stringify(tokenObj));

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, phone, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "/api/register",
        { name, phone, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { users } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${users.userToken}`,
        },
      };

      const { data } = await axios.get(`/api/profile`, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { users } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${users.userToken}`,
        },
      };
      const { data } = await axios.patch(`/api/update-profile`, arg, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
