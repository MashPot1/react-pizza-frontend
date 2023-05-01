import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas", async () => {
  const { data } = await axios.get("/pizzas");
  return data;
});

const initialState = {
  data: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.data = [];
      state.status = "loading";
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchPizzas.rejected]: (state) => {
      state.data = [];
      state.status = "error";
    },
  },
});

export const pizzasReducer = pizzasSlice.reducer;
