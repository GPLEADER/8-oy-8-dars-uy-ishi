import { configureStore } from "@reduxjs/toolkit";
import likedProductsReducer from "../features/likedProductsSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    likedProducts: likedProductsReducer,
    cart: cartReducer,
  },
});
