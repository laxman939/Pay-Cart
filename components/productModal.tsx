"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  addFav,
  addItem,
  increaseQnty,
  removeFav,
  setProductModalOpen,
} from "@/app/redux/cartSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import ProductImage from "./productImage";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 640,
  minHeight: 350,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  outline: "none",
};

const ProductModal = () => {
  const { isProductModalOpen, selectedProduct, favItems, cartItems } =
    useSelector((state: any) => state.cart);

  const dispatcher = useDispatch();
  console.log({ isProductModalOpen });
  console.log({ selectedProduct });

  return (
    <>
      {isProductModalOpen ? (
        <div>
          <Modal
            open={isProductModalOpen}
            onClose={() => {
              dispatcher(setProductModalOpen(false));
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="relative">
                <span
                  onClick={() => {
                    dispatcher(setProductModalOpen(false));
                  }}
                  className="absolute removeIcon cursor-pointer"
                >
                  <CancelIcon />
                </span>
                <div className="text-slate-100 relative flex gap-2 mt-6">
                  <div className="w-1/3 modalImage">
                    <ProductImage product={selectedProduct} fill />
                  </div>
                  <div className="w-2/3">
                    <div className="text-black mt-5 text-sm">
                      <h6 className="font-bold my-3 text-center text-xl">
                        {selectedProduct.title}
                      </h6>
                      <p className="font-light italic text-sm">
                        {selectedProduct.description}
                      </p>
                    </div>

                    <div className="flex align-items- justify-between mt-4 mb-9">
                      <div className="text-center text-black font-bold">
                        ₹ {Number(selectedProduct.price).toFixed(2)}
                      </div>
                      <div
                        className="text-end"
                        onClick={(e) => {
                          e.stopPropagation();
                          !favItems.some(
                            (e: productType) => e.id === selectedProduct.id
                          )
                            ? dispatcher(addFav(selectedProduct))
                            : dispatcher(removeFav(selectedProduct));
                          console.log("fav");
                        }}
                      >
                        {favItems.some(
                          (e: productType) => e.id === selectedProduct.id
                        )
                          ? "❤️"
                          : "🤍"}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        className="btnAdd mt-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            cartItems.some(
                              (item: productType) =>
                                item.id === selectedProduct.id
                            )
                          ) {
                            dispatcher(increaseQnty(selectedProduct));
                          } else {
                            const newProduct: any = {
                              category: selectedProduct.category,
                              description: selectedProduct.description,
                              id: selectedProduct.id,
                              image: selectedProduct.image,
                              price: selectedProduct.price,
                              quantity: 1,
                              rating: selectedProduct.rating,
                              title: selectedProduct.title,
                            };
                            dispatcher(addItem(newProduct));
                          }
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : null}

      {/* {product.id !== 0 ? <Product product={product} key={product.id} /> : null} */}
    </>
  );
};

export default ProductModal;
