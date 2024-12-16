"use client";
import { emptyCart, setPaymentPage } from "@/app/redux/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Function to dynamically load the Razorpay script
const loadScript = (src: any) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const dispatcher = useDispatch();
  const router = useRouter();
  const { cartItems } = useSelector((state: any) => state.cart);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Load Razorpay's script when the component mounts
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then(
      (success) => {
        if (!success) {
          console.error("Razorpay SDK failed to load");
        }
      }
    );
    const amount =
      cartItems.length > 0
        ? cartItems.reduce((acc: number, cart: productType) => {
            return acc + (cart.quantity || 1) * cart.price;
          }, 0)
        : 0;
    setTotal(amount);
  }, []);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_KTjRxwEI55IVFY",
      amount: total * 100, // Amount in paise (500 INR)
      currency: "INR",
      name: "Pay Cart",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: function (response: any) {
        // alert(`Payment ID: ${response.razorpay_payment_id}`);
        if (response?.razorpay_payment_id != null) {
          dispatcher(setPaymentPage(true));
          dispatcher(emptyCart([]));
          router.push(`/`);
        }

        // Handle payment success here
      },
      prefill: {
        name: "Laxman",
        email: "ramlaxman947@gmail.com",
        contact: "8686606625",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className="px-2 py-1 rounded-md pay_btn text-white font-semibold"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Payment;
