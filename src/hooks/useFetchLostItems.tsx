import { useState, useEffect } from 'react';
import config from '../apiconfig'; // Ensure this path is correct

const useFetchLostItems = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/items/lost`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched lost items:', data); // Debug output
        setLostItems(data);
      } catch (err) { // Remove type annotation from catch clause variable
        setError((err as Error).message);
        console.error('Error fetching lost items:', err); // Debug output
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  return { items: lostItems, isLoading: loading, error };
};

export default useFetchLostItems;
