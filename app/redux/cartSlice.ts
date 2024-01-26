import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: initialStateTypes = {
  cartItems: [],
  favItems: [],
  isProductModalOpen: false,
  user: {
    name: "",
    emailId: "",
    password: "",
    isRegistered: false,
    isSaved: false,
  },
  selectedProduct: {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  },
  showLoginPage: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: any) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      state.cartItems = state.cartItems.filter(
        (e: productType) => e.id !== action.payload.id
      );
    },
    increaseQnty: (state, action: PayloadAction<{ id: number }>) => {
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
    addFav: (state, action: PayloadAction<productType>) => {
      state.favItems = [...state.favItems, action.payload];
    },
    removeFav: (state, action: PayloadAction<{ id: number }>) => {
      state.favItems = state.favItems.filter(
        (e: productType) => e.id !== action.payload.id
      );
    },
    setProductModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isProductModalOpen = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<productType>) => {
      state.selectedProduct = action.payload;
    },
    addUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setLoginPage: (state, action: PayloadAction<boolean>) => {
      state.showLoginPage = action.payload;
    },
  },
});

export interface UserType {
  name: string;
  emailId: string;
  password: string;
  isRegistered: boolean;
  isSaved: boolean;
}

export interface initialStateTypes {
  cartItems: any;
  favItems: any;
  isProductModalOpen: boolean;
  selectedProduct: productType;
  user: UserType;
  showLoginPage: boolean;
}

export const {
  addItem,
  removeItem,
  addFav,
  removeFav,
  increaseQnty,
  decreaseQnty,
  setProductModalOpen,
  setSelectedProduct,
  addUser,
  setLoginPage,
} = cartSlice.actions;

export default cartSlice.reducer;
