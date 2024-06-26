import React from "react";
import ItemsProviderWrapper from "./ItemsProviderWrapper";
import { useItems } from "./ItemsProvider";
import SearchBar from "./SearchBar";
import GridItem from "./GridItem";
import "./Grid.css"; // Import the CSS file

const FoundItemsContent: React.FC = () => {
  const { items, isLoading, error } = useItems();

  if (isLoading) return <div className='text-center mt-5 pt-5 h4'>A carregar...</div>;
  if (error) return <div className='text-danger text-center mt-5 pt-5 h4'>{error}</div>;

  return (
    <div>
      <SearchBar />
      <h1 className="centered-headline">Objetos encontrados</h1>
      <div className="grid">
        {items.map((item) => (
          <GridItem
            key={item.id}
            id={item.id}
            title={item.title}
            isSelected={item.isSelected}
            imageurl={item.imageurl}
            itemType="found"
          />
        ))}
      </div>
    </div>
  );
};

const FoundItemsContentWrapper: React.FC = () => (
  <ItemsProviderWrapper type="found">
    <FoundItemsContent />
  </ItemsProviderWrapper>
);

export default FoundItemsContentWrapper;
