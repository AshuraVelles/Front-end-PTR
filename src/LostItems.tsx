import React from 'react';
import Header from './Components/Header.tsx';
import FindItemsContent from './Components/FindItems_content.tsx';
import SearchBar from './Components/SearchBar.js';
import { ItemsProvider } from './Components/ItemsContext.tsx';
const LostItemsPage: React.FC = () => {
  return (
    <div>
       ,
      <ItemsProvider>
      <h1 className="title">Objetos Perdidos</h1>
        <SearchBar />
        <FindItemsContent/>
      </ItemsProvider>
    </div>
  );
};

export default LostItemsPage;
