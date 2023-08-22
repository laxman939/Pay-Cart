import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addFav,
  addItem,
  decreaseQnty,
  increaseQnty,
  removeFav,
  removeItem,
} from "../redux/cartSlice";
import { productType } from "./products";

const Cart = () => {
  const { cartItems, favItems } = useSelector((state: any) => state.cart);
  const dispatcher = useDispatch();

  console.log(cartItems);

  return (
    <div className="">
      {cartItems.length > 0
        ? cartItems.map((product: any) => {
            return (
              <div
                className="text-slate-100 cartCard relative"
                key={product.id}
              >
                <div
                  className="absolute top-1 right-2"
                  onClick={() => {
                    !favItems.some((e: productType) => e.id === product.id)
                      ? dispatcher(addFav(product))
                      : dispatcher(removeFav(product));
                  }}
                >
                  {favItems.some((e: productType) => e.id === product.id)
                    ? "❤️"
                    : "🤍"}
                </div>
                {/* <div className="absolute top-1 right-2">🤍❤️</div> */}
                <img src={product.image} alt="" className="my-2" />
                <div className="text-center text-black text-sm">
                  {product.title}
                </div>
                <div className="text-center text-black font-bold mx-2">
                  ₹ {Number(product.price).toFixed(2)}
                </div>
                <div className="mx-2 text-black text-sm w-75 flex gap-2">
                  <label className="" htmlFor="qty">
                    Quantity:
                  </label>
                  <input
                    id="qty"
                    value={product.quantity}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.value > product.quantity) {
                        dispatcher(increaseQnty(product));
                      } else if (e.target.value < product.quantity) {
                        dispatcher(decreaseQnty(product));
                        // (e.target.value == "0" || product.quantity == "0") &&
                        //   dispatcher(removeItem(product));
                      }
                    }}
                    className="w-10 rounded"
                    type="number"
                    step={1}
                    min={1}
                  />
                </div>
                <div className="">
                  <button
                    className="btn"
                    onClick={() => {
                      dispatcher(removeItem(product));
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Cart;
