import ProductImage from "./productImage";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  addFav,
  removeFav,
  increaseQnty,
  setProductModalOpen,
  setSelectedProduct,
  setLoginPage,
} from "../app/redux/cartSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

type propsTypes = {
  product: productType;
  page: string;
};

const Product = ({ product, page }: propsTypes) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatcher = useDispatch();
  const router = useRouter();
  const { favItems, cartItems, loggedInUser } = useSelector(
    (state: any) => state.cart
  );

  return (
    <button
      type="button"
      onClick={() => {
        dispatcher(setSelectedProduct(product));
        dispatcher(setProductModalOpen(true));
      }}
      className={`p-5 rounded border transition-transform ease-out duration-200 text-slate-100 card relative cursor-pointer  ${
        page === "landing" ? "text-white hover:text-black" : ""
      }`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          return false;
        }
      }}
    >
      <button
        type="button"
        className={`${
          page === "landing" ? "hidden" : "absolute top-1 right-2"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          !favItems.some((e: productType) => e.id === product.id)
            ? dispatcher(addFav(product))
            : dispatcher(removeFav(product));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            return false;
          }
        }}
      >
        {favItems.some((e: productType) => e.id === product.id) ? "❤️" : "🤍"}
      </button>
      <div className="max-h-72 flex justify-center">
        <ProductImage product={product} fill />
      </div>
      <div
        className={`text-center text-black mt-5 text-sm max-w-[100] truncate`}
      >
        {product.title}
      </div>
      {page !== "landing" ? (
        <div className="flex align-items-center">
          <div className="text-center text-black mt-3 mb-9 font-bold">
            ₹ {Number(product.price).toFixed(2)}
          </div>
        </div>
      ) : null}
      <div className={` ${page === "landing" ? "hidden" : "flex justify-end"}`}>
        <button
          className="btnAdd"
          disabled={isAdded}
          onClick={(e) => {
            e.stopPropagation();
            if (loggedInUser.isRegistered) {
              setIsAdded(true);
              setTimeout(() => {
                if (
                  cartItems.some((item: productType) => item.id === product.id)
                ) {
                  dispatcher(increaseQnty(product));
                  setIsAdded(false);
                } else {
                  const newProduct: any = {
                    category: product.category,
                    description: product.description,
                    id: product.id,
                    image: product.image,
                    price: product.price,
                    quantity: 1,
                    rating: product.rating,
                    title: product.title,
                  };
                  dispatcher(addItem(newProduct));
                  setIsAdded(false);
                }
              }, 1000);
            } else {
              router.push(`/`);
              dispatcher(setLoginPage(true));
            }
          }}
        >
          {!isAdded ? "Add to cart" : "Added"}
        </button>
      </div>
    </button>
  );
};

export default Product;
