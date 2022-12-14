import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/orderService";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (params, thinkAPI) => {
    try {
      return await orderService.createOrder(params);
    } catch (err) {
      return thinkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, thinkAPI) => {
    try {
      return await orderService.cancelOrder(orderId);
    } catch (err) {
      return thinkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const extendOrder = createAsyncThunk(
  "order/extendOrder",
  async (params, thinkAPI) => {
    try {
      return await orderService.extendOrder(params);
    } catch (err) {
      return thinkAPI.rejectWithValue(err.response.data);
    }
  }
);


const initialState = {
  selectedBikes: [],
  totalPrice: 0,
  status: "notTouched",
  days: null,
  error: null,
  isLoading: false,
  isSuccess: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToSelected(state, action) {
      const selected = state.selectedBikes;
      const bikeObj = action.payload.bikes;
      const days = action.payload.days;

      if (!selected.find((bike) => bike._id === bikeObj._id)) {
        state.selectedBikes.push(bikeObj);

        state.days = days;
        state.totalPrice =
          days * state.selectedBikes.reduce((sum, next) => sum + next.price, 0);
      } else {
        state.selectedBikes = selected.filter(
          (bike) => bike._id !== bikeObj._id
        );
      }
    },
    clearSelected(state) {
      state.selectedBikes = [];
      state.status = "notTouched";
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "error";
    });

    // Отмена заказа
    builder.addCase(cancelOrder.pending, (state, action) => {
      state.isSuccess = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(cancelOrder.rejected, (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    });

    // Продление заказа
    builder.addCase(extendOrder.pending, (state) => {
      state.isSuccess = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(extendOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(extendOrder.rejected, (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    });
  },
});

export const { addToSelected, clearSelected } = orderSlice.actions;

export default orderSlice.reducer;
