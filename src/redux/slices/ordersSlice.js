import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const { data } = await axios.get("/orders");
  return data;
});

const initialState = {
  data: [],
  status: "loading",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.data = [];
      state.status = "loading";
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchOrders.rejected]: (state) => {
      state.data = [];
      state.status = "error";
    },
  },
});

export const ordersReducer = ordersSlice.reducer;
