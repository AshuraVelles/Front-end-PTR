import React from 'react';
import { Link } from 'react-router-dom';

interface GridItemProps {
  id: number;
  title: string;
  isSelected: boolean;
  imageurl?: string;
  itemLink?: string;
  itemType: 'lost' | 'found';  // Add itemType to distinguish between lost and found items
}

const GridItem: React.FC<GridItemProps> = ({ id, title, isSelected, imageurl, itemLink, itemType }) => {
  const itemStyle = isSelected ? 'grid-item selected' : 'grid-item';
  
  return (
    <div className={itemStyle}>
      <div className="content-area" style={{ textAlign: 'center' }}>
        {itemLink ? (
          <a href={itemLink}>
            <img src={imageurl} height={110} alt={title} />
          </a>
        ) : (
          <Link to={`/${itemType}/${id}`}>
            <img src={imageurl} height={110} alt={title} />
          </Link>
        )}
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default GridItem;