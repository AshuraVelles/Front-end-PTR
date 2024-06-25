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
    <div className={itemStyle+' m-1'}>
      <div className="content-area mx-auto d-block" style={{ maxWidth: '300px' }}>
      {itemLink ? (
          imageurl ? (
          <a href={itemLink}>
            <img src={imageurl} height={110} alt={title} />
          </a>
          ) : (
            <a href={itemLink}>
              Ir para Objeto
            </a>
          )
        ) : (
          imageurl ? (
            <Link to={`/${itemType}/${id}`}>
            <img src={imageurl} height={110} alt={title} />
          </Link>
            ) : (
              <Link to={`/${itemType}/${id}`}>
                Ir para Objeto
              </Link>
            )
          
        )}
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export default GridItem;