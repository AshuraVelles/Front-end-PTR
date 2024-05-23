// src/components/FoundItemsContent.tsx
import React, { useState } from 'react';
import GridItem from './GridItem';
import { useItems, Item } from './FoundItemsContext';
import Modal from './Modal';
import './Grid.css';

const FoundItemsContent: React.FC = () => {
  const { items, searchTerm, isLoading, error } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filteredItems = items.filter((item: Item) =>
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

  const googleMapsUrl = (latitude: number, longitude: number) => 
    `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  const googleMapsLink = (latitude: number, longitude: number) => 
    `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;

  return (
    <div className='grid'>
      {filteredItems.map((item: Item, index: number) => (
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
            <iframe
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={googleMapsUrl(selectedItem.location.latitude, selectedItem.location.longitude)}
            ></iframe>
            <p>
              <a
                href={googleMapsLink(selectedItem.location.latitude, selectedItem.location.longitude)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FoundItemsContent;
