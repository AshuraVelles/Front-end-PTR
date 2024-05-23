// src/Components/FoundItemsContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import useFetchFoundItems from '../hooks/useFetchFoundItems';

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
  const { items, isLoading, error } = useFetchFoundItems();
  const [searchTerm, setSearchTerm] = useState('');

  const contextValue = useMemo(() => ({
    items,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
  }), [items, searchTerm, isLoading, error]);

  return (
    <ItemsContext.Provider value={contextValue}>
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
