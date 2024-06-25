import React from "react";
import ItemsProviderWrapper from "./ItemsProviderWrapper";
import { useItems } from "./ItemsProvider";
import SearchBar from "./SearchBar";
import GridItem from "./GridItem";
import "./Grid.css"; // Import the CSS file

const FindItemsContent: React.FC = () => {
  const { items, isLoading, error } = useItems();

  if (isLoading) return <div>A carregar...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <SearchBar />
      <h1 className="centered-headline">Objetos Perdidos</h1>
      <div className="grid">
        {items.map((item) => (
          <GridItem
            key={item.id}
            id={item.id}
            title={item.title}
            isSelected={item.isSelected}
            imageurl={item.imageurl}
            itemType="lost"
          />
        ))}
      </div>
    </div>
  );
};

const FindItemsContentWrapper: React.FC = () => (
  <ItemsProviderWrapper type="lost">
    <FindItemsContent />
  </ItemsProviderWrapper>
);

export default FindItemsContentWrapper;
