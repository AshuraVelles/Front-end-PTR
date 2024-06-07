import React from 'react';
import './SearchBar.css';
import { useLocation } from 'react-router-dom';
import { useLostItems, useFoundItems } from './ItemsContext';

const SearchBar: React.FC = () => {
  const location = useLocation();
  const isLostPage = location.pathname.includes('lost');
  
  const { searchTerm, setSearchTerm } = isLostPage ? useLostItems() : useFoundItems();

  return (
    <div className="search-bar-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search items...          🔎"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
