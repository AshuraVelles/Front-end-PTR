// src/components/FoundItemsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useFetchFoundItems from '../hooks/useFetchFoundItems';

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

export interface Item {
  id: number;
  title: string;
  isSelected: boolean;
  imageUrl?: string;
  itemLink?: string;
  location: {
    latitude: number;
    longitude: number;
  };
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
  const { items: fetchedItems, isLoading, error } = useFetchFoundItems();
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setItems(fetchedItems.map(item => ({
      id: item.id,
      title: item.descricao,
      isSelected: false,
      imageUrl: item.imageUrl,
      location: item.localizacao_achado,
      itemLink: `/items/found/${item.id}`
    })));
  }, [fetchedItems]);

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
