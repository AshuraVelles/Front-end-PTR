// src/hooks/useFetchUserLostItems.ts
import { useEffect, useState, useContext } from 'react';
import config from '../apiconfig';
import { AuthContext } from '../context/AuthContext';

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

const useFetchUserLostItems = () => {
  const { user } = useContext(AuthContext)!;
  const [items, setItems] = useState<ApiItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (!user) {
        setError('User not logged in');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${config.API_BASE_URL}/users/mylostitems`);
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
  }, [user]);

  return { items, isLoading, error };
};

export default useFetchUserLostItems;
