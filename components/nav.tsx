"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addUser, setLoginPage, UserType } from "../app/redux/cartSlice";

const Nav = () => {
  const [cartQty, setCartQty] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const { cartItems, loggedInUser } = useSelector((state: any) => state.cart);

  const router = useRouter();
  const dispatcher = useDispatch();

  useEffect(() => {
    let totalQuantity = 0;
    for (const product of cartItems) {
      totalQuantity += product.quantity;
    }
    setCartQty(totalQuantity);
  }, [cartItems]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <nav className="flex justify-between mx-5 px-3">
      <button
        type="button"
        className="text-slate-950 hover:text-black cursor-pointer text-2xl font-bold"
        // onClick={() => setPageName("home")}
        onClick={() => {
          router.push(`/`);
          dispatcher(setLoginPage(false));
        }}
      >
        PayCart
      </button>
      <div
        className={`flex justify-between gap-4 ${
          windowWidth > 1280 ? "md:mr-14 md:pr-2" : "mr-0 pr-0"
        }`}
      >
        {/* <div>Home</div> */}
        <button
          className="text-slate-950 hover:text-black cursor-pointer fs-5 font-bold"
          //   onClick={() => setPageName("favorite")}
          onClick={() => {
            !loggedInUser.isRegistered
              ? (router.push(`/`), dispatcher(setLoginPage(true)))
              : router.push(`/favorites`);
          }}
        >
          Favorites
        </button>
        <button
          className="text-slate-950 hover:text-black cursor-pointer font-bold"
          //   onClick={() => setPageName("cart")}
          onClick={() => {
            !loggedInUser.isRegistered
              ? (router.push(`/`), dispatcher(setLoginPage(true)))
              : router.push(`/cart`);
          }}
        >
          <span className="flex text-slate-950 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
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
        </button>
        <button
          className="text-slate-950 hover:text-black cursor-pointer fs-5 font-bold first-letter:uppercase relative"
          //   onClick={() => setPageName("favorite")}
          onClick={() => {
            router.push(`/`);
            // dispatcher(setLoginPage(true));
            !loggedInUser.isLoggedIn
              ? (router.push(`/`), dispatcher(setLoginPage(true)))
              : setIsLogout(!isLogout);
          }}
        >
          {!loggedInUser.isLoggedIn ? "Login" : loggedInUser.name}
          {isLogout && (
            <div
              className="absolute bg-slate-600 py-1 px-2 rounded-sm"
              onClick={() => {
                const storedUser = localStorage.getItem("payCart_User");
                if (storedUser) {
                  const user: UserType = JSON.parse(storedUser);
                  user.isLoggedIn = false;
                  dispatcher(addUser(user));
                  router.push(`/`), dispatcher(setLoginPage(true));
                } else {
                  console.error("No user found in localStorage");
                }
                setIsLogout(false);
              }}
            >
              Logout
            </div>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
