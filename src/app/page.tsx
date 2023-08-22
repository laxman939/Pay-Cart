"use client";
import Nav from "./components/nav";
import React, { useState } from "react";
import Products from "./pages/products";
import Cart from "./pages/cart";
import { useSelector } from "react-redux";
import Favorites from "./pages/favorites";

export default function Home() {
  const [pageName, setPageName] = useState("home");

  const { cartItems, favItems } = useSelector((state: any) => state.cart);

  return (
    <div className="w-11/12 mx-auto">
      <Nav setPageName={setPageName} />
      <main className="flex items-center justify-between flex-wrap py-2">
        <>
          {pageName === "home" ? (
            <Products />
          ) : pageName === "cart" ? (
            <Cart />
          ) : (
            <Favorites />
          )}
        </>
      </main>

      <h4 className="text-center my-5 text-2xl tracking-wide">
        {cartItems.length === 0 &&
          pageName === "cart" &&
          "You haven't added any products yet"}
        {favItems.length === 0 &&
          pageName === "favorite" &&
          "You haven't added any products yet"}
      </h4>
    </div>
  );
}
