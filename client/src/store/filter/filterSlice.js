import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const initialState = {
  dateStart: +today,
  dateEnd: +tomorrow,
  cities: "moscow",
  types: "",
  sizes: "",
  brands: "",
  search: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setType(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearFilter(state) {
      state.dateStart = +today;
      state.dateEnd = +tomorrow;
    },
  },
});

export const { setType, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
