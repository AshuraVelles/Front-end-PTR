import React from 'react';
import { useLostItems } from '../Components/ItemsContext';
import GridItem from './GridItem';
import './Grid.css';

const FindItemsContent: React.FC = () => {
  const { items, searchTerm, isLoading, error } = useLostItems();

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
          itemType="lost"
        />
      ))}
    </div>
  );
};

export default FindItemsContent;
  