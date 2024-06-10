import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PK5IeFruPD66GZIuJ552Q38kHb6VILa0iyWHTPLaD1IgFLR9yBXuEx3LxDCW4vQKCVw08jQjcjTs6d6hzur0ce600sR7zPHzH"
);

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const {
        data: { id },
      } = await axios.post(
        "http://localhost:3995/v1/stripe/create-checkout-session",
        {
          amount: 1099, // $10.99 in cents
          currency: "usd",
        }
      );

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const result = await stripe?.redirectToCheckout({ sessionId: id });

      if (result?.error) {
        console.error(result.error.message);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </div>
  );
};

export default Payment;