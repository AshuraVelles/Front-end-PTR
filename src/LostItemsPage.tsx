import React from 'react';
import FindItemsContent from './Components/FindItemsContent';
import SearchBar from './Components/SearchBar';
import { LostItemsProvider } from './Components/ItemsContext';

const LostItemsPage: React.FC = () => {
  return (
    <div>
      <LostItemsProvider>
        <h1 className="title">Objetos Perdidos</h1>
        <SearchBar />
        <FindItemsContent />
      </LostItemsProvider>
    </div>
  );
};

export default LostItemsPage;
