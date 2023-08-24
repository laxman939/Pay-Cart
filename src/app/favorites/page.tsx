"use client";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav, removeItem } from "../redux/cartSlice";
import ProductImage from "../../../components/productImage";
import NoData from "../../../components/noData";

const Favorites = () => {
  const favItems = useSelector((state: any) => state.cart.favItems);
  const dispatcher = useDispatch();

  return (
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
              {/* <div className="absolute top-1 right-2">🤍❤️</div> */}
              {/* <Image src={product.image} alt="" className="mx-auto my-2" /> */}
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
        <>
          <NoData pageName="favorite" />
        </>
      )}
    </div>
  );
};

export default Favorites;
