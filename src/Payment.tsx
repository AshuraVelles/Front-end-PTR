import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
const stripePromise = loadStripe('pk_test_51PK5IeFruPD66GZIuJ552Q38kHb6VILa0iyWHTPLaD1IgFLR9yBXuEx3LxDCW4vQKCVw08jQjcjTs6d6hzur0ce600sR7zPHzH');

const Payment: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const {
        data: { id },
      } = await axios.post(`${apiUrl}/stripe/create-checkout-session`, {
        pagamento_id: 2, // example ID, you should get this ID from somewhere
      });

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const result = await stripe?.redirectToCheckout({ sessionId: id });

      if (result?.error) {
        console.error(result.error.message);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error creating checkout session', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className='text-center mt-5 pb-5'>
      <button onClick={handleCheckout} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
    </div>
  );
};

export default Payment;
