import React from 'react';
import Header from './Components/Header';
import FoundItemsContent from './Components/FoundItemsContent';
import SearchBar from './Components/SearchBar';
import { ItemsProvider } from './Components/ItemsProvider';

const FoundItemsPage: React.FC = () => {
  return (
    <div>
      <Header />
      <ItemsProvider type="found">
        <h1 className="title">Objetos Achados</h1>
        <SearchBar />
        <FoundItemsContent />
      </ItemsProvider>
    </div>
  );
};

export default FoundItemsPage;
