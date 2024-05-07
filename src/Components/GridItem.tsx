import React from 'react';

interface GridItemProps {
  title: string;
  isSelected: boolean;
  imageUrl?: string;
  itemLink?: string;
}

const GridItem: React.FC<GridItemProps> = ({ title, isSelected,imageUrl, itemLink }) => {
  // Conditional styling based on selection
  const itemStyle = isSelected ? "grid-item selected" : "grid-item";
  return (
    <div className={itemStyle}>
      <div className="content-area" style={{ textAlign: "center" }}>
        {itemLink ? ( // Check if itemLink is provided
          <a href={itemLink}>
            <img src={imageUrl} height={110} alt={title} />
          </a>
        ) : (
          <a href='www.google.com'>
          <img src={imageUrl} height={110} alt={title} />
        </a>
        )}
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default GridItem;
