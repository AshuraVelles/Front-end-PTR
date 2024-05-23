// src/components/FoundItemsContent.tsx
import React, { useState } from 'react';
import GridItem from './GridItem';
import { useItems, Item } from './FoundItemsContext'; // Import Item type from context
import Modal from './Modal';
import './Grid.css';

const FoundItemsContent: React.FC = () => {
  const { items, searchTerm, isLoading, error } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className='grid'>
      {filteredItems.map((item, index) => (
        <GridItem
          key={index}
          title={item.title}
          isSelected={item.isSelected}
          imageUrl={item.imageUrl}
          itemLink={item.itemLink}
          onClick={() => handleItemClick(item)}
        />
      ))}
      <Modal isOpen={!!selectedItem} onClose={handleCloseModal}>
        {selectedItem && (
          <div>
            <h2>{selectedItem.title}</h2>
            <p>Coordinates:</p>
            <p>Latitude: {selectedItem.location.latitude}</p>
            <p>Longitude: {selectedItem.location.longitude}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FoundItemsContent;
