import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Item {
  id: number;
  title: string;
  isSelected: boolean;
  imageUrl?: string;
  itemLink?: string;
}

interface ItemsContextType {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const initialItems: Item[] = [
  { id: 1, title: 'Bicicleta Azul', isSelected: false, imageUrl:"https://static.sprintercdn.com/products/0370471/bicicleta-fila_0370471_00_4_3829283033.jpg",itemLink: "https://www.youtube.com/watch?v=Tn1FPZb3rmw"},
  { id: 2, title: 'Iphone 15 Pro Max', isSelected: false , imageUrl: "https://atlas-content-cdn.pixelsquid.com/assets_v2/324/3240250251566651319/jpeg-600/G03.jpg?modifiedAt=1"},
  { id: 3, title: 'Playstation 2', isSelected: false, imageUrl:'https://www.pngall.com/wp-content/uploads/2016/07/PlayStation-PNG-Download-PNG.png' },
  { id: 4, title: 'Grinder verde', isSelected: false, imageUrl:'https://m.media-amazon.com/images/I/61FYPm7fZuL.jpg' },
  { id: 5, title: 'Macbook Pro', isSelected: false , imageUrl:'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111901_mbp16-gray.png'},
  { id: 6, title: 'Carteira de couro', isSelected: false, imageUrl:'https://pngfre.com/wp-content/uploads/Wallets-21.png' },

];

interface ProviderProps {
  children: ReactNode;
}

export const ItemsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ItemsContext.Provider value={{ items, setItems, searchTerm, setSearchTerm }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};
