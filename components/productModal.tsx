"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { setProductModalOpen } from "@/app/redux/cartSlice";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductModal = () => {
  const [open, setOpen] = useState(false);

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
                  className="absolute top-0 left-0 right-0"
                >
                  <CancelIcon />
                </span>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
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
