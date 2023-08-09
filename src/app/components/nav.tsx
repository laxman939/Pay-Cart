import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Nav = ({ setPageName }: any) => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  return (
    <nav className="flex justify-between py-5 mx-6">
      <div
        className="text-slate-100 hover:text-sky-300 cursor-pointer text-2xl"
        onClick={() => setPageName("home")}
      >
        PayCart
      </div>
      <div className="flex justify-between gap-4 md:mr-16 md:pr-2">
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
          Cart
          <sup className="text-white bg-red-600 rounded-full px-1">
            {cartItems.length}
          </sup>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
