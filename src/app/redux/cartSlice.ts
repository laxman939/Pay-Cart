import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: initialStateTypes = {
  cartItems: [],
  favItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: any) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeItem: (state, action: any) => {
      state.cartItems = state.cartItems.filter(
        (e: any) => e.id !== action.payload.id
      );
    },
    addFav: (state, action: any) => {
      state.favItems = [...state.favItems, action.payload];
    },
    removeFav: (state, action: any) => {
      state.favItems = state.favItems.filter(
        (e: any) => e.id !== action.payload.id
      );
    },
  },
});

export interface initialStateTypes {
  cartItems: any;
  favItems: any;
}

export const { addItem, removeItem, addFav, removeFav } = cartSlice.actions;

export default cartSlice.reducer;
