import React from 'react';

import FindItemsContent from './Components/FindItemsContent';
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