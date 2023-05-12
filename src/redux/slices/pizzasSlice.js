import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas", async () => {
  const { data } = await axios.get("/pizzas");
  return data;
});

export const createPizza = createAsyncThunk(
  "pizzas/createPizza",
  async (params) => {
    const { data } = await axios.post("/pizzas", params);
    return data;
  }
);

export const updatePizza = createAsyncThunk(
  "pizzas/updatePizza",
  async (params) => {
    console.log(params.pizzaId);
    await axios.patch(`/pizzas/${params.pizzaId}`, params);
  }
);

export const fetchDeletePizza = createAsyncThunk(
  "pizzas/deletePizza",
  async (id) => {
    axios.delete(`/pizzas/${id}`);
  }
);

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

    [fetchDeletePizza.pending]: (state, action) => {
      state.data = state.data.filter((obj) => obj.pizzaId !== action.payload);
    },
  },
});

export const pizzasReducer = pizzasSlice.reducer;
