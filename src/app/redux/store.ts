import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import { cartSlice } from "./cartSlice";

const reducer = {
  cart: cartSlice.reducer,
};

// export const store = configureStore({
//   reducer: {
//     cart: cartReduer,
//   },
// });

export const reduxStore = configureStore({
  reducer,
});
export const useDispatch = () => useReduxDispatch();
export const useSelector = useReduxSelector;

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
