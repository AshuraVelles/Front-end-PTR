import React from 'react';
import { useFoundItems } from './ItemsContext';
import GridItem from './GridItem';
import './Grid.css';

const FoundItemsContent: React.FC = () => {
  const { items, searchTerm, isLoading, error } = useFoundItems();

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='grid'>
      {filteredItems.map((item) => (
        <GridItem
          key={item.id}
          id={item.id}
          title={item.title}
          isSelected={item.isSelected}
          imageurl={item.imageurl}
          itemLink={item.itemLink}
          itemType="found"
        />
      ))}
    </div>
  );
};

export default FoundItemsContent;
