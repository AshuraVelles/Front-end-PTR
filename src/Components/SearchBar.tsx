import React, { useState, useEffect } from "react";
import { useItems } from "./ItemsProvider";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { setSearchTerms } = useItems();

  const fillEmptyFields = (
    title: string,
    category: string,
    description: string
  ) => {
    const filledCategory = category || title || description;
    const filledDescription = description || title || category;
    const filledTitle = title || category || description;

    return { filledTitle, filledCategory, filledDescription };
  };

  useEffect(() => {
    if (!showAdvanced) {
      const delayDebounceFn = setTimeout(() => {
        const { filledTitle, filledCategory, filledDescription } =
          fillEmptyFields(query, category, description);

        setSearchTerms({
          title: filledTitle,
          category: filledCategory,
          description: filledDescription,
        });
      }, 2000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [query, category, description, setSearchTerms, showAdvanced]);

  const handleSearchClick = () => {
    const { filledTitle, filledCategory, filledDescription } = fillEmptyFields(
      query,
      category,
      description
    );

    setSearchTerms({
      title: filledTitle,
      category: filledCategory,
      description: filledDescription,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title..."
      />
      <button onClick={handleSearchClick}>Search</button>
      <button onClick={() => setShowAdvanced(!showAdvanced)}>
        {showAdvanced ? "Hide Advanced" : "Show Advanced"}
      </button>
      {showAdvanced && (
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Personal Items">Objetos Pessoais</option>
            <option value="Bags">Malas</option>
            <option value="Electronics">Eletronica</option>
            <option value="Clothing">Roupa</option>
            <option value="Accessories">Acessorios</option>
            <option value="Others">Outros</option>
          </select>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Search by description..."
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
