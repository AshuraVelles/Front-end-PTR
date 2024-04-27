import React from 'react';
import './item-grid.css'

interface Item {
  id: number;
  title: string;
  imageUrl: string;
}

interface Props {
  items: Item[];
}

const Grid: React.FC<Props> = ({ items }) => {
  return (
    <div className="grid-container">
      {items.map(item => (
        <div key={item.id} className="grid-item">
          <img src={item.imageUrl} alt={item.title} />
          <div className="title">{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Grid;