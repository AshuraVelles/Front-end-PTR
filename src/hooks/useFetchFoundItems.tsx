import { useState, useEffect } from 'react';
import config from '../apiconfig'; // Ensure this path is correct
import useAuthFetch from '../hooks/useAuthFetch';

const useFetchFoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authFetch = useAuthFetch();
  
  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const data = await authFetch(`${config.API_BASE_URL}/items/found`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        console.log('Fetched found items:', data); // Debug output
        setFoundItems(data);
      } catch (err) {
        setError((err as Error).message);
        console.error('Error fetching found items:', err); // Debug output
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, [authFetch]);

  return { items: foundItems, isLoading: loading, error };
};

export default useFetchFoundItems;
