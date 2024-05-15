import React from 'react';
import Header from './Components/Header.tsx';
import FoundItemsContent from './Components/FoundItems_content.tsx';
import SearchBar from './Components/FoundSearchBar.tsx';
import { FoundItemsProvider } from './Components/FoundItemsContext';


const FoundItemsPage: React.FC = () => {
  return (
    <div>
       ,
      <FoundItemsProvider>
      <h1 className="title">Objetos achados</h1>
        <SearchBar />
        <FoundItemsContent/>
      </FoundItemsProvider>
    </div>
  );
};

export default FoundItemsPage;
