import { createSlice } from "@reduxjs/toolkit";


const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};


const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
        saveCartToLocalStorage(state);
      }
    },
    removeFromCart: (state, action) => {
      const newCart = state.filter((id) => id !== action.payload);
      saveCartToLocalStorage(newCart);
      return newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
