import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: initialStateTypes = {
  cartItems: [],
  favItems: [],
  users: [],
  isProductModalOpen: false,
  loggedInUser: {
    name: "",
    emailId: "",
    password: "",
    isRegistered: false,
    isLoggedIn: false,
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
  showPaymentSuccess: false,
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
      const indexToModify = state.users.findIndex(
        (obj: UserType) => obj.emailId === action.payload.emailId
      );

      if (indexToModify !== -1) {
        const modifiedObject = {
          name: action.payload.name,
          emailId: action.payload.emailId,
          password: action.payload.password,
          isRegistered: action.payload.isRegistered,
          isLoggedIn: action.payload.isLoggedIn,
          isSaved: action.payload.isSaved,
        };

        state.users[indexToModify] = modifiedObject;
      } else {
        state.users = [...state.users, action.payload];
      }
      state.loggedInUser = action.payload;
    },
    setLoginPage: (state, action: PayloadAction<boolean>) => {
      state.showLoginPage = action.payload;
    },
    setPaymentPage: (state, action: PayloadAction<boolean>) => {
      state.showPaymentSuccess = action.payload;
    },
    emptyCart: (state, action: PayloadAction<[]>) => {
      state.cartItems = action.payload;
    },
  },
});

export interface UserType {
  name: string;
  emailId: string;
  password: string;
  isRegistered: boolean;
  isLoggedIn: boolean;
  isSaved: boolean;
}

export interface initialStateTypes {
  cartItems: any;
  favItems: any;
  isProductModalOpen: boolean;
  selectedProduct: productType;
  loggedInUser: UserType;
  users: UserType[];
  showLoginPage: boolean;
  showPaymentSuccess: boolean;
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
  setPaymentPage,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
