import { useEffect, useState, useCallback } from 'react';
import config from '../apiconfig';

interface ApiItem {
  id: number;
  descricao: string;
  categoria: string;
  data_perdido: string;
  localizacao_perdido: {
    latitude: number;
    longitude: number;
  };
  ativo: boolean;
  utilizador_id: string;
  imageurl?: string;
}

const useFetchLostItems = () => {
  const [items, setItems] = useState<ApiItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.API_BASE_URL}/items/found`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }

      const data: ApiItem[] = await response.json();
      setItems(data);
    } catch (err: unknown) {
      setError((err as Error).message);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, isLoading, error };
};

export default useFetchLostItems;
