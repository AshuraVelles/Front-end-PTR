import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
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

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
  type: "found" | "lost";
}

export const ItemsProvider: React.FC<ProviderProps> = ({ children, type }) => {
  const {
    items: foundItems,
    isLoading: isFoundLoading,
    error: foundError,
  } = useFetchFoundItems() as { items: Item[]; isLoading: boolean; error: any };
  const {
    items: lostItems,
    isLoading: isLostLoading,
    error: lostError,
  } = useFetchLostItems() as { items: Item[]; isLoading: boolean; error: any };
  const [searchTerm, setSearchTerm] = useState("");

  const items = (type === "found" ? foundItems : lostItems).map((item) => ({
    id: item.id,
    title: item.descricao, // Assuming 'descricao' is the title
    isSelected: false, // Assuming items are not selected by default
    imageurl: item.imageurl, // Placeholder image
  }));

  const isLoading = type === "found" ? isFoundLoading : isLostLoading;
  const error = type === "found" ? foundError : lostError;

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ItemsContext.Provider
      value={{
        items: filteredItems,
        searchTerm,
        setSearchTerm,
        isLoading,
        error,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};
