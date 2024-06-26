import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

const Success: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pagamento_id = params.get('pagamento_id');

    if (pagamento_id) {
      axios.post(`${apiUrl}/stripe/update-pagamento`, { pagamento_id })
        .then(response => {
          console.log('Payment status updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating payment status:', error);
        });
    }
  }, [location]);

  return (
    <div className='text-center mt-5 pt-5'>
      <h1>Pagamento bem sucedido</h1>
      <p>O seu pagamento foi processado com sucesso.</p>
    </div>
  );
};

export default Success;
