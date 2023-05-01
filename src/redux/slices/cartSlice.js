import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  data: JSON.parse(localStorage.getItem("cart")) || [],
  totalPrice: JSON.parse(localStorage.getItem("cartPrice")) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.data.find(
        (obj) =>
          (obj.pizzaId === action.payload.pizzaId) &
          (obj.size === action.payload.size)
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.data.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.data.reduce((sum, obj) => {
        return obj.count * obj.price + sum;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.data.find(
        (obj) =>
          (obj.pizzaId === action.payload.pizzaId) &
          (obj.size === action.payload.size)
      );

      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.data.reduce((sum, obj) => {
        return obj.count * obj.price + sum;
      }, 0);
    },
    removeItem(state, action) {
      state.data.map((obj, index) =>
        obj.pizzaId === action.payload.pizzaId &&
        obj.size === action.payload.size
          ? state.data.splice(index, 1)
          : ""
      );

      state.totalPrice = state.data.reduce((sum, obj) => {
        return obj.count * obj.price + sum;
      }, 0);
    },
    clearItems(state) {
      state.data = [];
      state.totalPrice = 0;
    },
  },
});
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
