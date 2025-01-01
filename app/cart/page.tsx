"use client";
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
import Image from "next/image";
import NoData from "../../components/noData";
import Nav from "@/components/nav";
import Payment from "@/components/Payment/payment";

const Cart = () => {
  const { cartItems, favItems, user } = useSelector((state: any) => state.cart);
  const [total, setTotal] = useState(0);

  const dispatcher = useDispatch();

  useEffect(() => {
    const amount =
      cartItems.length > 0
        ? cartItems.reduce((acc: number, cart: productType) => {
            return acc + (cart.quantity || 1) * cart.price;
          }, 0)
        : 0;
    setTotal(amount);
  }, [cartItems]);

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
                className="text-slate-100 cartCard flex items-center justify-between relative px-5 mx-12"
                key={product.id}
              >
                <button
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
                </button>
                <div className="w-2/12">
                  <Image
                    height={100}
                    width={100}
                    src={product.image}
                    alt=""
                    className="my-2"
                  />
                </div>
                <div className="text-center text-black text-sm w-4/12">
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
                    className="w-10 rounded cursor-pointer"
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
          <NoData pageName="cart" />
        )}
        {cartItems.length > 0 && (
          <div className="flex place-content-between mx-12 pb-3">
            <div className="flex gap-4">
              <div className="flex gap-4">
                <span className="text-1xl font-bold">Total:</span>
                <span>₹{total?.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <Payment />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
