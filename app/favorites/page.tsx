"use client";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../redux/cartSlice";
import ProductImage from "../../components/productImage";
import NoData from "../../components/noData";
import Nav from "@/components/nav";

const Favorites = () => {
  const favItems = useSelector((state: any) => state.cart.favItems);
  const dispatcher = useDispatch();

  return (
    <>
      <nav className="px-6 py-4">
        <Nav />
      </nav>
      <div className="flex flex-wrap">
        {favItems.length > 0 ? (
          favItems.map((product: any) => {
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
                <ProductImage product={product} fill={true} />
                <div className="text-center text-black mt-5 text-sm">
                  {product.title}
                </div>
                <div className="text-center text-black mt-3 mb-9 font-bold">
                  ₹ {Number(product.price).toFixed(2)}
                </div>
              </div>
            );
          })
        ) : (
          <header className="mx-auto">
            <NoData pageName="favorite" />
          </header>
        )}
      </div>
    </>
  );
};

export default Favorites;
