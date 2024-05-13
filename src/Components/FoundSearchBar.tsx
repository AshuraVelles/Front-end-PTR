import React from 'react';
import './SearchBar.css'; // Import the CSS for styling
import { useItems } from './FoundItemsContext';


const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useItems();
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
