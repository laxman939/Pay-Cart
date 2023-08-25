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

type propsTypes = {
  product: productType;
};

const Product = ({ product }: propsTypes) => {
  const router = useRouter();
  const dispatcher = useDispatch();
  const { favItems, cartItems } = useSelector((state: any) => state.cart);

  return (
    <>
      <div
        onClick={() => {
          dispatcher(setSelectedProduct(product));
          dispatcher(setProductModalOpen(true));
        }}
        className="p-5 rounded border hover:scale-105 transition-transform ease-out duration-200 text-slate-100 card relative cursor-pointer"
      >
        <div
          className="absolute top-1 right-2"
          onClick={(e) => {
            e.stopPropagation();
            !favItems.some((e: productType) => e.id === product.id)
              ? dispatcher(addFav(product))
              : dispatcher(removeFav(product));
            console.log("fav");
          }}
        >
          {favItems.some((e: productType) => e.id === product.id) ? "❤️" : "🤍"}
        </div>
        <div className="max-h-72 flex-1">
          <ProductImage product={product} fill />
        </div>
        <div className="text-center text-black mt-5 text-sm">
          {product.title}
        </div>
        <div className="flex align-items-center">
          <div className="text-center text-black mt-3 mb-9 font-bold">
            ₹ {Number(product.price).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="btnAdd"
            onClick={(e) => {
              e.stopPropagation();
              if (
                cartItems.some((item: productType) => item.id === product.id)
              ) {
                dispatcher(increaseQnty(product));
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
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
