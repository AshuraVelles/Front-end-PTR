// src/hooks/useFetchFoundItems.ts
import { useState, useEffect, useCallback, useContext } from 'react';
import useAuthFetch from './useAuthFetch';
import { AuthContext } from '../context/AuthContext';
import config from '../apiconfig';

interface ApiItem {
  id: number;
  descricao: string;
  categoria: string;
  data_achado: string;
  localizacao_achado: {
    latitude: number;
    longitude: number;
  };
  ativo: boolean;
  policial_id: number;
  imageUrl?: string;
}

interface Item {
  id: number;
  title: string;
  isSelected: boolean;
  imageUrl?: string;
  itemLink?: string;
}

const useFetchFoundItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const authFetch = useAuthFetch();
  const authContext = useContext(AuthContext);

  const fetchItems = useCallback(async () => {
    if (!authContext?.accessToken || hasFetched) return; // Only fetch if access token is available and not already fetched

    setLoading(true);
    setError(null);
    setHasFetched(true); // Mark that fetch has been attempted

    try {
      const fetchedItems: ApiItem[] = await authFetch(`${config.API_BASE_URL}/police/items/found`);
      setItems(fetchedItems.map(item => ({
        id: item.id,
        title: item.descricao,
        isSelected: false,
        imageUrl: item.imageUrl,
        itemLink: `/items/found/${item.id}`
      })));
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
      setHasFetched(false); // Reset if fetch failed to allow retry
    }
    setLoading(false);
  }, [authFetch, authContext?.accessToken, hasFetched]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, isLoading, error };
};

export default useFetchFoundItems;
