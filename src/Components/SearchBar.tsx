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
    <div className="text-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Procurar Objetos..."
        className="w-50"
      />
      <br />
      <button onClick={handleSearchClick}>Pesquisar</button>
    </div>
  );
};

export default SearchBar;
