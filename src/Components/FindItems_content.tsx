import React from 'react';
import GridItem from './GridItem';
import { useItems } from './ItemsContext';
import './Grid.css';  // This will include our CSS for styling
import SearchBar from './SearchBar.jsx';


const FindItemsContent: React.FC = () => {
  const { items, searchTerm } = useItems();

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

