import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav, removeItem } from "../redux/cartSlice";

const Favorites = () => {
  const favItems = useSelector((state: any) => state.cart.favItems);
  const dispatcher = useDispatch();

  return (
    <div>
      {" "}
      {favItems.length > 0
        ? favItems.map((product: any) => {
            return (
              <div className="text-slate-100 card relative" key={product.id}>
                <div
                  className="absolute top-1 right-2"
                  onClick={() => {
                    !favItems.some((e: any) => e.id === product.id)
                      ? dispatcher(addFav(product))
                      : dispatcher(removeFav(product));
                  }}
                >
                  {favItems.some((e: any) => e.id === product.id) ? "❤️" : "🤍"}
                </div>
                {/* <div className="absolute top-1 right-2">🤍❤️</div> */}
                <img src={product.image} alt="" className="mx-auto my-2" />
                <div className="text-center text-black mt-5 text-sm">
                  {product.title}
                </div>
                <div className="text-center text-black mt-3 mb-9 font-bold">
                  ₹ {Number(product.price).toFixed(2)}
                </div>
                <div className="absolute bottom-0 right-6 h-10">
                  <button
                    className="btn"
                    onClick={() => {
                      console.log(product);
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

export default Favorites;
