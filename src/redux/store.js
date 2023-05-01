import { configureStore } from "@reduxjs/toolkit";
import { pizzasReducer } from "./slices/pizzasSlice";
import { authReducer } from "./slices/authSlice";
import cart from "./slices/cartSlice";
import { ordersReducer } from "./slices/ordersSlice";

const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
    auth: authReducer,
    orders: ordersReducer,
    cart,
  },
});

export default store;
