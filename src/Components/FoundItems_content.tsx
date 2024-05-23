// src/Components/FoundItemsContent.tsx
import React from 'react';
import GridItem from './GridItem';
import { useItems } from './FoundItemsContext';
import './Grid.css';

const FoundItemsContent: React.FC = () => {
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

export default FoundItemsContent;
