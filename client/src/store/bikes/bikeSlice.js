import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bikesService from "../services/bikesService";

export const getBikes = createAsyncThunk(
  "bikes/getBikes",
  async (params, thinkAPI) => {
    try {
      return await bikesService.getBikes(params);
    } catch (err) {
      return thinkAPI.rejectWithValue(err.response.data);
    }
  }
);

const bikeSlice = createSlice({
  name: "bikes",
  initialState: {
    bikes: null,
    isShow: false,
    isError: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    clearBikes(state) {
      state.bikes = null;
      state.isShow = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBikes.pending, (state) => {
      state.isLoading = true;
      state.isShow = true;
    });
    builder.addCase(getBikes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bikes = action.payload;
    });
    builder.addCase(getBikes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.bikes = null;
    });
  },
});
export const { clearBikes } = bikeSlice.actions;

export default bikeSlice.reducer;
