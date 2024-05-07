import React from 'react';
import Header from './Components/Header.tsx';
import FindItemsContent from './Components/FindItems_content.tsx';
import SearchBar from './Components/SearchBar.jsx';
import { ItemsProvider } from './Components/ItemsContext';
const FindItemsPage: React.FC = () => {
  return (
    <div>
      <Header />,
      <ItemsProvider>
        <SearchBar />
        <FindItemsContent/>
      </ItemsProvider>
    </div>
  );
};

export default FindItemsPage;
