// FindItemsContent.tsx
import React from 'react';
import GridItem from './GridItem';
import { useItems } from './ItemsContext';
import './Grid.css';
import SearchBar from './SearchBar.jsx';

const FindItemsContent: React.FC = () => {
  const { items, searchTerm, isLoading, error } = useItems();

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='grid'>
      {filteredItems.map((item, index) => (
        <GridItem
          key={index}
          title={item.title}
          isSelected={item.isSelected}
          imageUrl={item.imageUrl}
          itemLink={item.itemLink}
        />
      ))}
    </div>
  );
};

export default FindItemsContent;
