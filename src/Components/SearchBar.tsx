import React from 'react';
import './SearchBar.css';
import { useLostItems } from './ItemsContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useLostItems();

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
