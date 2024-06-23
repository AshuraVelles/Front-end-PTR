import React from "react";
import ItemsProviderWrapper from "./ItemsProviderWrapper";
import { useItems } from "./ItemsProvider";
import SearchBar from "./SearchBar";
import GridItem from "./GridItem";
import "./Grid.css"; // Import the CSS file

const FoundItemsContent: React.FC = () => {
  const { items, isLoading, error } = useItems();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <SearchBar />
      <h1 className="centered-headline">Found Items</h1>
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
