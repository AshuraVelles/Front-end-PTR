// ItemsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchFoundItems } from '../api'; // Import the API service
// Types for API items
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
}

interface Item {
  id: number;
  title: string;
  isSelected: boolean;
  imageUrl?: string;
  itemLink?: string;
}

interface ItemsContextType {
  items: Item[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  error: string | null;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const FoundItemsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedItems: ApiItem[] = await fetchFoundItems();
        setItems(fetchedItems.map(item => ({
          id: item.id,
          title: item.descricao,
          isSelected: false, // Assuming items are not selected by default
          // Here you can map additional properties as needed
        })));
      } catch (err) {
        setError('Failed to fetch items');
        console.error(err);
      }
      setLoading(false);
    };

    loadItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ items, searchTerm, setSearchTerm, isLoading, error }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within a FoundItemsProvider');
  }
  return context;
};