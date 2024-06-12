import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Success: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pagamento_id = params.get('pagamento_id');

    if (pagamento_id) {
      axios.post('http://localhost:3995/v1/stripe/update-pagamento', { pagamento_id })
        .then(response => {
          console.log('Payment status updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating payment status:', error);
        });
    }
  }, [location]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your payment has been processed successfully.</p>
    </div>
  );
};

export default Success;
