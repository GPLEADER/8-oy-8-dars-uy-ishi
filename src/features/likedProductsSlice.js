import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("likedProducts")) || {};

const likedProductsSlice = createSlice({
  name: "likedProducts",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const productId = action.payload;
      if (state[productId]) {
        delete state[productId];
      } else {
        state[productId] = true;
      }
      localStorage.setItem("likedProducts", JSON.stringify(state));
    },
  },
});

export const { toggleLike } = likedProductsSlice.actions;
export default likedProductsSlice.reducer;
