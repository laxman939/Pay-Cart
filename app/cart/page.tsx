"use client";
import React, { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addFav,
  addItem,
  decreaseQnty,
  increaseQnty,
  removeFav,
  removeItem,
} from "../redux/cartSlice";
import Image from "next/image";
import NoData from "../../components/noData";
import Nav from "@/components/nav";

const Cart = () => {
  const { cartItems, favItems } = useSelector((state: any) => state.cart);
  const dispatcher = useDispatch();

  return (
    <>
      <nav className="px-6 py-4">
        <Nav />
      </nav>
      <div className="">
        {cartItems.length > 0 ? (
          cartItems.map((product: any) => {
            return (
              <div
                className="text-slate-100 cartCard flex items-center justify-between relative"
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
                <Image
                  height={100}
                  width={100}
                  src={product.image}
                  alt=""
                  className="my-2"
                />
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
                    className="btnAdd"
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
        ) : (
          <>
            <NoData pageName="cart" />
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
