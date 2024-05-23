// src/components/GridItem.tsx
import React from 'react';

interface GridItemProps {
  title: string;
  isSelected: boolean;
  imageUrl?: string;
  itemLink?: string;
  onClick?: () => void; // Add onClick prop to handle clicks
}

const GridItem: React.FC<GridItemProps> = ({ title, isSelected, imageUrl, itemLink, onClick }) => {
  const itemStyle = isSelected ? 'grid-item selected' : 'grid-item';

  return (
    <div className={itemStyle} onClick={onClick}>
      <div className="content-area" style={{ textAlign: 'center' }}>
        {itemLink ? (
          <a href={itemLink}>
            <img src={imageUrl} height={110} alt={title} />
          </a>
        ) : (
          <a href="www.google.com">
            <img src={imageUrl} height={110} alt={title} />
          </a>
        )}
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default GridItem;
