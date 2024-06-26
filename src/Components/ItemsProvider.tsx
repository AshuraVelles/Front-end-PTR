import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import config from "../apiconfig";

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
  searchTerms: {
    title: string;
    category: string;
    description: string;
  };
  setSearchTerms: React.Dispatch<
    React.SetStateAction<{
      title: string;
      category: string;
      description: string;
    }>
  >;
  isLoading: boolean;
  error: string | null;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
  type: "found" | "lost";
}

async function fetchInitialItems(type: "found" | "lost") {
  try {
    const response = await fetch(`${config.API_BASE_URL}/items/${type}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching initial ${type} items:`, error);
    throw error;
  }
}

async function searchItems({
  type,
  searchTerms,
}: {
  type: "found" | "lost";
  searchTerms: { title: string; category: string; description: string };
}) {
  const params = new URLSearchParams();
  params.append("title", searchTerms.title);
  params.append("category", searchTerms.category);
  params.append("description", searchTerms.description);

  const endpoint = `${
    config.API_BASE_URL
  }/items/${type}/search?${params.toString()}`;
  console.log(`Fetching from endpoint: ${endpoint}`);

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Received data: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error(`Error searching ${type} items:`, error);
    throw error;
  }
}

export const ItemsProvider: React.FC<ProviderProps> = ({ children, type }) => {
  const [searchTerms, setSearchTerms] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial items
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchInitialItems(type);
        setItems(data || []);
      } catch (error: any) {
        setError(`Error fetching initial ${type} items`);
        console.error(`Error fetching initial ${type} items:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [type]);

  // Search items based on the search terms
  useEffect(() => {
    if (!searchTerms.title && !searchTerms.category && !searchTerms.description)
      return;

    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await searchItems({ type, searchTerms });
        setItems(data || []);
      } catch (error: any) {
        setError(`Error fetching ${type} items`);
        console.error(`Error fetching ${type} items:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [searchTerms, type]);

  const filteredItems = items.map((item) => ({
    ...item,
    title: item.descricao, // Assuming 'descricao' is the title
    isSelected: false, // Assuming items are not selected by default
    imageurl: item.imageurl || "https://via.placeholder.com/150", // Placeholder image
  }));

  return (
    <ItemsContext.Provider
      value={{
        items: filteredItems,
        searchTerms,
        setSearchTerms,
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
