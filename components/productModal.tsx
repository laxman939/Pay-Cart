"use client";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  addFav,
  addItem,
  increaseQnty,
  removeFav,
  setLoginPage,
  setProductModalOpen,
} from "@/app/redux/cartSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import ProductImage from "./productImage";
import { useState } from "react";

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
  const [isAdded, setIsAdded] = useState(false);
  const {
    isProductModalOpen,
    selectedProduct,
    favItems,
    cartItems,
    user,
    loggedInUser,
  } = useSelector((state: any) => state.cart);

  const dispatcher = useDispatch();

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
                <div className="text-slate-100 relative flex gap-2 mt-6 px-7">
                  <div className="w-2/5 modalImage">
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
                      {/* <button
                        className="text-end"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user.isRegistered) {
                            !favItems.some(
                              (e: productType) => e.id === selectedProduct.id
                            )
                              ? dispatcher(addFav(selectedProduct))
                              : dispatcher(removeFav(selectedProduct));
                          } else {
                            dispatcher(setProductModalOpen(false));
                            dispatcher(setLoginPage(true));
                          }
                        }}
                      >
                        {favItems.some(
                          (e: productType) => e.id === selectedProduct.id
                        )
                          ? "❤️"
                          : "🤍"}
                      </button> */}
                      <button
                        type="button"
                        className="text-end"
                        onClick={(e) => {
                          e.stopPropagation();
                          !favItems.some(
                            (e: productType) => e.id === selectedProduct.id
                          )
                            ? dispatcher(addFav(selectedProduct))
                            : dispatcher(removeFav(selectedProduct));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            return false;
                          }
                        }}
                      >
                        {favItems.some(
                          (e: productType) => e.id === selectedProduct.id
                        )
                          ? "❤️"
                          : "🤍"}
                      </button>
                    </div>

                    <div className="flex justify-end">
                      {/* <button
                        className="btnAdd mt-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user.isRegistered) {
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
                          } else {
                            dispatcher(setProductModalOpen(false));
                            dispatcher(setLoginPage(true));
                          }
                        }}
                      >
                        Add to cart
                      </button> */}
                      <button
                        className="btnAdd"
                        disabled={isAdded}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (loggedInUser.isRegistered) {
                            setIsAdded(true);
                            setTimeout(() => {
                              if (
                                cartItems.some(
                                  (item: productType) =>
                                    item.id === selectedProduct.id
                                )
                              ) {
                                dispatcher(increaseQnty(selectedProduct));
                                setIsAdded(false);
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
                                setIsAdded(false);
                              }
                            }, 1000);
                          } else {
                            dispatcher(setProductModalOpen(false));
                            dispatcher(setLoginPage(true));
                          }
                        }}
                      >
                        {!isAdded ? "Add to cart" : "Adding..."}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : null}
    </>
  );
};

export default ProductModal;
