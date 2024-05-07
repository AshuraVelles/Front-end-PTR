import React from 'react';
import './SearchBar.css'; // Import the CSS for styling
import { useItems } from './ItemsContext';


const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useItems();
  return (
    <div className="search-bar-container">
      <h1 className="title">Objetos Perdidos</h1>
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
