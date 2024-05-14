import React from 'react';
import Header from './Components/Header';
import FindItemsContent from './Components/FindItemsContent';
import SearchBar from './Components/SearchBar';
import { ItemsProvider } from './Components/ItemsProvider';

const FindItemsPage: React.FC = () => {
  return (
    <div>
      <Header />
      <ItemsProvider type="lost">
        <h1 className="title">Objetos Perdidos</h1>
        <SearchBar />
        <FindItemsContent />
      </ItemsProvider>
    </div>
  );
};

export default FindItemsPage;
