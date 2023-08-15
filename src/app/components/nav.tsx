import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Nav = ({ setPageName }: any) => {
  const [cartQty, setCartQty] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  useEffect(() => {
    let totalQuantity = 0;
    for (const product of cartItems) {
      totalQuantity += product.quantity;
    }
    setCartQty(totalQuantity);
  }, [cartItems]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);

  return (
    <nav className="flex justify-between py-5 mx-6">
      <div
        className="text-slate-100 hover:text-sky-300 cursor-pointer text-2xl"
        onClick={() => setPageName("home")}
      >
        PayCart
      </div>
      <div
        className={`flex justify-between gap-4 ${
          windowWidth > 1280 ? "md:mr-14 md:pr-2" : "mr-0 pr-0"
        }`}
      >
        {/* <div>Home</div> */}
        <div
          className="text-slate-100 hover:text-sky-300 cursor-pointer text-1xl"
          onClick={() => setPageName("favorite")}
        >
          Favorites
        </div>
        <div
          className="text-slate-100 hover:text-sky-300 cursor-pointer text-1xl"
          onClick={() => setPageName("cart")}
        >
          {/* Cart */}
          <span className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <sup className="text-white bg-red-600 rounded-full px-1 h-4 flex items-center">
              {cartQty}
            </sup>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
