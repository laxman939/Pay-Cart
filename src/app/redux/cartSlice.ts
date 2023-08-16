import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { productType } from "../pages/products";

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
        (e: productType) => e.id !== action.payload.id
      );
    },
    increaseQnty: (state, action: any) => {
      const indexToModify = state.cartItems.findIndex(
        (obj: productType) => obj.id === action.payload.id
      );

      if (indexToModify !== -1) {
        const modifiedObject = {
          ...state.cartItems[indexToModify],
          quantity: state.cartItems[indexToModify].quantity + 1,
        };

        state.cartItems[indexToModify] = modifiedObject;
      }
    },
    decreaseQnty: (state, action: any) => {
      const indexToModify = state.cartItems.findIndex(
        (obj: productType) => obj.id === action.payload.id
      );

      if (indexToModify !== -1) {
        const modifiedObject = {
          ...state.cartItems[indexToModify],
          quantity: state.cartItems[indexToModify].quantity - 1,
        };

        state.cartItems[indexToModify] = modifiedObject;
      }
    },
    addFav: (state, action: any) => {
      state.favItems = [...state.favItems, action.payload];
    },
    removeFav: (state, action: any) => {
      state.favItems = state.favItems.filter(
        (e: productType) => e.id !== action.payload.id
      );
    },
  },
});

export interface initialStateTypes {
  cartItems: any;
  favItems: any;
}

export const {
  addItem,
  removeItem,
  addFav,
  removeFav,
  increaseQnty,
  decreaseQnty,
} = cartSlice.actions;

export default cartSlice.reducer;
