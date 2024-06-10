import React, { createContext, useContext, ReactNode, useState } from "react";
import useFetchFoundItems from "../hooks/useFetchFoundItems";
import useFetchLostItems from "../hooks/useFetchLostItems";

interface Item {
  id: number;
  title: string;
  isSelected: boolean;
  imageurl?: string;
  itemLink?: string;
  descricao: string;
}

interface ItemsContextType {
  items: Item[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  error: string | null;
}

// Found Items Context
const FoundItemsContext = createContext<ItemsContextType | undefined>(
  undefined
);

// Lost Items Context
const LostItemsContext = createContext<ItemsContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

// Found Items Provider
export const FoundItemsProvider: React.FC<ProviderProps> = ({ children }) => {
  const {
    items: foundItems,
    isLoading: isFoundLoading,
    error: foundError,
  } = useFetchFoundItems() as { items: Item[]; isLoading: boolean; error: any };
  const [searchTerm, setSearchTerm] = useState("");

  const items = foundItems.map((item) => ({
    id: item.id,
    title: item.descricao,
    descricao: item.descricao,
    isSelected: false,
    imageurl: "https://via.placeholder.com/150",
  }));

  return (
    <FoundItemsContext.Provider
      value={{
        items,
        searchTerm,
        setSearchTerm,
        isLoading: isFoundLoading,
        error: foundError,
      }}
    >
      {children}
    </FoundItemsContext.Provider>
  );
};

// Lost Items Provider
export const LostItemsProvider: React.FC<ProviderProps> = ({ children }) => {
  const {
    items: lostItems,
    isLoading: isLostLoading,
    error: lostError,
  } = useFetchLostItems() as { items: Item[]; isLoading: boolean; error: any };
  const [searchTerm, setSearchTerm] = useState("");

  const items = lostItems.map((item) => ({
    id: item.id,
    title: item.descricao,
    descricao: item.descricao,
    isSelected: false,
    imageurl: "https://via.placeholder.com/150",
  }));

  return (
    <LostItemsContext.Provider
      value={{
        items,
        searchTerm,
        setSearchTerm,
        isLoading: isLostLoading,
        error: lostError,
      }}
    >
      {children}
    </LostItemsContext.Provider>
  );
};

// Hooks to use Found and Lost Items Contexts
export const useFoundItems = () => {
  const context = useContext(FoundItemsContext);
  if (!context) {
    throw new Error("useFoundItems must be used within a FoundItemsProvider");
  }
  return context;
};

export const useLostItems = () => {
  const context = useContext(LostItemsContext);
  if (!context) {
    throw new Error("useLostItems must be used within a LostItemsProvider");
  }
  return context;
};
