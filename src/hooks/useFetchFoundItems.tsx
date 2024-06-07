import { useState, useEffect } from 'react';
import config from '../apiconfig'; // Ensure this path is correct

const useFetchFoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/items/found`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched found items:', data); // Debug output
        setFoundItems(data);
      } catch (err) { // Remove the type annotation from 'err'
        setError((err as Error).message);
        console.error('Error fetching found items:', err); // Debug output
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, []);

  return { items: foundItems, isLoading: loading, error };
};

export default useFetchFoundItems;
