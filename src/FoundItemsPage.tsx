import React from 'react';
import FoundItemsContent from './Components/FoundItemsContent';
import SearchBar from './Components/SearchFoundItems';
import { FoundItemsProvider } from './Components/ItemsContext';

const FoundItemsPage: React.FC = () => {
  return (
    <div>
      <FoundItemsProvider>
        <h1 className="title">Objetos Achados</h1>
        <SearchBar />
        <FoundItemsContent />
      </FoundItemsProvider>
    </div>
  );
};

export default FoundItemsPage;
