// src/hooks/useFetchFoundItems.tsx
import { useContext, useEffect, useState } from 'react';
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

const useFetchFoundItems = () => {
  const { accessToken } = useContext(AuthContext) ?? {};
  const [items, setItems] = useState<ApiItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (!accessToken) {
        setError('No access token available');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${config.API_BASE_URL}/police/items/found`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data: ApiItem[] = await response.json();
        setItems(data);
      } catch (err: unknown) {
        setError((err as Error).message);
      }

      setLoading(false);
    };

    fetchItems();
  }, [accessToken]);

  return { items, isLoading, error };
};

export default useFetchFoundItems;
