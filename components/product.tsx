import { useRouter } from "next/navigation";
import ProductImage from "./productImage";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  addFav,
  removeFav,
  increaseQnty,
  setProductModalOpen,
  setSelectedProduct,
} from "../app/redux/cartSlice";
import { useState } from "react";

type propsTypes = {
  product: productType;
  page: string;
};

const Product = ({ product, page }: propsTypes) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatcher = useDispatch();
  const { favItems, cartItems } = useSelector((state: any) => state.cart);

  return (
    <>
      <div
        onClick={() => {
          dispatcher(setSelectedProduct(product));
          dispatcher(setProductModalOpen(true));
        }}
        className={`p-5 rounded border hover:scale-105 transition-transform ease-out duration-200 text-slate-100 card relative cursor-pointer  ${
          page === "landing" ? "text-white hover:text-black" : ""
        }`}
      >
        <div
          className={`${
            page === "landing" ? "hidden" : "absolute top-1 right-2"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            !favItems.some((e: productType) => e.id === product.id)
              ? dispatcher(addFav(product))
              : dispatcher(removeFav(product));
          }}
        >
          {favItems.some((e: productType) => e.id === product.id) ? "❤️" : "🤍"}
        </div>
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
        <div
          className={` ${page === "landing" ? "hidden" : "flex justify-end"}`}
        >
          <button
            className="btnAdd"
            disabled={isAdded}
            onClick={(e) => {
              e.stopPropagation();
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
            }}
          >
            {!isAdded ? "Add to cart" : "Added"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
