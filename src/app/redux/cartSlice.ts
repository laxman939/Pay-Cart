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
        (e: any) => e.id !== action.payload.id
      );
    },
    increaseQnty: (state, action: any) => {
      const addedProduct = state.cartItems.filter(
        (item: any) => item.id === action.payload.id
      )[0];

      const remainingProducts = state.cartItems.filter(
        (item: productType) => item.id !== action.payload.id
      );

      if (
        state.cartItems.some(
          (item: productType) => item.id === action.payload.id
        )
      ) {
        const updateProduct: any = {
          category: addedProduct.category,
          description: addedProduct.description,
          id: addedProduct.id,
          image: addedProduct.image,
          price: addedProduct.price,
          quantity: addedProduct.quantity + 1,
          rating: addedProduct.rating,
          title: addedProduct.title,
        };
        state.cartItems = [...remainingProducts, updateProduct];
      }
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

export const { addItem, removeItem, addFav, removeFav, increaseQnty } =
  cartSlice.actions;

export default cartSlice.reducer;
