import {configureStore} from "@reduxjs/toolkit";
import bikeSlice from "./bikes/bikeSlice";
import filterSlice from "./filter/filterSlice";
import orderSlice from "./order/orderSlice";
import userSlice from "./user/userSlice";


export const store = configureStore({
  reducer: {
    bikes: bikeSlice,
    filters: filterSlice,
    orders: orderSlice,
    users: userSlice,
  },
});