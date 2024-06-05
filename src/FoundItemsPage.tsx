import React from 'react';
import FoundItemsContent from './Components/FoundItemsContent';
import SearchBar from './Components/SearchBar';
import { ItemsProvider } from './Components/ItemsProvider';

const FoundItemsPage: React.FC = () => {
  return (
    <div>
      
      <ItemsProvider type="found">
        <h1 className="title">Objetos Achados</h1>
        <SearchBar />
        <FoundItemsContent />
      </ItemsProvider>
    </div>
  );
};

export default FoundItemsPage;