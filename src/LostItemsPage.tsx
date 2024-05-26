import React from 'react';
import Header from './Components/Header';
import FindItemsContent from './Components/FinditemsContent';
import SearchBar from './Components/SearchBar';
import { ItemsProvider } from './Components/ItemsProvider';

const LostItemsPage: React.FC = () => {
  return (
    <div>
      <ItemsProvider type="lost">
        <h1 className="title">Objetos Perdidos</h1>
        <SearchBar />
        <FindItemsContent />
      </ItemsProvider>
    </div>
  );
};

export default LostItemsPage;