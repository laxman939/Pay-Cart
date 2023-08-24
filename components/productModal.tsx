"use client";

import { useSelector, useDispatch } from "react-redux";

const ProductModal = () => {
  const { isProductModalOpen, selectedProduct } = useSelector(
    (state: any) => state.cart
  );

  const dispatcher = useDispatch();
  console.log({ isProductModalOpen });
  console.log({ selectedProduct });

  return (
    <>
      {isProductModalOpen ? (
        // <Modal
        //   show={isProductModalOpen}
        //   onHide={() => dispatcher(setProductModalOpen(false))}
        //   size="lg"
        //   aria-labelledby="contained-modal-title-vcenter"
        //   centered
        // >
        //   <Modal.Header closeButton>
        //     <Modal.Title id="contained-modal-title-vcenter">
        //       Modal heading
        //     </Modal.Title>
        //   </Modal.Header>
        //   <Modal.Body>
        //     <h4>Centered Modal</h4>
        //     <p>
        //       Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        //       dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
        //       ac consectetur ac, vestibulum at eros.
        //     </p>
        //   </Modal.Body>
        //   <Modal.Footer>
        //     <span onClick={() => dispatcher(setProductModalOpen(false))}>
        //       Close
        //     </span>
        //   </Modal.Footer>
        // </Modal>
        <div className="absolute top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white p-10">
          <div className="mt-3 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"></div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Successful!
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">{selectedProduct.title}</p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* {product.id !== 0 ? <Product product={product} key={product.id} /> : null} */}
    </>
  );
};

export default ProductModal;
