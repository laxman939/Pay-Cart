"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addFav, removeFav } from "../redux/cartSlice";

export interface productType {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  quantity: number;
  rating: any;
  title: string;
}

const Products = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatcher = useDispatch();
  const { favItems, cartItems } = useSelector((state: any) => state.cart);

  // const getProducts = async () => {
  //   try {
  //     const response = await axios.get("https://fakestoreapi.com/products");
  //     console.log(response.data);
  //     setProducts(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getProductsByCategory = async (type: string) => {
    setIsLoading(true);
    setCategory(type);
    let url =
      type === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${type}`;
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setProducts([]);
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsByCategory("all");
  }, []);

  return (
    <>
      <div className="px-2">
        <span
          className={`mx-3 cursor-pointer ${
            category === "all"
              ? "border-b-4 border-b-violet-500"
              : "border-transparent"
          }`}
          onClick={() => getProductsByCategory("all")}
        >
          All
        </span>
        <span
          className={`mx-3 cursor-pointer ${
            category === "men's clothing"
              ? "border-b-4 border-b-violet-500"
              : "border-transparent"
          }`}
          onClick={() => getProductsByCategory("men's clothing")}
        >
          Men&apos;s clothing
        </span>
        <span
          className={`mx-3 cursor-pointer ${
            category === "women's clothing"
              ? "border-b-4 border-b-violet-500"
              : "border-transparent"
          }`}
          onClick={() => getProductsByCategory("women's clothing")}
        >
          Women&apos;s clothing
        </span>
        <span
          className={`mx-3 cursor-pointer ${
            category === "electronics"
              ? "border-b-4 border-b-violet-500"
              : "border-transparent"
          }`}
          onClick={() => getProductsByCategory("electronics")}
        >
          Electronics
        </span>
        <span
          className={`mx-3 cursor-pointer ${
            category === "jewelery"
              ? "border-b-4 border-b-violet-500"
              : "border-transparent"
          }`}
          onClick={() => getProductsByCategory("jewelery")}
        >
          Jewellary
        </span>
      </div>
      <div className="">
        {isLoading || products.length === 0 ? (
          <div className="">
            <svg
              style={{
                width: "3px",
                height: "9vh",
                marginTop: "20vw",
              }}
              className="animate-spin h-12 w-12 bg-indigo-500 mx-auto mt-14 absolute inset-0 rounded-xl"
              viewBox="0 0 164 164"
            ></svg>
          </div>
        ) : (
          <div className="productsWrapper flex-wrap">
            {products.map((product: any) => {
              return (
                <div className="text-slate-100 card relative" key={product.id}>
                  <div
                    className="absolute top-1 right-2"
                    onClick={() => {
                      !favItems.some((e: productType) => e.id === product.id)
                        ? dispatcher(addFav(product))
                        : dispatcher(removeFav(product));
                    }}
                  >
                    {favItems.some((e: productType) => e.id === product.id)
                      ? "❤️"
                      : "🤍"}
                  </div>
                  {/* <div className="absolute top-1 right-2">🤍</div> */}
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
                        const addedProduct = cartItems.filter(
                          (item: productType) => item.id === product.id
                        )[0];
                        console.log(addedProduct);

                        if (
                          cartItems.some(
                            (item: productType) => item.id === product.id
                          )
                        ) {
                          const updateProduct: any = {
                            category: addedProduct.category,
                            description: addedProduct.description,
                            id: addedProduct.id,
                            image: addedProduct.image,
                            price: addedProduct.price,
                            quantity: addedProduct.quantity + 1,
                            rating: addedProduct.rating,
                            title: addedProduct.title,
                          };

                          // product.quantity = product.quantity + 1;
                          dispatcher(addItem(updateProduct));
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
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
