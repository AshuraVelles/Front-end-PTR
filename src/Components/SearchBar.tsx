import React, { useState, useEffect } from "react";
import { useItems } from "./ItemsProvider";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const { setSearchTerm } = useItems();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(query);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query, setSearchTerm]);

  const handleSearchClick = () => {
    setSearchTerm(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for items..."
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
